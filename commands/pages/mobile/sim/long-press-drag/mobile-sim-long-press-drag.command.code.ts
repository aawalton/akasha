import type { LongPressDragSpec } from "akasha/alan/harness/mobile-cli/appium-client/appium-client.module.code.ts"
import { longPressDrag } from "akasha/alan/harness/mobile-cli/appium-client/appium-client.module.code.ts"
import { driving } from "akasha/alan/harness/mobile-cli/sim-driver/sim-driver.module.code.ts"
import type { SimSessionState } from "akasha/alan/harness/mobile-cli/sim-session/sim-session.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { dragSteps } from "akasha/commands/arguments/pages/drag-steps.argument.ts"
import { holdMs } from "akasha/commands/arguments/pages/hold-ms.argument.ts"
import { stepMs } from "akasha/commands/arguments/pages/step-ms.argument.ts"
import { toX } from "akasha/commands/arguments/pages/to-x.argument.ts"
import { toY } from "akasha/commands/arguments/pages/to-y.argument.ts"
import { x } from "akasha/commands/arguments/pages/x.argument.ts"
import { y } from "akasha/commands/arguments/pages/y.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

import { mobileSimLongPressDrag as page } from "akasha/commands/pages/mobile/sim/long-press-drag/mobile-sim-long-press-drag.command.ts"

const TAKES = [x, y, toX, toY, holdMs, dragSteps, stepMs]

export type Read = {
  readonly x: number
  readonly y: number
  readonly toX: number
  readonly toY: number
  readonly holdMs: number
  readonly steps: number
  readonly stepMs: number
}

export type Dragging = (done: string[], read: Read) => Promise<Answer>

export type Pressing = {
  readonly state: (done: string[]) => Promise<SimSessionState>
  readonly pressed: (base: string, sessionId: string, spec: LongPressDragSpec) => Promise<void>
}

const PRESSING: Pressing = {
  state: driving,
  pressed: longPressDrag,
}

export function sentSaid(read: Read): string {
  return (
    `sent a press at (${read.x}, ${read.y}) dragging to (${read.toX}, ${read.toY}), ` +
    "which the sim may have taken"
  )
}

export async function dragged(
  done: string[],
  read: Read,
  pressing: Pressing = PRESSING
): Promise<Answer> {
  const state = await pressing.state(done)
  done.push(sentSaid(read))
  await pressing.pressed(state.appiumBase, state.sessionId, {
    x: read.x,
    y: read.y,
    toX: read.toX,
    toY: read.toY,
    holdMs: read.holdMs,
    steps: read.steps,
    stepMs: read.stepMs,
  })
  return told([
    `dragged\t(${read.x}, ${read.y}) to (${read.toX}, ${read.toY})\theld ${read.holdMs}ms`,
  ])
}

export async function mobileSimLongPressDrag(
  argv: readonly string[],
  given: Given,
  dragging: Dragging = dragged
): Promise<Answer> {
  const said = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in said) return refusedBy(said.refused)
  const taken = said.taken
  const read: Read = {
    x: taken.x,
    y: taken.y,
    toX: taken.toX,
    toY: taken.toY,
    holdMs: taken.holdMs,
    steps: taken.dragSteps,
    stepMs: taken.stepMs,
  }
  return await answering(async (done) => await dragging(done, read))
}
