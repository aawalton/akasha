import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox-additions/eso-sandbox-additions.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function migrateStudiesShape(): undefined {
  const studies = STATE.Account.crafting.studies
  for (const [char, entry] of pairs(studies)) {
    if (!istable(entry)) {
      studies[char] = {}
    }
  }
}
