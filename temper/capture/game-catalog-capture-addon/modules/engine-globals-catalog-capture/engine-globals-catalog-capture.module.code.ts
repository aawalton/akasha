import { registerCatalogDomain } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const IN_CAPITALS = "^[A-Z][A-Z0-9_]*$"

const NOTHING = 0

interface Found {
  readonly numbers: Record<string, number>
  readonly named: string[]
  readonly words: Record<string, string>
  readonly unwritable: string[]
}

function writableNumber(held: number): boolean {
  return held * NOTHING === NOTHING
}

function keepGlobal(this: void, found: Found, name: string): undefined {
  const [shaped] = string.match(name, IN_CAPITALS)
  if (shaped === undefined) return
  const held = _G[name]
  if (typeof held === "number") {
    if (writableNumber(held)) {
      found.numbers[name] = held
    } else {
      found.unwritable[found.unwritable.length] = name
    }
  } else if (typeof held === "string") {
    found.named[found.named.length] = name
    found.words[name] = held
  }
}

function listGlobals(this: void, found: Found): string {
  const given = InsecureNext
  const step = given ?? next
  let [key] = step(_G, undefined)
  while (key !== undefined) {
    if (typeof key === "string") {
      keepGlobal(found, key)
    }
    const [onward] = step(_G, key)
    key = onward
  }
  return given === undefined ? "next" : "InsecureNext"
}

function collectEngineGlobalsCatalog(this: void, onComplete: (this: void) => void): undefined {
  const found: Found = { numbers: {}, named: [], words: {}, unwritable: [] }
  const listedBy = listGlobals(found)
  getSavedVariables().engineGlobalsCatalog = {
    apiVersion: GetAPIVersion(),
    listedBy,
    numbers: found.numbers,
    named: found.named,
    words: found.words,
    unwritable: found.unwritable,
  }
  onComplete()
}

registerCatalogDomain({
  key: "engineGlobalsCatalog",
  collect: collectEngineGlobalsCatalog,
})
