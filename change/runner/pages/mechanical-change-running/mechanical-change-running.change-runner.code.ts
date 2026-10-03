import {
  type Answer,
  type BodyOf,
  type FileChange,
  gathered,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodyIn, foldedIn } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  carrying,
  ledgerAt,
  reach,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { runAt } from "akasha/change/runner/modules/change-loading/change-loading.module.code.ts"
import type { Changes } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.addressed.ts"
import type { Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  DATA,
  INPUT,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import { type Applied, applied } from "akasha/command/modules/applying/applying.module.code.ts"
import type { Kind } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Running,
  runningOf,
} from "akasha/command/modules/change-kind-running/change-kind-running.module.code.ts"
import {
  bodyFaults,
  type Judges,
  judgesOver,
  overLongAfter,
} from "akasha/command/modules/draft-length/draft-length.module.code.ts"
import { landingFrom } from "akasha/command/modules/edits-landing/edits-landing.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import {
  gateBuilt,
  NO_GATE,
} from "akasha/command/modules/gate-building/gate-building.module.code.ts"
import type { Committing, Refused } from "akasha/command/modules/landing/landing.module.code.ts"
import { baseOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { phased } from "akasha/page/service/modules/hold-naming/hold-naming.module.code.ts"

const NOTHING_ASKED = "no change was named, so nothing is run and nothing lands"

const NOTHING_MOVED = "every change named states no edit, so nothing lands"

export const MECHANICAL_KIND: Kind = {
  slug: "change-mechanical",
  runsChecks: false,
  writerOwesReading: false,
  readersOweReading: false,
}

const MECHANICAL = runningOf(MECHANICAL_KIND)

const KEPT: Running = { checks: true, writerOwesReading: false, readersOweReading: true }

export type Asking = {
  [K in keyof Changes]: { readonly at: K; readonly given: Changes[K] }
}[keyof Changes]

export async function foldedOver(world: World, asked: readonly Asking[]): Promise<Answer> {
  const answers: Answer[] = []
  let seen = world
  for (const one of asked) {
    const reached = await reach(seen, one.at, one.given)
    if (reached.said.refused !== null) return reached.said
    answers.push(reached.said)
    seen = reached.world
  }
  return gathered(answers)
}

export async function keptFolded(
  world: World,
  kept: readonly FileChange[],
  asked: readonly Asking[]
): Promise<Answer> {
  if (kept.length === 0) return await foldedOver(world, asked)
  const keeping = foldedIn(kept)
  if (keeping.refused !== null) return keeping
  let seen: World
  try {
    seen = carrying(world, keeping)
  } catch (thrown) {
    return refusing(whyOf(thrown))
  }
  const folded = await foldedOver(seen, asked)
  return folded.refused === null ? gathered([keeping, folded]) : folded
}

export function landingFaults(
  bodyOf: BodyOf,
  edits: readonly FileChange[],
  kept: readonly FileChange[],
  judges: Judges
): readonly string[] {
  if (kept.length === 0) return bodyFaults(bodyOf, edits, edits, judges)
  return overLongAfter(bodyOf, edits, edits, judges.letOff)
}

async function judgingFor(kept: readonly FileChange[], root: string): Promise<Judging | string> {
  if (kept.length === 0) return NO_GATE
  const built = await gateBuilt(root)
  return "gate" in built ? built.gate : `the checks would not load — ${built.broken}`
}

type Writing = {
  readonly agentId?: string | null
  readonly writer?: string | null
  readonly read?: string | null
  readonly done?: string[]
  readonly noting?: Committing
  readonly kept?: readonly FileChange[]
}

export async function runMechanicalChange(
  root: string,
  asked: readonly Asking[],
  message: string,
  writing: Writing = {}
): Promise<Applied | Refused> {
  if (asked.length === 0) return { refusals: [NOTHING_ASKED], code: INPUT }
  const kept = writing.kept ?? []
  const bodyOf = bodyIn(root)
  const world = ledgerAt(root, bodyOf, runAt)
  const said = await phased("compose", () => keptFolded(world, kept, asked))
  if (said.refused !== null) return { refusals: [said.refused], code: DATA }
  const faults = landingFaults(bodyOf, said.edits, kept, judgesOver(root, world.index))
  if (faults.length > 0) return { refusals: [...faults], code: DATA }
  if (said.edits.length === 0) {
    return {
      base: baseOf(root),
      landed: [],
      formatted: [],
      said: [NOTHING_MOVED],
      wrong: [],
      commit: null,
      untracked: [],
    }
  }
  const worked = phased("rows", () => landingFrom(root, baseOf(root), said))
  if ("why" in worked) return { refusals: [worked.why], code: DATA }
  const judging = await judgingFor(kept, root)
  if (typeof judging === "string") return { refusals: [judging], code: OPERATIONAL }
  return await applied(
    root,
    writing.agentId ?? null,
    message,
    judging,
    writing.writer ?? null,
    [],
    {
      rows: worked.rows,
      running: kept.length === 0 ? MECHANICAL : KEPT,
      moves: worked.moves,
      formatted: worked.formatted,
      owed: worked.owed,
      ...(kept.length === 0 ? {} : { readFrom: worked.readFrom }),
    },
    writing.read ?? null,
    writing.done ?? [],
    writing.noting ?? null
  )
}

export type Landing = typeof runMechanicalChange
