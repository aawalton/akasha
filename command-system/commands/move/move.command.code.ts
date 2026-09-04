import { existsSync, statSync } from "node:fs"
import { basename, dirname, join, resolve } from "node:path"
import { typed } from "@akasha/code-system/code-typing"
import { everyPath } from "@akasha/indexes"
import { besideOf } from "@akasha/pages-system/page-beside"
import { uncommittedNamed } from "@akasha/pages-system/page-file-name"
import type { Asked } from "../../asking/asking.module.code.ts"
import { counted, landingAsked, textOf } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { answering } from "../../calling/calling.module.code.ts"
import { bodyAt } from "../../commit-reading/commit-reading.module.code.ts"
import { wouldClear } from "../../folder-clearing/folder-clearing.module.code.ts"
import type { FileCarry, FileEdit } from "../../landing/landing.module.code.ts"
import { baseOf } from "../../landing/landing.module.code.ts"
import { linkingsIn, reachedOver } from "../../package-linking/package-linking.module.code.ts"
import type { Carry } from "../../reading/reading.module.code.ts"
import { blobIdOf, carryReadings } from "../../reading/reading.module.code.ts"
import { glassIn, messageIn, pathInside } from "../write/write.command.code.ts"
import { FROM, pairsIn, TO, VALUED } from "./arguing/move-arguing.module.code.ts"
import { manifestingOver } from "./manifesting/move-manifesting.module.code.ts"
import { importingOf, namingOf, spellingOf } from "./naming/move-naming.module.code.ts"
import { outsideIn, outsideSaid } from "./outside/move-outside.module.code.ts"
import type { Renaming, Unrepointed } from "./renaming/move-renaming.module.code.ts"
import {
  addressingOver,
  besideRenamed,
  rebound,
  renamingFor,
  respelled,
  restated,
  unrepointedIn,
  unrepointedSaid,
} from "./renaming/move-renaming.module.code.ts"
import { repointed } from "./repointing/move-repointing.module.code.ts"
import { resettlingSaid } from "./resettling/move-resettling.module.code.ts"
import type { Pair, Spread } from "./spreading/move-spreading.module.code.ts"
import { expandedIn, spreadSaid } from "./spreading/move-spreading.module.code.ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const NOTHING_SAID: ReadonlyMap<string, string> = new Map()

type Sided = {
  readonly from: string
  readonly to: string
  readonly named: boolean
  readonly committed: boolean
  readonly renaming: Renaming | null
}

type Reached = {
  readonly repointed: readonly string[]
  readonly unread: string | null
  readonly outside: readonly string[]
  readonly reaching: readonly string[]
  readonly left: readonly Unrepointed[]
}

function sidedIn(
  root: string,
  pairs: readonly Pair[]
): { readonly sides: readonly Sided[] } | { readonly refusals: readonly string[] } {
  const refusals: string[] = []
  const sides: Sided[] = []
  const seen = new Set<string>()
  const taken = new Set<string>()
  for (const one of pairs) {
    const from = pathInside(root, one.from)
    const to = pathInside(root, one.to)
    if (from === null || to === null) {
      const outside = from === null ? one.from : one.to
      refusals.push(
        `\`${outside}\` is not under \`${INSIDE}\` — a path is read against the repository root, ` +
          "and this carries nothing in or out of that folder"
      )
      continue
    }
    if (from === to) {
      refusals.push(
        `${from} is named as both sides of a pair, so this pair asks for no move at all`
      )
      continue
    }
    if (!existsSync(join(root, from))) {
      refusals.push(`${from} is not there, so there is no body to carry`)
      continue
    }
    if (!statSync(join(root, from)).isFile()) {
      refusals.push(`${from} is not a file — a move carries bodies, and a directory holds none`)
      continue
    }
    if (existsSync(join(root, to))) {
      refusals.push(`${to} already stands, and a move writes over nothing`)
      continue
    }
    let renaming: Renaming | null = null
    if (basename(from) !== basename(to)) {
      const naming = namingOf(root, from)
      if ("unread" in naming) {
        refusals.push(naming.unread)
        continue
      }
      if (naming.held === null || naming.held.path !== from) {
        refusals.push(
          `${from} is no page's own file, and the one name a move changes is a page's own slug`
        )
        continue
      }
      const asked = renamingFor(from, to, naming.held.id)
      if ("refused" in asked) {
        refusals.push(asked.refused)
        continue
      }
      renaming = asked.renaming
    }
    if (seen.has(from)) {
      refusals.push(`${from} is named as the source of more than one pair`)
      continue
    }
    if (taken.has(to)) {
      refusals.push(`${to} is named as the destination of more than one pair`)
      continue
    }
    seen.add(from)
    taken.add(to)
    sides.push({ from, to, named: true, committed: true, renaming })
    for (const held of besideOf(root, from)) {
      if (seen.has(held)) continue
      seen.add(held)
      const name = basename(held)
      const there = join(dirname(to), renaming === null ? name : besideRenamed(name, renaming))
      if (existsSync(join(root, there))) {
        refusals.push(`${there} already stands, and the sidecar ${held} goes with what you named`)
        continue
      }
      taken.add(there)
      sides.push({
        from: held,
        to: there,
        named: false,
        committed: !uncommittedNamed(held),
        renaming,
      })
    }
  }
  if (refusals.length > 0) return { refusals }
  return { sides }
}

