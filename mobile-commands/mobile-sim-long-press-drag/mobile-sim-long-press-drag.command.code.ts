import type { Answer } from "@akasha/command-system/calling"
import { longPressDrag } from "@akasha/mobile-cli/appium-client"
import {
  answering,
  countOf,
  driving,
  flagsAloneIn,
  type Reading,
  refusedBy,
  type Said,
  told,
  wordsIn,
} from "../mobile-answering/mobile-answering.module.code.ts"

const X = "--x"

const Y = "--y"

const TO_X = "--to-x"

const TO_Y = "--to-y"

const HOLD_MS = "--hold-ms"

const STEPS = "--steps"

const STEP_MS = "--step-ms"

const VALUED = [X, Y, TO_X, TO_Y, HOLD_MS, STEPS, STEP_MS]

const DEFAULT_HOLD_MS = 800

const DEFAULT_STEPS = 12

const DEFAULT_STEP_MS = 30

export type Read = {
  readonly x: number
  readonly y: number
  readonly toX: number
  readonly toY: number
  readonly holdMs: number
  readonly steps: number
  readonly stepMs: number
}

function neededIn(said: Said, flag: string): Reading<number> {
  const held = countOf(said.named[flag], flag)
  if (held === null) return { refused: [`\`${flag}\` names a coordinate, and nothing did`] }
  return held
}

function orElse(said: Said, flag: string, instead: number): Reading<number> {
  const held = countOf(said.named[flag], flag)
  return held === null ? instead : held
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, [])
  if ("refused" in said) return said
  const loose = flagsAloneIn(said)
  if (loose.length > 0) return { refused: loose }

  const x = neededIn(said, X)
  if (typeof x !== "number") return x
  const y = neededIn(said, Y)
  if (typeof y !== "number") return y
  const toX = neededIn(said, TO_X)
  if (typeof toX !== "number") return toX
  const toY = neededIn(said, TO_Y)
  if (typeof toY !== "number") return toY

  const holdMs = orElse(said, HOLD_MS, DEFAULT_HOLD_MS)
  if (typeof holdMs !== "number") return holdMs
  const steps = orElse(said, STEPS, DEFAULT_STEPS)
  if (typeof steps !== "number") return steps
  const stepMs = orElse(said, STEP_MS, DEFAULT_STEP_MS)
  if (typeof stepMs !== "number") return stepMs

  return { x, y, toX, toY, holdMs, steps, stepMs }
}

async function dragged(read: Read): Promise<Answer> {
  const state = await driving()
  await longPressDrag(state.appiumBase, state.sessionId, {
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

export async function mobileSimLongPressDrag(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => await dragged(read))
}
