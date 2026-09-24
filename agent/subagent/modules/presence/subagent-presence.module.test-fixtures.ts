import { existsSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { agentPaged } from "akasha/agent/modules/read-record/read-record.module.test-fixtures.ts"
import { bodyOf } from "akasha/agent/subagent/modules/body/subagent-body.module.code.ts"
import type {
  Liveness,
  Reading,
} from "akasha/agent/subagent/modules/liveness/subagent-liveness.module.code.ts"
import {
  pathOf,
  slugOf,
} from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import { wrote } from "akasha/agent/subagent/modules/presence/subagent-presence.module.code.ts"
import {
  seatEditsAt,
  seatRefusalsAt,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import { subagent } from "akasha/agent/subagent/subagent.page-type.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFile } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.ts"
import { addFileCode } from "akasha/change/mechanical/file/add/add-file-code/add-file-code.change-mechanical.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { addFilePage } from "akasha/change/mechanical/file/add/add-file-page/add-file-page.change-mechanical.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { bodyIn } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { bodiesIn, ledgerAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { runAt } from "akasha/change/runner/modules/change-loading/change-loading.module.code.ts"
import {
  foldedOver,
  type Landing,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { DATA } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  bodyAt,
  writing,
} from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { startedAt } from "akasha/file/modules/lock-holder/lock-holder.module.code.ts"
import {
  holding,
  LOCK_AT,
  refusedWhereHeld,
} from "akasha/git/modules/holding/holding.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import {
  aType,
  indexedRepo,
  pageOf,
  bodyOf as valueBody,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const LANDED = { base: "", landed: [], formatted: [], said: [], wrong: [], commit: null }

export const COMMITTED = "1111111111111111111111111111111111111111"

export function landingNaming(named: string[]): Landing {
  return (root, changes, message) => {
    for (const one of changes) {
      named.push(one.at)
      const given = one.given as { readonly at: string; readonly body?: string }
      if (given.body === undefined) rmSync(join(root, given.at), { force: true })
      else writing(root, given.at, given.body)
    }
    gitIn(root, ["add", "-A"])
    gitIn(root, ["commit", "--quiet", "-m", message])
    return Promise.resolve(LANDED)
  }
}

export const LANDS: Landing = landingNaming([])

export const ROW = `${JSON.stringify({ kind: "remove", path: "one.md" })}\n`

export const REFUSAL = "the body moved under the change"

export const NOTHING_KEPT = { edits: "", refusals: "" }

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

export const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

export const AGENT = "01a05844-6e60-7000-b54c-4b14559df70d"

export const OWN = "a38f63805f9b94edf"

const TREE = "akasha"

export const SEAT_AT = `${TREE}/agent/seat/pages/akasha.seat.ts`

export const SEAT_BODY = `export const akasha = { assignmentSlug: "domain/akasha-system" }\n`

export const PERSONA_AT = "akasha/persona-system/personas/akasha/akasha.persona.ts"

export const MECHANICAL = "Checks-bypassed: a `change-mechanical` change runs no check"

export const WENT = { went: true } as const

export const HELD_ID = "01a06d00-0000-7000-8000-000000000001"

export const HELD_ASSIGNMENT = "domain/held-before"

const IMPORTED_AT = `${TREE}/held.ts`

const IMPORTED_BODY = "export const held = 1\n"

const IMPORTING_AT = `${TREE}/holding.ts`

const IMPORTING_BODY = 'import { held } from "./held.ts"\n\nexport const holding = held\n'

export const MINTED = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/

type Adding = { readonly slug: string; readonly type: string }

const ADDING: readonly Adding[] = [
  { slug: addFileOfAnyKind.slug, type: changeMechanical.slug },
  { slug: addFilePage.slug, type: changeMechanical.slug },
  { slug: addFileCode.slug, type: changeMechanical.slug },
  { slug: addFile.slug, type: changeMechanicalFile.slug },
]

const CHANGES_AT = "change/mechanical/file/add"

const changeId = (one: number): string => `01a0598f-0000-7000-8000-00000000000${String(one)}`

function changesAdding(): Readonly<Record<string, string>> {
  const found: Record<string, string> = {}
  for (const [one, adding] of ADDING.entries()) {
    const named = `${adding.slug}.${adding.type}`
    const code = join(rootOf(import.meta.dir), CHANGES_AT, adding.slug, `${named}.code.ts`)
    found[`${TREE}/changes/${named}.ts`] = pageOf({
      id: changeId(one + 1),
      pageTypeSlug: adding.type,
      slug: adding.slug,
      definition: "a change adding a file, reached from the checkout this test runs in",
      code: "ts",
    })
    found[`${TREE}/changes/${named}.code.ts`] = `export { runChange } from "${code}"\n`
  }
  return found
}

const [SUBAGENT_TYPE_AT, SUBAGENT_TYPE] = aType(subagent.id, subagent.slug, [
  `${pageType.slug}/${page.slug}`,
])

const SEEDED: Readonly<Record<string, string>> = {
  ...changesAdding(),
  [`${TREE}/${SUBAGENT_TYPE_AT}`]: valueBody(SUBAGENT_TYPE),
  [IMPORTED_AT]: IMPORTED_BODY,
  [IMPORTING_AT]: IMPORTING_BODY,
  [SEAT_AT]: SEAT_BODY,
}

function seated(): string {
  const root = indexedRepo(SEEDED)
  listedFiled(root, "seat", "akasha", [{ path: SEAT_AT, id: SEAT_ID }])
  return root
}

export const minting: Landing = async (root, changes, message) => {
  const said = await foldedOver(ledgerAt(root, bodyIn(root), runAt), changes)
  if (said.refused !== null) return { refusals: [said.refused], code: DATA }
  for (const [path, body] of bodiesIn(said, bodyIn(root))) {
    if (body === null) rmSync(join(root, path), { force: true })
    else writing(root, path, body)
  }
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", message])
  return LANDED
}

export async function underSeat(act: (root: string) => Promise<void>): Promise<undefined> {
  await act(seated())
}

export function inScratch(act: (root: string) => void): undefined {
  const world = scratchWorld()
  try {
    act(world.rootFor("subagent-presence-"))
  } finally {
    world.sweep()
  }
}

export async function inTwoScratch(
  act: (root: string, base: string) => Promise<void>
): Promise<undefined> {
  const world = scratchWorld()
  try {
    await act(seated(), world.rootFor("subagent-presence-logs-"))
  } finally {
    world.sweep()
  }
}

export function keptBySeat(root: string): { readonly edits: string; readonly refusals: string } {
  return {
    edits: bodyAt(root, seatEditsAt(SEAT_AT)),
    refusals: bodyAt(root, seatRefusalsAt(SEAT_AT)),
  }
}

export function pageUnder(root: string, seatName: string): string {
  const slug = slugOf(seatName, OWN)
  const at = pathOf(slug)
  writing(root, at, bodyOf(slug, seatName, "domain/akasha-system", "Explore", AGENT))
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "a page under a seat the index has no page for"])
  return at
}

function readingOf(liveness: Liveness): Reading {
  return () => Promise.resolve({ liveness, why: `the reading says ${liveness}` })
}

export const RETURNED: Reading = readingOf("returned")

export const UNREAD: Reading = readingOf("unread")

export const WORKING: Reading = readingOf("working")

export async function pageWritten(root: string): Promise<string> {
  await wrote(root, "akasha", SEAT_ID, OWN, "Explore", [], LANDS)
  return pathOf(slugOf("akasha", OWN))
}

export function readingKept(root: string, at: string): undefined {
  const oid = blobIdOf(new TextEncoder().encode(readFileSync(join(root, at), "utf8")))
  agentPaged(root, AGENT)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, carriedOid: null })
  return undefined
}

