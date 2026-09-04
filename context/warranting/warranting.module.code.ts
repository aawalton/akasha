import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import {
  blobIdOf,
  partly,
  reachOf,
  readingIn,
  SUBAGENT_MARK,
  sameBody,
} from "@akasha/command-system/reading"
import {
  everyOfType,
  readingIn as indexReadingIn,
  listedAt,
  listedById,
  slugsOfType,
} from "@akasha/indexes"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { besideAt, partedIn } from "@akasha/pages-system/page-file-name"
import { listedAbove } from "@akasha/pages-system/page-type-descent"
import { valueAt } from "@akasha/pages-system/page-value"
import { slugOf } from "@akasha/seat-system/subagent-presence"

const READ_CALL = "akasha read --file-path"

const REACH = [
  "LET THE OUTPUT REACH YOU. A read is refused and records nothing where its output goes to a",
  "pipe, to /dev/null, or into a file this redirect alone opened, because what the record says",
  "is that the body reached you.",
  "ONE ANSWER HOLDS 28000 BYTES and breaks no file partway, so a call naming more than it can",
  "answer comes back with an opening run of the files, names the rest as left unread, and exits 0",
  "either way. Only what came back is recorded, so go by what this refusal still asks for rather",
  "than by what you asked to read.",
].join("\n")

const SHORTER =
  "A body that moved since your record holds it comes back as what changed, where that is shorter."

const A_RUN =
  "A body longer than one answer holds comes back a run of lines at a time, and answers a write once the whole body has reached you."

const DECIDING =
  "NAMING DECISION — reading the term's page clears this, and it may mean renaming what your change writes."

const DECIDE = [
  "Nothing here judges the sense you meant, so this read clears the gate whether you reword or not.",
  "Read the page, decide what you meant, and reword where you meant a sense the term bars:",
].join("\n")

const PAGE_TYPE = "page-type"

const WARRANT = "context-warrant"

const TABOO_TERM = "taboo-term"

const SEAT = "seat"

const SUBAGENT = "subagent"

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

export type Owing = {
  readonly warrant: Warrant
  readonly held: string | null
  readonly reach?: number | null
}

export type Known = {
  readonly types: ReadonlySet<string>
  readonly above: () => ReadonlyMap<string, readonly string[]>
}

export type Knowing = () => Known

export type Changing = {
  readonly changed: readonly string[]
  readonly before: (path: string) => Uint8Array | null
  readonly after: (path: string) => Uint8Array | null
}

export type Warranting = (
  root: string,
  path: string,
  knowing: Knowing,
  changing?: Changing
) => readonly Warrant[]

export type When = "read" | "write"

export type Gathered = {
  readonly slug: string
  readonly page: string
  readonly runsOnRead: boolean
  readonly runsOnWrite: boolean
  readonly transitive: boolean
  readonly warranting: Warranting
}

const loadFrom = createRequire(import.meta.url)

export function knowingIn(root: string): Knowing {
  let known: Known | null = null
  let above: ReadonlyMap<string, readonly string[]> | null = null
  return () =>
    (known ??= {
      types: new Set<string>([PAGE_TYPE, ...slugsOfType(root, PAGE_TYPE)]),
      above: () => (above ??= listedAbove(indexReadingIn(root), (path) => valueAt(path, root))),
    })
}

