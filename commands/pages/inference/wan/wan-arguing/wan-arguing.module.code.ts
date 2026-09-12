import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  heldOnce,
  numberIn as numbered,
  pathUnder,
  routedIn,
  type Shape,
  textIn,
  wholeIn,
} from "akasha/commands/pages/inference/flag-arguing/flag-arguing.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

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

export type Taking = {
  readonly shapes: ReadonlyMap<string, Shape>
  readonly filled: ReadonlyMap<string, string>
  readonly needed: readonly string[]
}

export type Taken = {
  readonly said: ReadonlyMap<string, string>
  readonly on: ReadonlySet<string>
}

export type Read = Taken | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[], taking: Taking): Read {
  const { shapes, filled, needed } = taking
  const refusals: string[] = []
  const said = new Map<string, string>()
  const on = new Set<string>()
  const holding = (flag: string, value: string): undefined => heldOnce(said, refusals, flag, value)
  for (let step = 0; step < argv.length; step += 1) {
    const one = argv[step]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      refusals.push(`\`${one}\` is no flag, and this is said with flags alone`)
      continue
    }
    const shape = shapes.get(one)
    if (shape === "switch") {
      on.add(one)
      continue
    }
    const routed = shape === undefined ? routedIn(one, shapes) : null
    if (shape === undefined && routed === null) {
      refusals.push(`\`${one}\` is no flag this takes — it takes ${namesDrawn(shapes.keys())}`)
      continue
    }
    const value = argv[step + 1]
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
  for (const [flag, value] of filled) if (!said.has(flag)) said.set(flag, value)
  for (const flag of needed) {
    if (!said.has(flag)) refusals.push(`this names \`${flag}\`, and nothing said it`)
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
  return { said, on }
}

export function at(given: Given, path: string): string {
  return pathUnder(given.root, path)
}

export function numberIn(said: ReadonlyMap<string, string>, flag: string): number | undefined {
  return numbered(said, flag)
}