function carrying(
  sides: readonly Sided[],
  reached: Reached,
  dry: boolean,
  spread: Spread,
  cleared: readonly string[]
): readonly string[] {
  const own = sides.filter((one) => !spread.under.has(one.from))
  const report = own
    .filter((one) => one.named)
    .map((one) => {
      const said = `${one.from} ${dry ? "would move to" : "moved to"} ${one.to}`
      if (one.renaming === null) return said
      const now = one.renaming.now
      return `${said}, ${dry ? "renaming" : "renamed"} from the slug \`${one.renaming.was}\` to \`${now}\``
    })
  const beside = own.filter((one) => !one.named)
  if (beside.length > 0) {
    const said = beside.map((one) => `${one.from} to ${one.to}`).join(", ")
    report.push(
      dry
        ? `these stand beside what you named and would go with it — ${said}`
        : `these stood beside what you named and went with it — ${said}`
    )
  }
  report.push(...spreadSaid(spread, sides.length - own.length, cleared, dry))
  if (reached.repointed.length === 0) {
    report.push("no file naming what moved needed repointing")
  } else {
    report.push(
      `${counted(reached.repointed.length, "file")} naming what moved ` +
        `${dry ? "would be" : "was"} repointed — ${reached.repointed.join(", ")}`
    )
  }
  report.push(...unrepointedSaid(reached.left, dry))
  if (reached.unread !== null) report.push(reached.unread)
  report.push(...outsideSaid(reached.outside, reached.reaching, dry))
  return report
}

