import { gathered } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { bodyIn } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { guardedBy } from "akasha/changes/modules/guarding/change-guarding.module.code.ts"
import {
  ledgerAt,
  reach,
  type World,
  worldBefore,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  guardsOver,
  runAt,
} from "akasha/changes/runners/change-loading/change-loading.module.code.ts"
import type { Changes } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.addressed.ts"
import { type Applied, applied } from "akasha/commands/modules/applying/applying.module.code.ts"
import type { Running } from "akasha/commands/modules/drafting/drafting.module.code.ts"
import { landingFrom } from "akasha/commands/modules/edits-landing/edits-landing.module.code.ts"
import { NO_GATE } from "akasha/commands/modules/gate-building/gate-building.module.code.ts"
import { baseOf, type Refused } from "akasha/commands/modules/landing/landing.module.code.ts"

const NOTHING_ASKED = "no change was named, so nothing is run and nothing lands"

const NOTHING_MOVED = "every change named states no edit, so nothing lands"

const MECHANICAL: Running = { checks: false, writerOwesReading: false, readersOweReading: false }

export type Asking = {
  [K in keyof Changes]: { readonly at: K; readonly given: Changes[K] }
}[keyof Changes]

export async function foldedOver(world: World, asked: readonly Asking[]): Promise<Answer> {
  const before = worldBefore(world)
  const answers: Answer[] = []
  let seen = world
  for (const one of asked) {
    const reached = await reach(seen, one.at, one.given)
    if (reached.said.refused !== null) return reached.said
    answers.push(reached.said)
    seen = reached.world
  }
  const said = gathered(answers)
  if (said.refused !== null) return said
  return guardedBy(seen, said, guardsOver(world, []), before)
}

export type Writing = {
  readonly writer?: string | null
  readonly read?: string | null
}

export async function runMechanicalChange(
  root: string,
  asked: readonly Asking[],
  message: string,
  agentId: string | null = null,
  writing: Writing = {}
): Promise<Applied | Refused> {
  if (asked.length === 0) return { refusals: [NOTHING_ASKED] }
  const said = await foldedOver(ledgerAt(root, bodyIn(root), runAt), asked)
  if (said.refused !== null) return { refusals: [said.refused] }
  if (said.edits.length === 0) {
    return {
      base: baseOf(root),
      landed: [],
      formatted: [],
      said: [NOTHING_MOVED],
      wrong: [],
      commit: null,
    }
  }
  const worked = landingFrom(root, baseOf(root), said)
  if ("why" in worked) return { refusals: [worked.why] }
  return await applied(
    root,
    agentId,
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
    writing.read ?? null
  )
}
