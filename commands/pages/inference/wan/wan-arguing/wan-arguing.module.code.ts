import type { Given } from "../../../../modules/calling/calling.module.code.ts"
import { namesDrawn } from "../../../../modules/name-drawing/name-drawing.module.code.ts"
import {
  heldOnce,
  numberIn as numbered,
  pathUnder,
  routedIn,
  type Shape,
  textIn,
  wholeIn,
} from "../flag-arguing/flag-arguing.module.code.ts"

export const GENERATE = "generate"

export const EXTEND = "extend"

export const FRAMES = "frames"

export const SCORE = "score"

const ACTS = [GENERATE, EXTEND, FRAMES, SCORE] as const

export type Act = (typeof ACTS)[number]

const TAKEN: { readonly [A in Act]: ReadonlyMap<string, Shape> } = {
  [GENERATE]: new Map<string, Shape>([
    ["--start-image", "token"],
    ["--end-image", "token"],
    ["--prompt", "prose"],
    ["--negative-prompt", "prose"],
    ["--seed", "token"],
    ["--steps", "token"],
    ["--lightning", "switch"],
    ["--size", "token"],
    ["--frames", "token"],
    ["--output", "token"],
    ["--timeout", "token"],
  ]),
  [EXTEND]: new Map<string, Shape>([
    ["--context", "token"],
    ["--direction", "token"],
    ["--prompt", "prose"],
    ["--negative-prompt", "prose"],
    ["--context-frames", "token"],
    ["--new-frames", "token"],
    ["--seed", "token"],
    ["--steps", "token"],
    ["--lightning", "switch"],
    ["--size", "token"],
    ["--output", "token"],
    ["--timeout", "token"],
  ]),
  [FRAMES]: new Map<string, Shape>([
    ["--video", "token"],
    ["--fps", "token"],
    ["--out-dir", "token"],
  ]),
  [SCORE]: new Map<string, Shape>([
    ["--frames-dir", "token"],
    ["--reference", "token"],
    ["--floor", "token"],
  ]),
}

const FILLED: { readonly [A in Act]: ReadonlyMap<string, string> } = {
  [GENERATE]: new Map([
    ["--size", "1280x720"],
    ["--frames", "81"],
    ["--timeout", "3600"],
  ]),
  [EXTEND]: new Map([
    ["--context-frames", "24"],
    ["--new-frames", "16"],
    ["--timeout", "3600"],
  ]),
  [FRAMES]: new Map<string, string>(),
  [SCORE]: new Map([["--floor", "0.45"]]),
}

const NEEDED: { readonly [A in Act]: readonly string[] } = {
  [GENERATE]: ["--prompt"],
  [EXTEND]: ["--context", "--direction", "--prompt"],
  [FRAMES]: ["--video"],
  [SCORE]: ["--frames-dir", "--reference"],
}

const WHOLE = new Set([
  "--seed",
  "--steps",
  "--frames",
  "--timeout",
  "--context-frames",
  "--new-frames",
  "--fps",
])

const REAL = new Set(["--floor"])

export type Taken = {
  readonly act: Act
  readonly said: ReadonlyMap<string, string>
  readonly on: ReadonlySet<string>
}

export type Read = Taken | { readonly refused: readonly string[] }

function acts(): string {
  return namesDrawn(ACTS)
}

function flagsOf(act: Act): string {
  return namesDrawn(TAKEN[act].keys())
}

function isAct(said: string): said is Act {
  return (ACTS as readonly string[]).includes(said)
}

export function readIn(argv: readonly string[]): Read {
  const [named, ...rest] = argv
  if (named === undefined) {
    return { refused: [`this names no act — it carries ${acts()}`] }
  }
  if (!isAct(named)) {
    return { refused: [`\`${named}\` is no act this carries — it carries ${acts()}`] }
  }
  const act: Act = named
  const shapes = TAKEN[act]
  const refusals: string[] = []
  const said = new Map<string, string>()
  const on = new Set<string>()
  const holding = (flag: string, value: string): undefined => heldOnce(said, refusals, flag, value)
  for (let step = 0; step < rest.length; step += 1) {
    const one = rest[step]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      refusals.push(`\`${one}\` is no flag, and \`${act}\` is said with flags alone`)
      continue
    }
    const shape = shapes.get(one)
    if (shape === "switch") {
      on.add(one)
      continue
    }
    const routed = shape === undefined ? routedIn(one, shapes) : null
    if (shape === undefined && routed === null) {
      refusals.push(`\`${one}\` is no flag \`${act}\` takes — it takes ${flagsOf(act)}`)
      continue
    }
    const value = rest[step + 1]
    step += 1
    if (value === undefined) {
      refusals.push(`\`${one}\` carries a value, and nothing followed it`)
      continue
    }
    if (routed === null) {
      holding(one, value)
      continue
    }
    const read = textIn(value)
    if ("why" in read) {
      refusals.push(`\`${one}\` could not read \`${value}\` — ${read.why}`)
      continue
    }
    holding(routed, read.text)
  }
  for (const [flag, value] of FILLED[act]) if (!said.has(flag)) said.set(flag, value)
  for (const flag of NEEDED[act]) {
    if (!said.has(flag)) refusals.push(`\`${act}\` names \`${flag}\`, and nothing said it`)
  }
  for (const [flag, value] of said) {
    if (WHOLE.has(flag) && wholeIn(value) === null) {
      refusals.push(
        `\`${flag}\` carries a whole number that is not below zero, and \`${value}\` is not one`
      )
    }
    if (REAL.has(flag) && (value.trim() === "" || !Number.isFinite(Number(value)))) {
      refusals.push(`\`${flag}\` carries a number, and \`${value}\` is not one`)
    }
  }
  if (refusals.length > 0) return { refused: refusals }
  return { act, said, on }
}

export function at(given: Given, path: string): string {
  return pathUnder(given.root, path)
}

export function numberIn(said: ReadonlyMap<string, string>, flag: string): number | undefined {
  return numbered(said, flag)
}
