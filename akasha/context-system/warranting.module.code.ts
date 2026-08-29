import { readFileSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, readingIn } from "../command-system/reading.module.code.ts"
import { slugsOfType, standingAt } from "../pages-system/indexes/index-reading.module.code.ts"
import { namedIn } from "../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { standingAbove } from "../pages-system/page-type/page-type-descent/page-type-descent.module.code.ts"

const READ_CALL = "akasha read --file-path"

const REACH = [
  "LET THE OUTPUT REACH YOU. A read piped, redirected into a file, or sent to /dev/null is refused",
  "and records nothing, because what the record says is that the body reached you.",
].join("\n")

const SHORTER =
  "A body that moved since your record holds it comes back as what changed, where that is shorter."

export const ITSELF =
  "A write replaces the body standing there, and what is replaced is read first."

export const TYPE = "A page answers to its type, and to every type that one extends."

const PAGE_TYPE = "page-type"

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

function standingOf(root: string, path: string): string | null {
  try {
    return blobIdOf(readFileSync(join(root, path)))
  } catch {
    return null
  }
}

export function itselfIn(root: string, path: string): readonly Warrant[] {
  const standing = standingOf(root, path)
  return standing === null ? [] : [{ path, oid: standing, owed: ITSELF }]
}

export function typeSlugOf(path: string, types: ReadonlySet<string>): string | null {
  const said = namedIn(path)
  if (said === null) return null
  return types.has(said.tail) ? said.tail : null
}

export function typeIn(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const known = knowing()
  let here = typeSlugOf(path, known.types)
  if (here === null) return []
  const found: Warrant[] = []
  const walked = new Set<string>()
  const above = known.above()
  while (here !== null && !walked.has(here)) {
    walked.add(here)
    const standing = standingAt(root, PAGE_TYPE, here)[0]
    const oid = standing === undefined ? null : standingOf(root, standing.path)
    if (standing !== undefined && oid !== null) {
      found.push({ path: standing.path, oid, owed: TYPE })
    }
    here = above.get(here) ?? null
  }
  return found
}

export const WARRANTING: readonly Warranting[] = [itselfIn, typeIn]

export function warrantsIn(
  root: string,
  path: string,
  knowing: Knowing = knowingIn(root)
): readonly Warrant[] {
  return WARRANTING.flatMap((one) => one(root, path, knowing))
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
    for (const warrant of warrantsIn(root, path, knowing)) {
      if (asked.has(warrant.path)) continue
      asked.add(warrant.path)
      const held = readingIn(root, agentId, warrant.path)
      if (held === null) said.push(notReadOf(warrant))
      else if (held.oid !== warrant.oid) said.push(movedOf(warrant, held.oid))
    }
  }
  return said
}
