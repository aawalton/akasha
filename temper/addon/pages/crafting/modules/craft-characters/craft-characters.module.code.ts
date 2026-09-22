import { recordNestedInstrumentMs } from "akasha/temper/addon/pages/crafting/modules/crafting-slot-handler-stats/crafting-slot-handler-stats.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/crafting/modules/crafting-state/crafting-state.module.code.ts"
import { PUBLIC as CHARACTER_KNOWLEDGE } from "akasha/temper/addon/pages/crafting/modules/knowledge-state/knowledge-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

function buildCharacters(this: void): string[] {
  const seen: Record<string, boolean> = {}
  const orderedIndex: string[] = []
  const add = (name: string): undefined => {
    if (seen[name] !== true) {
      seen[name] = true
      orderedIndex.push(name)
    }
  }
  for (const [, entry] of ipairs(CHARACTER_KNOWLEDGE.GetCharacterList())) {
    add(entry.name)
  }
  for (const [key] of pairs(STATE.Account.player)) {
    add(key)
  }
  table.sort(orderedIndex)
  return orderedIndex
}

export function getCharacters(): string[] {
  const start = GetGameTimeMilliseconds()
  const built = buildCharacters()
  recordNestedInstrumentMs("getCharacters", GetGameTimeMilliseconds() - start)
  return built
}