export function move(argv: readonly string[], given: Given): Answer {
  const read = pairsIn(argv)
  if ("refused" in read) return answering([], [read.refused], 1)
  if (read.pairs.length === 0) {
    return answering([], [`name at least one pair to move, as \`${FROM} <path> ${TO} <path>\``], 1)
  }
  const glass = glassIn(argv, VALUED)
  if ("refusals" in glass) return answering([], glass.refusals, 1)
  const said = messageIn(argv, VALUED)
  if ("refusals" in said) return answering([], said.refusals, 1)
  const root = resolve(given.root)
  const base = baseOf(root)
  const spread = expandedIn(root, read.pairs)
  if ("refusals" in spread) return answering([], spread.refusals, 1)
  const sided = sidedIn(root, spread.pairs)
  if ("refusals" in sided) return answering([], sided.refusals, 1)
  const gone = sided.sides.map((one) => one.from)
  const moved = new Map<string, string>(sided.sides.map((one) => [one.from, one.to]))
  const bodyText = (path: string): string | null => {
    const bytes = bodyAt(root, base, path)
    return bytes === null ? null : textOf(bytes)
  }
  const renamings = sided.sides.flatMap((one) =>
    one.renaming === null || !one.named ? [] : [one.renaming]
  )
  const addressing = addressingOver(root, renamings, bodyText)
  const manifesting = manifestingOver(moved, bodyText)
  const restating = new Map(manifesting.map((one) => [one.to, one.text]))
  const changes: FileEdit[] = []
  const carries: Carry[] = []
  const uncommitted: FileCarry[] = []
  for (const one of sided.sides) {
    if (!one.committed) {
      uncommitted.push({ from: one.from, to: one.to })
      continue
    }
    const bytes = bodyAt(root, base, one.from)
    if (bytes === null) {
      return answering(
        [],
        [`${one.from} stands in no commit at \`${base}\`, so what it holds cannot be moved`],
        2
      )
    }
    carries.push({ was: one.from, now: one.to, from: blobIdOf(bytes) })
    const manifested = restating.get(one.to)
    if (manifested !== undefined) {
      changes.push({ path: one.to, body: new TextEncoder().encode(manifested), carried: true })
      changes.push({ path: one.from, body: null })
      continue
    }
    if (!typed(one.from)) {
      changes.push({ path: one.to, body: bytes, carried: true })
      changes.push({ path: one.from, body: null })
      continue
    }
    const text = textOf(bytes)
    if (text === null) {
      return answering(
        [],
        [`${one.from} is TypeScript and its bytes are not utf-8, so its specifiers cannot be read`],
        2
      )
    }
    const said = repointed(one.from, one.to, text, moved)
    let next = respelled(one.to, said, addressing.get(one.from) ?? NOTHING_SAID)
    const renaming = one.renaming
    if (renaming !== null && !one.named) {
      next = rebound(one.to, next, renaming.was, renaming.now)
    }
    if (renaming !== null && one.named) {
      const now = restated(one.to, next, renaming.now)
      if (now === null) {
        return answering(
          [],
          [`${one.from} states no slug, so \`${renaming.now}\` would rename nothing`],
          2
        )
      }
      next = now
    }
    changes.push({ path: one.to, body: new TextEncoder().encode(next), carried: true })
    changes.push({ path: one.from, body: null })
  }
  const reading = importingOf(root, moved)
  const naming = new Set<string>("importers" in reading ? reading.importers : [])
  for (const path of addressing.keys()) naming.add(path)
  if ("importers" in reading) {
    for (const path of spellingOf(root, base, moved, naming)) naming.add(path)
  }
  const repointing: string[] = []
  for (const one of manifesting) {
    if (moved.has(one.at)) continue
    const held = bodyAt(root, base, one.at)
    if (held === null) continue
    repointing.push(one.at)
    carries.push({ was: one.at, now: one.at, from: blobIdOf(held) })
    changes.push({ path: one.at, body: new TextEncoder().encode(one.text), carried: true })
  }
  for (const path of [...naming].sort()) {
    if (!typed(path) || moved.has(path)) continue
    const held = bodyAt(root, base, path)
    if (held === null) continue
    const text = textOf(held)
    if (text === null) {
      return answering(
        [],
        [
          `${path} names what moved and its bytes are not utf-8, so what it says cannot be repointed`,
        ],
        2
      )
    }
    const said = repointed(path, path, text, moved)
    const next = respelled(path, said, addressing.get(path) ?? NOTHING_SAID)
    if (next === text) continue
    repointing.push(path)
    carries.push({ was: path, now: path, from: blobIdOf(held) })
    changes.push({ path, body: new TextEncoder().encode(next), carried: true })
  }
  const left = unrepointedIn(renamings, moved, () => everyPath(root), changes, bodyText)
  const named = new Map([...spread.folders.map((one) => [one.from, one.to] as const), ...moved])
  const outside = outsideIn(root, base, named)
  if ("refusal" in outside) return answering([], [outside.refusal], 1)
  changes.push(...outside.changes)
  carries.push(...outside.carries)
  const reached: Reached = {
    repointed: repointing,
    unread: "unread" in reading ? reading.unread : null,
    outside: outside.paths,
    reaching: outside.reaching,
    left,
  }
  const message =
    said.message ?? `move ${sided.sides.map((one) => `${one.from} to ${one.to}`).join(", ")}`
  const asked: Asked = {
    changes,
    message,
    dryRun: read.dryRun,
    glass: glass.glass,
    unmoved: [],
    read: base,
    carries: uncommitted,
    saying: (landed) => [
      ...carrying(sided.sides, reached, false, spread, landed.cleared),
      ...resettlingSaid(root, named, true),
    ],
  }
  const relink = read.dryRun ? () => undefined : reachedOver(root, linkingsIn(moved, bodyText))
  let landed: Answer
  try {
    landed = landingAsked({ ...given, root }, asked)
  } catch (thrown) {
    relink()
    throw thrown
  }
  if (read.dryRun || landed.code !== 0) relink()
  if (landed.code === 0 && !read.dryRun) carryReadings(root, carries)
  if (landed.code !== 0 || !read.dryRun) return landed
  const would = carrying(sided.sides, reached, true, spread, wouldClear(root, gone))
  const resaid = resettlingSaid(root, named, false)
  return answering([...would, ...resaid, ...landed.report], [], 0)
}
