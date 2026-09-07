import { patchAt, patchIn } from "@akasha/agents/patch-keeping"
import type { Judging } from "@akasha/checks/judging"
import { said as gitSaid } from "@akasha/git/git-running"
import { partedIn } from "@akasha/pages/page-file-name"
import { textAt as textIn, valueAt } from "@akasha/pages/page-value"
import {
  BREAK_GLASS,
  bypassedIn,
  glassSaid,
  MECHANICAL,
  mistaking,
  noCheckSaid,
  preparing,
  unloadableIn,
} from "../asking/asking.module.code.ts"
import type { Answer, Given } from "../calling/calling.module.code.ts"
import {
  glassIn,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  unknownIn,
} from "../command-flags/command-flags.module.code.ts"
import {
  APPLIED,
  type Bodies,
  droppedPatch,
  heldIn,
  type Running,
  rebasedHeld,
  runningIn,
} from "../drafting/drafting.module.code.ts"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"
import { gateBuilt, NO_GATE } from "../gate-building/gate-building.module.code.ts"
import {
  editsOf,
  type FileCarry,
  type FileEdit,
  landing,
  type Refused,
} from "../landing/landing.module.code.ts"
import { carryLanded } from "../landing-reading/landing-reading.module.code.ts"
import { formattedSaid } from "../landing-saying/landing-saying.module.code.ts"
import { installingIn } from "../manifest-locking/manifest-locking.module.code.ts"
import { blobIdOf, type Reading, readingIn, recordRead } from "../reading/reading.module.code.ts"

const NO_PAGE = "a path that is no page keeps no patch"

const NO_PATCH = "no patch is kept for this agent, so nothing is there to apply"

const KEPT_AS_IT_WAS = "nothing was applied — the patch is as the patch was"

const CLASHED = "nothing was applied — a patch carrying a conflict does not apply"

const NONE = "nothing is drafted here, so no patch is kept"

const SUBAGENT = "subagent"

const SEAT_KEY = "principalSeatName"

const WHY = "the patch this agent drafted"

