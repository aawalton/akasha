import { type Applied, applied } from "@akasha/command-system/applying"
import { bodiesFrom } from "@akasha/command-system/edits-landing"
import { NO_GATE } from "@akasha/command-system/gate-building"
import { baseOf, type Refused } from "@akasha/command-system/landing"
import type { Running } from "../../../../commands/modules/drafting/drafting.module.code.ts"
import { generatedFileNotWritten } from "../../../guards/pages/generated-file-not-written/generated-file-not-written.change-guard.code.ts"
import { gathered } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import {
  ledgerAt,
  reach,
  type World,
  worldBefore,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { bodyIn } from "../../../modules/edits-keeping/edits-keeping.module.code.ts"
import { guardsOver, runAt } from "../../change-loading/change-loading.module.code.ts"
import type { Changes } from "./mechanical-change-running.change-runner.addressed.ts"

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
  return guardedBy(seen, said, guardsOver(world, [generatedFileNotWritten]), before)
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
  const held = bodiesFrom(root, said)
  if ("why" in held) return { refusals: [held.why] }
  return await applied(
    root,
    agentId,
    message,
    NO_GATE,
    writing.writer ?? null,
    [],
    { held: held.held, running: MECHANICAL, moves: held.moves, formatted: held.formatted },
    writing.read ?? null
  )
}
