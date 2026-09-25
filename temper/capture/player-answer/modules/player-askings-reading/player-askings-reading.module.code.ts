import {
  ASKED_SHAPES,
  NO_VALUES,
} from "akasha/temper/capture/player-answer/modules/player-asking-shapes/player-asking-shapes.module.code.ts"
import {
  type ParsedFunction,
  parseFunctions,
} from "akasha/temper/eso/declaration/modules/eso-doc-tokens/eso-doc-tokens.module.code.ts"

const ASKS = /^(Get|Is|Has|Can|Does|Are)[A-Z]/

const KNOWN: ReadonlySet<string> = new Set(ASKED_SHAPES)

type PlayerAskings = Readonly<Record<string, readonly string[]>>

function shapeOf(one: ParsedFunction): string | null {
  const names = one.params.map((param) => param.name)
  for (let count = names.length; count > 0; count -= 1) {
    const shape = names.slice(0, count).join(",")
    if (KNOWN.has(shape)) return shape
  }
  return one.params.every((param) => param.isOptional) ? NO_VALUES : null
}

function asksOnly(one: ParsedFunction): boolean {
  return one.access === undefined && ASKS.test(one.name)
}

export function playerAskingsIn(doc: string): PlayerAskings {
  const found = new Map<string, Set<string>>(ASKED_SHAPES.map((shape) => [shape, new Set()]))
  for (const one of parseFunctions(doc)) {
    if (!asksOnly(one)) continue
    const shape = shapeOf(one)
    if (shape !== null) found.get(shape)?.add(one.name)
  }
  const held: Record<string, readonly string[]> = {}
  for (const shape of ASKED_SHAPES) held[shape] = [...(found.get(shape) ?? [])].sort()
  return held
}

export function askingsCode(held: PlayerAskings): string {
  const rows = Object.keys(held).map(
    (shape) => `  ${JSON.stringify(shape)}: ${JSON.stringify(held[shape] ?? [])},`
  )
  return [
    "export const PLAYER_ASKINGS: Readonly<Record<string, readonly string[]>> = {",
    ...rows,
    "}",
    "",
  ].join("\n")
}
