import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import { blobIdOf, readingIn, sameBody } from "../command-system/reading/reading.module.code.ts"
import {
  everyOfType,
  slugsOfType,
} from "../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../pages-system/page/page-export-name/page-export-name.module.code.ts"
import {
  besideAt,
  namedIn,
} from "../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { standingAbove } from "../pages-system/page-type/page-type-descent/page-type-descent.module.code.ts"

const READ_CALL = "akasha read --file-path"

const REACH = [
  "LET THE OUTPUT REACH YOU. A read piped, redirected into a file, or sent to /dev/null is refused",
  "and records nothing, because what the record says is that the body reached you.",
].join("\n")

const SHORTER =
  "A body that moved since your record holds it comes back as what changed, where that is shorter."

const PAGE_TYPE = "page-type"

const WARRANT = "context-warrant"

const CODE = "code"

const TS = "ts"

export const NO_AGENT = [
  "`AGENT_ID` names no agent, so there is no record to ask, and this call is refused whole.",
  "This should not be possible: the supervisor sets `AGENT_ID` when it spawns an agent, every read",
  "is recorded under it and every write is charged to it, and nothing is charged to nobody.",
  "Say that `AGENT_ID` is unset and stop here, rather than finding a way around it.",
].join("\n")

export type Warrant = {
  readonly path: string
  readonly oid: string
  readonly owed: string
}

export type Known = {
  readonly types: ReadonlySet<string>
  readonly above: () => ReadonlyMap<string, string>
}

export type Knowing = () => Known

export type Warranting = (root: string, path: string, knowing: Knowing) => readonly Warrant[]

export type When = "read" | "write"

export type Gathered = {
  readonly slug: string
  readonly page: string
  readonly runsOnRead: boolean
  readonly runsOnWrite: boolean
  readonly transitive: boolean
  readonly warranting: Warranting
}

const reach_ = createRequire(import.meta.url)

export function knowingIn(root: string): Knowing {
  let known: Known | null = null
  let above: ReadonlyMap<string, string> | null = null
  return () =>
    (known ??= {
      types: new Set<string>([PAGE_TYPE, ...slugsOfType(root, PAGE_TYPE)]),
      above: () => (above ??= standingAbove(root)),
    })
}

export function notReadOf(warrant: Warrant): string {
  return [
    `${warrant.path} — the record does not show you read this.`,
    warrant.owed,
    "This call reads it:",
    "",
    `  ${READ_CALL} ${warrant.path}`,
    "",
    REACH,
  ].join("\n")
}

export function movedOf(warrant: Warrant, held: string): string {
  return [
    `${warrant.path} — you read this, and it has changed since.`,
    `Your record holds ${held}, and ${warrant.oid} stands there now.`,
    warrant.owed,
    "It is read again here:",
    "",
    `  ${READ_CALL} ${warrant.path}`,
    "",
    SHORTER,
  ].join("\n")
}

export function standingOf(root: string, path: string): string | null {
  try {
    return blobIdOf(readFileSync(join(root, path)))
  } catch {
    return null
  }
}

function namedBy(at: string, slug: string): unknown {
  let mod: Record<string, unknown>
  try {
    mod = reach_(at) as Record<string, unknown>
  } catch {
    return undefined
  }
  return mod[exportedAs(slug)]
}

function statedIn(at: string, slug: string): Record<string, unknown> | null {
  const named = namedBy(at, slug)
  if (named === null || typeof named !== "object") return null
  return named as Record<string, unknown>
}

function saidOf(stated: Record<string, unknown>, named: string): boolean | null {
  const said = stated[named]
  return typeof said === "boolean" ? said : null
}

function warrantingIn(at: string, slug: string): Warranting | null {
  const named = namedBy(at, slug)
  return typeof named === "function" ? (named as Warranting) : null
}

function warrantPagesIn(root: string): readonly string[] {
  return [...new Set(everyOfType(root, WARRANT).map((one) => one.path))].sort()
}

export function gatheredIn(root: string): readonly Gathered[] {
  const found: Gathered[] = []
  for (const page of warrantPagesIn(root)) {
    const said = namedIn(page)
    if (said === null) {
      throw new Error(`${page} is a warrant page, and its name says no slug a runner can read`)
    }
    const slug = said.stem
    const stated = statedIn(join(root, page), slug)
    if (stated === null) {
      throw new Error(
        `${page} is a warrant page, and answers to no \`${exportedAs(slug)}\` a runner can read`
      )
    }
    const runsOnRead = saidOf(stated, "runsOnRead")
    const runsOnWrite = saidOf(stated, "runsOnWrite")
    const transitive = saidOf(stated, "transitive")
    if (runsOnRead === null || runsOnWrite === null || transitive === null) {
      throw new Error(`${page} is a warrant page, and states no rule a runner can honour`)
    }
    const beside = besideAt(page, CODE, TS)
    if (beside === null) {
      throw new Error(`${page} is a warrant page, and no code file can stand beside a name like it`)
    }
    const warranting = warrantingIn(join(root, beside), slug)
    if (warranting === null) {
      throw new Error(`${page} is a warrant page, and ${beside} answers to nothing that can be run`)
    }
    found.push({ slug, page, runsOnRead, runsOnWrite, transitive, warranting })
  }
  return found.sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

function gatheredAt(every: readonly Gathered[], when: When): readonly Gathered[] {
  return every.filter((one) => (when === "read" ? one.runsOnRead : one.runsOnWrite))
}

export function warrantsIn(
  root: string,
  path: string,
  when: When,
  knowing: Knowing = knowingIn(root)
): readonly Warrant[] {
  return gatheredAt(gatheredIn(root), when).flatMap((one) => one.warranting(root, path, knowing))
}

export function unreadIn(
  root: string,
  agentId: string | null,
  paths: readonly string[]
): readonly string[] {
  if (agentId === null) return [NO_AGENT]
  const knowing = knowingIn(root)
  const said: string[] = []
  const asked = new Set<string>()
  for (const path of paths) {
    for (const warrant of warrantsIn(root, path, "write", knowing)) {
      if (asked.has(warrant.path)) continue
      asked.add(warrant.path)
      const held = readingIn(root, agentId, warrant.path)
      if (held === null) said.push(notReadOf(warrant))
      else if (!sameBody(held, warrant.oid)) said.push(movedOf(warrant, held.oid))
    }
  }
  return said
}
