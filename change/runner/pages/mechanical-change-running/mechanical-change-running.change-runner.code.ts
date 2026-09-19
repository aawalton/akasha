import { gathered } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { bodyIn } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  ledgerAt,
  reach,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { runAt } from "akasha/change/runner/modules/change-loading/change-loading.module.code.ts"
import type { Changes } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.addressed.ts"
import { DATA, INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { type Applied, applied } from "akasha/command/modules/applying/applying.module.code.ts"
import type { Kind } from "akasha/command/modules/calling/calling.module.code.ts"
import { runningOf } from "akasha/command/modules/change-kind-running/change-kind-running.module.code.ts"
import { landingFrom } from "akasha/command/modules/edits-landing/edits-landing.module.code.ts"
import { NO_GATE } from "akasha/command/modules/gate-building/gate-building.module.code.ts"
import type { Committing, Refused } from "akasha/command/modules/landing/landing.module.code.ts"
import { baseOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"

const NOTHING_ASKED = "no change was named, so nothing is run and nothing lands"

const NOTHING_MOVED = "every change named states no edit, so nothing lands"

export const MECHANICAL_KIND: Kind = {
  slug: "change-mechanical",
  runsChecks: false,
  writerOwesReading: false,
  readersOweReading: false,
}

const MECHANICAL = runningOf(MECHANICAL_KIND)

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

export type Writing = {
  readonly agentId?: string | null
  readonly writer?: string | null
  readonly read?: string | null
  readonly done?: string[]
  readonly noting?: Committing
}

export async function runMechanicalChange(
  root: string,
  asked: readonly Asking[],
  message: string,
  writing: Writing = {}
): Promise<Applied | Refused> {
  if (asked.length === 0) return { refusals: [NOTHING_ASKED], code: INPUT }
  const said = await foldedOver(ledgerAt(root, bodyIn(root), runAt), asked)
  if (said.refused !== null) return { refusals: [said.refused], code: DATA }
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
  const worked = landingFrom(root, baseOf(root), said)
  if ("why" in worked) return { refusals: [worked.why], code: DATA }
  return await applied(
    root,
    writing.agentId ?? null,
    message,
    NO_GATE,
    writing.writer ?? null,
    [],
    {
      rows: worked.rows,
      running: MECHANICAL,
      moves: worked.moves,
      formatted: worked.formatted,
      owed: worked.owed,
    },
    writing.read ?? null,
    writing.done ?? [],
    writing.noting ?? null
  )
}

export type Landing = typeof runMechanicalChange
