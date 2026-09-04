import { fail } from "@akasha/command-system/command-failing"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { declaredSeatReading } from "../declared-seat-reading/declared-seat-reading.module.code.ts"
import { documentsOnDemand } from "../documents-on-demand/documents-on-demand.module.code.ts"
import type { Args } from "../seat-args/seat-args.module.code.ts"
import { documentNamed } from "../seat-attribute/seat-attribute.module.code.ts"
import {
  ATTRIBUTES,
  type Attributes,
  type Mode,
  type ModeRecord,
  ownAttributesOf,
} from "../seat-attributes/seat-attributes.module.code.ts"
import { flexLine } from "../seat-flex/seat-flex.module.code.ts"
import { initiativeLine } from "../seat-initiative/seat-initiative.module.code.ts"
import { onCallLine } from "../seat-on-call/seat-on-call.module.code.ts"
import { seatNameForAgent } from "../seat-presence-read/seat-presence-read.module.code.ts"
import { principalLine } from "../seat-principal/seat-principal.module.code.ts"
import { registrationAccountLine } from "../seat-registration-account/seat-registration-account.module.code.ts"
import { type Stated, statedOf } from "../seat-stated/seat-stated.module.code.ts"
import {
  turnEndReadingLine,
  turnEndReadingOf,
  turnPendingSourceLine,
  turnPendingSourceOf,
} from "../seat-turn/turn-records/turn-records.module.code.ts"
import { workingLines, workingOf } from "../seat-turn/turn-working/turn-working.module.code.ts"
import { pendingLines, pendingOf } from "../seat-turn-pending/seat-turn-pending.module.code.ts"
import {
  seatTurnStateLine,
  seatTurnStateOf,
} from "../seat-turn-state/seat-turn-state.module.code.ts"

export function showLines(agent: string, args: Args): readonly string[] {
  const setting = [
    Object.keys(args.set).length > 0 ? "an attribute" : null,
    args.initiative !== null ? "--initiative" : null,
    args.flex !== null ? "--flex" : null,
    args.clear.length > 0 ? "--clear" : null,
    args.mode !== null ? "--mode" : null,
    args.principal !== null ? "--principal" : null,
    args.onCall ? "--on-call" : null,
  ].filter((one): one is string => one !== null)
  if (setting.length > 0) {
    fail(
      `--show reads what this seat states and writes nothing, so one call carrying it and ${setting.join(" and ")} ` +
        "would print what already stands and drop the set — run them as two calls"
    )
  }
  const stated = statedOf(agent)
  const own = ownAttributesOf(agent)
  const inherited: string[] = ATTRIBUTES.filter(
    (key) => stated.attributes[key] !== undefined && own[key] === undefined
  )
  if (seatNameForAgent(agent) === null) {
    if (stated.initiative !== null) inherited.push("initiative")
  }
  return [
    `seat:   ${agent}`,
    ...linesOf(stated),
    seatTurnStateLine(seatTurnStateOf(agent)),
    turnEndReadingLine(turnEndReadingOf(agent)),
    turnPendingSourceLine(turnPendingSourceOf(agent)),
    ...workingLines(workingOf(agent)),
    ...pendingLines(pendingOf(agent)),
    ...(inherited.length > 0 ? [`  (${inherited.join(", ")} inherited from the seat)`] : []),
  ]
}

export function statedLines(agent: string): readonly string[] {
  return linesOf(statedOf(agent))
}

function linesOf(stated: Stated): readonly string[] {
  return [
    ...describe(stated.attributes),
    flexLine(stated.flex),
    modeLine(stated.mode, stated.recordedMode),
    principalLine(stated.principal),
    onCallLine(stated.onCall),
    initiativeLine(stated.initiative),
    registrationAccountLine(stated.registration),
  ]
}

export function describe(attributes: Attributes): readonly string[] {
  const lines: string[] = []
  const roots = resolveRoots()
  const root = rootFor(roots, AKASHA)
  const documents = documentsOnDemand(root)
  const stated = {
    attributes,
    initiative: null,
    mode: null,
    onCall: false,
    principal: null,
  }
  const shown = new Map(
    declaredSeatReading(stated, roots, documents).map((one) => [one.claimant, one])
  )
  for (const key of ATTRIBUTES) {
    const held = attributes[key]
    if (held === undefined) {
      lines.push(`  ${key.padEnd(8)} — not stated`)
      continue
    }
    lines.push(`  ${key.padEnd(8)} ${held.slug}`)
    for (const at of shown.get(key)?.documents ?? []) {
      lines.push(`           ${documentNamed(at, root)}`)
    }
  }
  return lines
}

export function modeLine(applies: Mode, recorded: ModeRecord | null): string {
  const said = recorded === null ? `${applies} — nothing recorded one` : applies
  return `  ${"mode".padEnd(8)} ${said}`
}
