import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { dropReadings } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { pagesRemoved } from "akasha/agent/seat/log-day/modules/log-day-sweeping/log-day-sweeping.module.code.ts"
import { headOf } from "akasha/git/modules/head-commit/head-commit.module.code.ts"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import { fileStemOf } from "akasha/page/identity/modules/file-page/file-page.module.code.ts"
import { fileKeysAt } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideOf } from "akasha/page/modules/beside/page-beside.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  referencesAt,
  referencesEach,
} from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const IMAGE_TYPE = "image"

const GRADE = "grade"

const DELETED_GRADE = "F"

export const GRACE_MS = 15 * 60_000

const SECOND_MS = 1_000

const WRITER = "image sweeper <image-sweeper@alanwalton.com>"

const REMOVE = "--remove"

export interface GradedF {
  readonly relPath: string
  readonly slug: string
  readonly gradedAtMs: number | null
  readonly namedBy: readonly string[]
}

export type Decided = "delete" | "young" | "named" | "unjudged"

export function decideImage(one: GradedF, nowMs: number): Decided {
  if (one.namedBy.length > 0) return "named"
  if (one.gradedAtMs === null) return "unjudged"
  return nowMs - one.gradedAtMs >= GRACE_MS ? "delete" : "young"
}

function namerOf(path: string): string {
  const said = partedIn(path)
  return said === null ? path : `${said.pageType}/${said.slug}`
}

export function namersIn(text: string): readonly string[] {
  const found = new Set<string>()
  for (const one of referencesEach(text.split("\n"))) {
    found.add(`${namerOf(one.path)} (${one.propertySlug})`)
  }
  return [...found].sort()
}

function namedByAt(root: string, relPath: string): readonly string[] {
  const at = referencesAt(relPath)
  if (at === null) return []
  let text: string
  try {
    text = readFileSync(join(root, at), "utf8")
  } catch {
    return []
  }
  return namersIn(text)
}

export function gradedAtIn(said: string | null): number | null {
  const held = said?.trim() ?? ""
  if (held === "") return null
  const seconds = Number(held)
  return Number.isFinite(seconds) ? seconds * SECOND_MS : null
}

function gradedAtOf(root: string, commit: string, relPath: string): number | null {
  return gradedAtIn(told(root, ["log", "-1", "--format=%ct", commit, "--", relPath]))
}

export function gradedFIn(root: string, commit: string): readonly GradedF[] {
  const found: GradedF[] = []
  for (const one of valuesOfType(root, IMAGE_TYPE)) {
    if (one.value[GRADE] !== DELETED_GRADE) continue
    found.push({
      relPath: one.path,
      slug: fileStemOf(one.path),
      gradedAtMs: gradedAtOf(root, commit, one.path),
      namedBy: namedByAt(root, one.path),
    })
  }
  return found
}

function bytesRemoved(root: string, taken: readonly GradedF[]): undefined {
  const keys = new Set(fileKeysAt(root).keys())
  for (const one of taken) {
    for (const gone of besideOf(root, one.relPath, keys)) rmSync(join(root, gone), { force: true })
  }
  return undefined
}

export function removalFor(relPaths: readonly string[], read: string): Writing {
  return {
    writer: WRITER,
    message: `graded F fifteen minutes ago or more, so ${relPaths.length === 1 ? "this image goes" : "these images go"}: ${relPaths.map((one) => fileStemOf(one)).join(", ")}`,
    removes: relPaths,
    read,
  }
}

export function asksRemoval(argv: readonly string[]): boolean {
  return argv.includes(REMOVE)
}

function heldSaid(one: GradedF, decided: Decided): string | null {
  if (decided === "named")
    return `${one.slug} stays graded F, since ${one.namedBy.join(", ")} names it`
  if (decided === "unjudged") {
    return `${one.slug} stays graded F, since when its grade was written went unread`
  }
  return null
}

export async function sweepGradedF(
  argv: readonly string[],
  nowMs: number = Date.now()
): Promise<number> {
  const root = rootFor(resolveRoots(), AKASHA)

  const readAt = headOf(root)
  const every = gradedFIn(root, readAt)
  const doomed: GradedF[] = []
  for (const one of every) {
    const decided = decideImage(one, nowMs)
    if (decided === "delete") doomed.push(one)
    const held = heldSaid(one, decided)
    if (held !== null) process.stderr.write(`${held}\n`)
  }

  for (const one of doomed) {
    process.stdout.write(`${one.slug}\t${new Date(one.gradedAtMs ?? nowMs).toISOString()}\n`)
  }

  if (!asksRemoval(argv)) {
    process.stderr.write(
      `read ${every.length} image(s) graded F, ${doomed.length} graded fifteen minutes ago or more` +
        ` and named by no page — nothing deleted without ${REMOVE}\n`
    )
    return 0
  }
  if (doomed.length === 0) {
    process.stderr.write(`read ${every.length} image(s) graded F, none to delete\n`)
    return 0
  }

  const refused: string[] = []
  const taken: GradedF[] = []
  const together = await pagesRemoved(
    removalFor(
      doomed.map((one) => one.relPath),
      readAt
    )
  )
  if (together.code === 0) {
    taken.push(...doomed)
  } else {
    for (const one of doomed) {
      const alone = await pagesRemoved(removalFor([one.relPath], readAt))
      if (alone.code === 0) taken.push(one)
      else refused.push(`${one.slug}: ${alone.output.trim().split("\n").slice(-1)[0] ?? "refused"}`)
    }
  }
  bytesRemoved(root, taken)
  if (taken.length > 0)
    dropReadings(
      root,
      taken.map((one) => one.relPath)
    )

  process.stderr.write(
    `deleted ${taken.length} of ${doomed.length} image(s) graded F fifteen minutes ago or more; ` +
      `${every.length - taken.length} graded F kept\n`
  )
  for (const one of refused) process.stderr.write(`refused: ${one}\n`)
  return refused.length === 0 ? 0 : 1
}

if (import.meta.main) process.exit(await sweepGradedF(process.argv.slice(2)))
