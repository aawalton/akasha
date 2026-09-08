import { type Applied, applied } from "@akasha/command-system/applying"
import type { Running } from "@akasha/command-system/drafting"
import { bodiesFrom } from "@akasha/command-system/edits-landing"
import { NO_GATE } from "@akasha/command-system/gate-building"
import type { Refused } from "@akasha/command-system/landing"
import { gathered, notText } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  ledgerAt,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { bodyIn } from "../../../modules/edits-keeping/edits-keeping.module.code.ts"
import { runAt } from "../../change-loading/change-loading.module.code.ts"
import type { Changes } from "./mechanical-change-running.change-runner.addressed.ts"

const NOTHING_ASKED = "no change was named, so nothing is run and nothing lands"

const MECHANICAL: Running = { checks: false, writerOwesReading: false, readersOweReading: false }

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

export function textIn(root: string): (path: string) => string | null {
  const reads = bodyIn(root)
  return (path) => {
    const held = reads(path)
    return held === null || notText(held) ? null : held
  }
}

export async function runMechanicalChange(
  root: string,
  asked: readonly Asking[],
  message: string,
  agentId: string | null = null
): Promise<Applied | Refused> {
  if (asked.length === 0) return { refusals: [NOTHING_ASKED] }
  const said = await foldedOver(ledgerAt(root, textIn(root), runAt), asked)
  if (said.refused !== null) return { refusals: [said.refused] }
  const held = bodiesFrom(root, said)
  if ("why" in held) return { refusals: [held.why] }
  return await applied(root, agentId, message, NO_GATE, null, [], { held, running: MECHANICAL })
}
