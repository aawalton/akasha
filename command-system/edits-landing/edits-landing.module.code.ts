import { formattedBody } from "@akasha/code/code-format"
import {
  gathered,
  notText,
  replayed,
} from "../../changes/modules/change-answer/change-answer.module.code.ts"
import type { Answer as Said } from "../../changes/modules/change-answer/change-answer.module.types.ts"
import {
  bytesOf,
  ledgerAt,
  reach,
  type World,
} from "../../changes/modules/change-shadow/change-shadow.module.code.ts"
import { bodyIn } from "../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { runAt } from "../../changes/runners/change-loading/change-loading.module.code.ts"
import type { Changes } from "../../changes/runners/pages/change-running/change-running.change-runner.addressed.ts"
import { type Applied, applied } from "../applying/applying.module.code.ts"
import type { Bodies, Body, Running } from "../drafting/drafting.module.code.ts"
import { NO_GATE } from "../gate-building/gate-building.module.code.ts"
import type { Refused } from "../landing/landing.module.code.ts"

const BYTES = new TextEncoder()

const NOT_TEXT_SAID = "is not text, so no body is worked out for it"

const NOTHING_ASKED = "no change was named, so nothing is run and nothing lands"

const MECHANICAL: Running = { checks: false, writerOwesReading: false, readersOweReading: false }

export function owingIn(said: Said): ReadonlyMap<string, boolean> {
  const owed = new Map<string, boolean>()
  for (const one of said.edits) {
    if (one.readersOweReading === undefined) continue
    const at = one.kind === "move" ? [one.pathFrom, one.pathTo] : [one.path]
    for (const path of at) owed.set(path, (owed.get(path) ?? false) || one.readersOweReading)
  }
  return owed
}

export function bodiesFrom(root: string, said: Said): Bodies | { readonly why: string } {
  const reads = bodyIn(root)
  const after = replayed(said, reads)
  if ("refused" in after) return { why: after.refused }
  const owed = owingIn(said)
  const held = new Map<string, Body>()
  for (const [path, body] of after) {
    if (notText(body)) return { why: `\`${path}\` ${NOT_TEXT_SAID}` }
    const done = body === null ? null : formattedBody(root, path, BYTES.encode(body))
    const owes = owed.get(path)
    held.set(path, {
      was: bytesOf(reads(path)),
      body: done === null ? null : done.body,
      ...(owes === undefined ? {} : { readersOweReading: owes }),
    })
  }
  return held
}

export type Asking = {
  [K in keyof Changes]: { readonly at: K; readonly given: Changes[K] }
}[keyof Changes]

export async function foldedOver(world: World, asked: readonly Asking[]): Promise<Said> {
  const answers: Said[] = []
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