const APPLYING = [MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE: readonly string[] = []

function seatOver(root: string, page: string): string | null {
  const said = partedIn(page)
  if (said === null || said.pageType !== SUBAGENT) return null
  const value = valueAt(page, root)
  return value === null ? null : textIn(value, SEAT_KEY)
}

export function noneSaid(root: string, page: string): string {
  const seat = seatOver(root, page)
  if (seat === null) return NONE
  return `${NONE} — a subagent's draft goes to its seat when the subagent stops, so ask the ${seat} seat for what was drafted here before`
}

export type Applying = Answer & { readonly landed: boolean }

function notLanded(answer: Answer): Applying {
  return { ...answer, landed: false }
}

export async function applying(
  given: Given,
  page: string,
  argv: readonly string[],
  carried: Carried | null = null
): Promise<Applying> {
  const unknown = unknownIn(argv, APPLYING, BARE)
  if (unknown.length > 0) return notLanded(mistaking(unknown))
  const message = messageIn(argv, APPLYING)
  if ("refusals" in message) return notLanded(mistaking(message.refusals))
  const glass = glassIn(argv, APPLYING)
  if ("refusals" in glass) return notLanded(mistaking(glass.refusals))
  const broken = glass.glass
  if (carried === null && patchIn(given.root, page) === null) {
    return notLanded(mistaking([noneSaid(given.root, page)]))
  }
  const built = gateBuilt(given.root)
  if (broken === null && !("gate" in built)) {
    return notLanded({
      report: [],
      refusals: [`the checks would not load — ${built.broken}`],
      code: 3,
    })
  }
  const gate = broken === null && "gate" in built ? built.gate : NO_GATE
  const unloaded = "gate" in built ? null : built.broken
  const said0 = message.message ?? WHY
  const bypassed = broken === null ? said0 : bypassedIn(said0, broken)
  const why = unloaded === null || broken === null ? bypassed : unloadableIn(bypassed, unloaded)
  try {
    const said = await applied(
      given.root,
      page,
      given.agentId,
      why,
      gate,
      given.writer,
      [],
      carried
    )
    if ("refusals" in said) return notLanded({ report: [], refusals: said.refusals, code: 3 })
    return {
      report: [
        ...said.landed.map((one) => `landed ${one}`),
        ...formattedSaid(said.formatted),
        ...said.said,
        ...(broken === null ? [] : [glassSaid(broken)]),
        said.commit === null
          ? "nothing was committed — the tree already holds what the patch asked for"
          : `committed as ${said.commit}`,
      ],
      refusals: said.wrong,
      code: said.wrong.length === 0 ? 0 : 3,
      landed: true,
    }
  } catch (thrown) {
    return notLanded({
      report: [],
      refusals: [`nothing was committed — ${whyOf(thrown)}`],
      code: 3,
    })
  }
}

export type Carried = { readonly held: Bodies; readonly running: Running }

function carriedIn(root: string, page: string): Carried | null {
  const patch = patchIn(root, page)
  return patch === null ? null : { held: heldIn(root, patch), running: runningIn(patch) }
}

export type Applied = {
  readonly base: string
  readonly landed: readonly string[]
  readonly formatted: readonly string[]
  readonly said: readonly string[]
  readonly wrong: readonly string[]
  readonly commit: string | null
}

export function warrantedAgain(
  root: string,
  agentId: string,
  held: Bodies,
  moved: readonly string[]
): readonly string[] {
  const again: string[] = []
  for (const [path, one] of held) {
    if (moved.includes(path) || one.was === null) continue
    const oid = blobIdOf(one.was)
    recordRead(root, agentId, { path, oid, seenAt: Date.now(), carriedOid: null })
    again.push(path)
  }
  return again.sort()
}

function asReadOf(root: string, agentId: string, held: Bodies): readonly Reading[] {
  const out: Reading[] = []
  for (const path of held.keys()) {
    const seen = readingIn(root, agentId, path)
    if (seen !== null) out.push(seen)
  }
  return out
}

function recordedAsLanded(root: string, agentId: string, changes: readonly FileEdit[]): undefined {
  for (const one of changes) {
    if (one.body === null) continue
    recordRead(root, agentId, {
      path: one.path,
      oid: blobIdOf(one.body),
      seenAt: Date.now(),
      carriedOid: null,
    })
  }
}

export async function applied(
  root: string,
  page: string,
  agentId: string | null,
  message: string,
  judging: Judging,
  writer: string | null = null,
  carries: readonly FileCarry[] = [],
  carried: Carried | null = null
): Promise<Applied | Refused> {
  const at = patchAt(page)
  if (at === null) return { refusals: [NO_PAGE] }
  const holding = carried ?? carriedIn(root, page)
  if (holding === null) return { refusals: [NO_PATCH] }
  const head = gitSaid(root, ["rev-parse", "HEAD"]).trim()
  const said = rebasedHeld(root, head, holding.held)
  if ("why" in said) return { refusals: [said.why, KEPT_AS_IT_WAS] }
  if (said.clashed.length > 0) {
    return {
      refusals: [
        ...said.clashed.map((one) => `${one} — the patch carries a conflict here`),
        CLASHED,
      ],
    }
  }
  const running = holding.running
  const gate = running.checks ? judging : NO_GATE
  const said0 = running.checks ? message : bypassedIn(message, noCheckSaid(MECHANICAL.slug))
  const prepared = preparing(root, head, editsOf(said.held))
  const formatting = prepared.formatting
  if (running.writerOwesReading && agentId !== null)
    warrantedAgain(root, agentId, said.held, said.moved)
  const asRead = agentId === null ? [] : asReadOf(root, agentId, said.held)
  const done = await landing(root, prepared.changes, said0, gate, writer, head, asRead, carries)
  if ("refusals" in done) return done
  carryLanded(root, head, running, prepared.changes, [])
  if (agentId !== null) recordedAsLanded(root, agentId, formatting.changes)
  droppedPatch(root, page, APPLIED)
  const put = installingIn(root, prepared.changes)
  return {
    base: done.base,
    landed: [...done.wrote, ...done.took].sort(),
    formatted: [...formatting.formatted].sort(),
    said: [...prepared.said, ...put.said],
    wrong: put.wrong,
    commit: done.commit,
  }
}
