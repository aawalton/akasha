import { mirroredOf } from "akasha/check/modules/change-mirror/change-mirror.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  carriedIn,
  judgedAcross,
  type Looked,
  type Saying,
} from "akasha/check/modules/tool-faults/tool-faults.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { pathsOf } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  textAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { z } from "zod"

const SH = ".sh"

const HELD = "sh"

const FILE_PROPERTY = "file-property"

const EXTENSIONS = "extensions"

const SLUG = "slug"

const TOOL = "shellcheck"

const ARGV: readonly string[] = ["-x", "--source-path=SCRIPTDIR", "--format=json1"]

const JUDGED: ReadonlySet<number> = new Set([0, 1])

const COMMENTS = "comments"

const UNLOOKED = "A linter that could not look has verified nothing, so this change is not judged."

const SAID_AT_MOST = 240

export type Found = {
  readonly path: string
  readonly line: number
  readonly column: number
  readonly code: number
  readonly level: string
  readonly said: string
}

export function shellNamed(path: string): boolean {
  return path.endsWith(SH)
}

function holdingShellIn(index: Answering): readonly string[] {
  const found: string[] = []
  for (const kind of index.kindsUnder(FILE_PROPERTY)) {
    for (const value of index.valuesByPath(kind).values()) {
      const slug = textAt(value, SLUG)
      if (slug === null || !(textsAt(value, EXTENSIONS) ?? []).includes(HELD)) continue
      found.push(`${kind}/${slug}`)
    }
  }
  return found
}

function filedIn(index: Answering, root: string): readonly string[] | null {
  const filedBy = index.filePropertiesAt()
  const answered: string[] = []
  const found = new Set<string>()
  for (const named of holdingShellIn(index)) {
    const carried = index.carryingOf(named)
    if ("refused" in carried) continue
    answered.push(named)
    for (const one of carried.carrying) {
      const value = index.valuesByPath(one.pageTypeSlug).get(one.path)
      if (value === undefined) continue
      for (const at of pathsOf(value, one.path, root, filedBy)) {
        if (shellNamed(at)) found.add(at)
      }
    }
  }
  return answered.length === 0 ? null : [...found]
}

export function besideOver(
  index: Answering,
  root: string,
  listed: () => readonly string[],
  carried: readonly string[]
): readonly string[] {
  const every = filedIn(index, root) ?? listed().filter(shellNamed)
  return [...new Set([...every, ...carried])].sort()
}

export function besideIn(change: Change, shadow: Shadow): readonly string[] {
  return besideOver(shadow.index, shadow.root, () => shadow.listed(), carriedIn(change, shellNamed))
}

const COMMENT_SAID = z.looseObject({
  file: z.string(),
  level: z.string(),
  message: z.string(),
  line: z.number(),
  column: z.number(),
  code: z.number(),
})

const ANSWER_SAID = z.looseObject({ [COMMENTS]: z.array(COMMENT_SAID) })

export function foundIn(output: string): readonly Found[] | null {
  let held: z.infer<typeof ANSWER_SAID> | undefined
  try {
    held = ANSWER_SAID.safeParse(JSON.parse(output)).data
  } catch {
    return null
  }
  if (held === undefined) return null
  return held[COMMENTS].map((one) => ({
    path: one.file,
    line: one.line,
    column: one.column,
    code: one.code,
    level: one.level,
    said: one.message,
  }))
}

export function lookedOver(
  root: string,
  named: readonly string[],
  at: string | null
): Looked<Found> {
  if (at === null) {
    return { found: [], failed: `no \`${TOOL}\` is on PATH, so nothing was looked at` }
  }
  const done = ran([at, ...ARGV, ...named], { cwd: root })
  if (!JUDGED.has(done.code)) {
    const why = done.err.trim().slice(0, SAID_AT_MOST)
    return {
      found: [],
      failed: `\`${TOOL}\` exited ${done.code} and looked at nothing — ${why}`,
    }
  }
  const found = foundIn(done.out)
  if (found === null) {
    return { found: [], failed: `the \`json1\` answer \`${TOOL}\` gave could not be read` }
  }
  return { found, failed: null }
}

export function reasonOf(one: Found): string {
  return `SC${one.code} (${one.level}) at line ${one.line}, column ${one.column} — ${one.said}`
}

const SAYING: Saying<Found> = { reasonOf, unlooked: UNLOOKED }

export function judgedOf(looked: Looked<Found>, first: string, root: string): readonly Judged[] {
  return judgedAcross(looked, first, root, SAYING)
}

export function refusalsAcross(
  carried: readonly string[],
  beside: readonly string[],
  bytes: (path: string) => Uint8Array | null
): readonly Judged[] {
  const first = carried[0]
  if (first === undefined) return []
  const mirror = mirroredOf(beside, bytes)
  try {
    return judgedOf(lookedOver(mirror.root, carried, Bun.which(TOOL)), first, mirror.root)
  } finally {
    mirror.sweep()
  }
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedIn(change, shellNamed)
  if (carried.length === 0) return []
  return refusalsAcross(carried, besideIn(change, shadow), change.after)
}