export function messageIn(root: string): string {
  return gitIn(root, ["log", "-1", "--pretty=%B"])
}

export function whyIn(went: unknown): string {
  return typeof went === "object" && went !== null && "why" in went ? String(went.why) : ""
}

export async function loggedAt(at: string, within: number): Promise<string> {
  const until = Date.now() + within
  while (Date.now() < until) {
    if (existsSync(at)) {
      const held = readFileSync(at, "utf8")
      if (held !== "") return held
    }
    await Bun.sleep(50)
  }
  return existsSync(at) ? readFileSync(at, "utf8") : ""
}

const STAMP = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}) /

function parseStampDate(found: RegExpExecArray | null): Date | null {
  if (found === null) return null
  const held = Date.parse(found[1] ?? "")
  return Number.isNaN(held) ? null : new Date(held)
}

export function stampOpening(line: string): Date | null {
  return parseStampDate(STAMP.exec(line))
}

export function pastTheStamp(line: string): string {
  return line.replace(STAMP, "")
}

export function idIn(body: string): string | null {
  return firstCapture(/\n {2}id: "([^"]+)",/.exec(body))
}

export function landedUnder(root: string, seatName: string, own: string): string {
  return readFileSync(join(root, pathOf(slugOf(seatName, own))), "utf8")
}

export function landedAt(root: string, own: string): string {
  return landedUnder(root, "akasha", own)
}

export function heldUnder(
  root: string,
  seatName: string,
  own: string,
  agentId: string,
  kind: string
): undefined {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  writing(root, at, bodyOf(slug, seatName, HELD_ASSIGNMENT, kind, agentId, HELD_ID))
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "the page was there"])
  gitIn(root, ["rm", "--quiet", at])
  gitIn(root, ["commit", "--quiet", "-m", "the page went"])
}

export function heldInHistory(root: string, own: string, agentId: string, kind: string): undefined {
  heldUnder(root, "akasha", own, agentId, kind)
}

export function lockHeldIn(root: string): undefined {
  writing(root, LOCK_AT, `${process.pid} ${startedAt(process.pid)}`)
}

export const heldLanding: Landing = (root) =>
  refusedWhereHeld(() => Promise.resolve(holding(root, () => LANDED, 0)))

export const threwAfter: Landing = (_root, _changes, _message, noting) => {
  noting?.done?.push(COMMITTED)
  throw new Error("the work after that commit stopped")
}