export function fromTabooTerm(warrant: Warrant): boolean {
  return partedIn(warrant.path)?.pageType === TABOO_TERM
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

function movedSaid(warrant: Warrant, held: string): string {
  return `Your record holds ${held}, and ${warrant.oid} stands there now.`
}

function farSaid(reach: number): string {
  return `Your record holds line ${reach} as how far this body has reached you.`
}

export function movedOf(warrant: Warrant, held: string): string {
  return [
    `${warrant.path} — you read this, and it has changed since.`,
    movedSaid(warrant, held),
    warrant.owed,
    "It is read again here:",
    "",
    `  ${READ_CALL} ${warrant.path}`,
    "",
    SHORTER,
  ].join("\n")
}

export function partlyOf(warrant: Warrant, reach: number): string {
  return [
    `${warrant.path} — part of this reached you, and the rest has not.`,
    farSaid(reach),
    warrant.owed,
    "The run after it is read here:",
    "",
    `  ${READ_CALL} ${warrant.path}`,
    "",
    A_RUN,
  ].join("\n")
}

function tabooSaid(owing: Owing): { readonly said: readonly string[]; readonly note: string } {
  const warrant = owing.warrant
  const reach = reachOf(owing.reach)
  if (reach !== null) {
    return {
      said: [`${warrant.path} states the term, and part of it has reached you.`, farSaid(reach)],
      note: A_RUN,
    }
  }
  if (owing.held === null) return { said: [`${warrant.path} states the term.`], note: REACH }
  return {
    said: [
      `${warrant.path} states the term, and it has changed since you read it.`,
      movedSaid(warrant, owing.held),
    ],
    note: SHORTER,
  }
}

export function tabooOf(owing: Owing): string {
  const { said, note } = tabooSaid(owing)
  return [
    DECIDING,
    ...said,
    owing.warrant.owed,
    DECIDE,
    "",
    `  ${READ_CALL} ${owing.warrant.path}`,
    "",
    note,
  ].join("\n")
}

export function sayingOf(owing: Owing): string {
  if (fromTabooTerm(owing.warrant)) return tabooOf(owing)
  const reach = reachOf(owing.reach)
  if (reach !== null) return partlyOf(owing.warrant, reach)
  return owing.held === null ? notReadOf(owing.warrant) : movedOf(owing.warrant, owing.held)
}

export function termFirst(owed: readonly Owing[]): readonly Owing[] {
  return [
    ...owed.filter((one) => fromTabooTerm(one.warrant)),
    ...owed.filter((one) => !fromTabooTerm(one.warrant)),
  ]
}

export function blobAt(root: string, path: string): string | null {
  try {
    return blobIdOf(readFileSync(join(root, path)))
  } catch {
    return null
  }
}

function namedBy(at: string, slug: string): unknown {
  let mod: Record<string, unknown>
  try {
    mod = loadFrom(at) as Record<string, unknown>
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
    const said = partedIn(page)
    if (said === null) {
      throw new Error(`${page} is a warrant page, and its name says no slug a runner can read`)
    }
    const slug = said.slug
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

export function changingOf(
  root: string,
  changes: readonly { readonly path: string; readonly body: Uint8Array | null }[]
): Changing {
  const after = new Map(changes.map((one) => [one.path, one.body]))
  return {
    changed: changes.map((one) => one.path),
    before: (path) => {
      try {
        return readFileSync(join(root, path))
      } catch {
        return null
      }
    },
    after: (path) => after.get(path) ?? null,
  }
}

export function warrantsIn(
  root: string,
  path: string,
  when: When,
  knowing: Knowing = knowingIn(root),
  changing?: Changing
): readonly Warrant[] {
  return gatheredAt(gatheredIn(root), when).flatMap((one) =>
    one.warranting(root, path, knowing, changing)
  )
}

export function warrantedIn(root: string, paths: readonly string[]): readonly string[] {
  const said: string[] = []
  const held = new Set<string>()
  const taking = (one: string): undefined => {
    if (held.has(one)) return
    held.add(one)
    said.push(one)
  }
  try {
    const every = gatheredAt(gatheredIn(root), "read")
    const knowing = knowingIn(root)
    const walking = every.map((one) => {
      const walked = new Set<string>()
      const walk = (path: string): undefined => {
        if (walked.has(path)) return
        walked.add(path)
        for (const warrant of one.warranting(root, path, knowing)) {
          taking(warrant.path)
          if (one.transitive) walk(warrant.path)
        }
      }
      return walk
    })
    for (const path of paths) {
      taking(path)
      for (const walk of walking) walk(path)
    }
  } catch {
    return [...paths]
  }
  return said
}

function owingOf(
  root: string,
  agentId: string,
  warrants: readonly Warrant[],
  asked: Set<string>
): readonly Owing[] {
  const said: Owing[] = []
  for (const warrant of warrants) {
    if (asked.has(warrant.path)) continue
    asked.add(warrant.path)
    const held = readingIn(root, agentId, warrant.path)
    if (held === null) said.push({ warrant, held: null })
    else if (partly(held) && held.oid === warrant.oid) {
      said.push({ warrant, held: held.oid, reach: reachOf(held.readThrough) })
    } else if (!sameBody(held, warrant.oid)) said.push({ warrant, held: held.oid })
  }
  return said
}

export function unreadOwing(
  root: string,
  agentId: string,
  paths: readonly string[],
  changing?: Changing
): readonly Owing[] {
  const knowing = knowingIn(root)
  const asked = new Set<string>()
  const said: Owing[] = []
  for (const path of paths) {
    said.push(...owingOf(root, agentId, warrantsIn(root, path, "write", knowing, changing), asked))
  }
  return said
}

export function unreadIn(
  root: string,
  agentId: string | null,
  paths: readonly string[],
  changing?: Changing
): readonly string[] {
  if (agentId === null) return [NO_AGENT]
  return termFirst(unreadOwing(root, agentId, paths, changing)).map(sayingOf)
}

export function seatPathOf(root: string, agentId: string): string | null {
  const listed = listedById(root, agentId)
  if (listed === null) return null
  const said = partedIn(listed.path)
  return said !== null && said.pageType === SEAT ? listed.path : null
}

export function subagentPathOf(root: string, agentId: string): string | null {
  const at = agentId.indexOf(SUBAGENT_MARK)
  if (at <= 0) return null
  const own = agentId.slice(at + SUBAGENT_MARK.length)
  if (own === "") return null
  const seat = seatPathOf(root, agentId.slice(0, at))
  if (seat === null) return null
  const said = partedIn(seat)
  if (said === null) return null
  const listed = listedAt(root, SUBAGENT, slugOf(said.slug, own))[0]
  return listed === undefined ? null : listed.path
}

export function agentPathOf(root: string, agentId: string): string | null {
  return seatPathOf(root, agentId) ?? subagentPathOf(root, agentId)
}

export function unheldOwing(root: string, agentId: string): readonly Owing[] {
  const page = agentPathOf(root, agentId)
  if (page === null) return []
  return owingOf(root, agentId, warrantsIn(root, page, "write", knowingIn(root)), new Set([page]))
}

export function unheldIn(root: string, agentId: string | null): readonly string[] {
  if (agentId === null) return []
  return termFirst(unheldOwing(root, agentId)).map(sayingOf)
}

export function owedIn(
  root: string,
  agentId: string | null,
  paths: readonly string[],
  changing?: Changing
): readonly string[] {
  if (agentId === null) return [NO_AGENT]
  return termFirst([
    ...unheldOwing(root, agentId),
    ...unreadOwing(root, agentId, paths, changing),
  ]).map(sayingOf)
}
