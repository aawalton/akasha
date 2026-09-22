import { registerCatalogDomain } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const IN_CAPITALS = "^[A-Z][A-Z0-9_]*$"

const NOTHING = 0

function writableNumber(held: number): boolean {
  return held * NOTHING === NOTHING
}

function collectEngineGlobalsCatalog(this: void, onComplete: (this: void) => void): undefined {
  const numbers: Record<string, number> = {}
  const named: string[] = []
  const unwritable: string[] = []
  for (const name in _G) {
    const [shaped] = string.match(name, IN_CAPITALS)
    if (shaped === undefined) continue
    const held = _G[name]
    if (typeof held === "number") {
      if (writableNumber(held)) {
        numbers[name] = held
      } else {
        unwritable[unwritable.length] = name
      }
    } else if (typeof held === "string") {
      named[named.length] = name
    }
  }
  getSavedVariables().engineGlobalsCatalog = {
    apiVersion: GetAPIVersion(),
    numbers,
    named,
    unwritable,
  }
  onComplete()
}

registerCatalogDomain({
  key: "engineGlobalsCatalog",
  collect: collectEngineGlobalsCatalog,
})
