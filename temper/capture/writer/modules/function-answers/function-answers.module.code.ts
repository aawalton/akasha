import type { EngineAnswer } from "akasha/temper/capture/shape/modules/engine-answer-catalog/engine-answer-catalog.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export type AskedValue = number | string

const NOTHING = 0

function writable(this: void, held: unknown): held is EngineAnswer {
  if (typeof held === "number") return held * NOTHING === NOTHING
  return typeof held === "string" || typeof held === "boolean"
}

export function answersOf(
  this: void,
  name: string,
  values: readonly AskedValue[] = []
): EngineAnswer[] | undefined {
  const held: unknown = _G[name]
  if (typeof held !== "function") return undefined
  const asked = held as (this: void, ...values: AskedValue[]) => LuaMultiReturn<unknown[]>
  const [ok, packed] = pcall((): unknown[] => [...asked(...values)])
  if (!ok) return undefined
  const kept: EngineAnswer[] = []
  for (const one of packed) {
    if (!writable(one)) return kept
    kept[kept.length] = one
  }
  return kept
}
