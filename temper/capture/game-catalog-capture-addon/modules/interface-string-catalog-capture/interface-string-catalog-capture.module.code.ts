import { registerCatalogDomain } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const STRING_NAME = "^SI_[A-Z0-9_]+$"

function keepString(this: void, strings: Record<string, string>, name: string): undefined {
  const [shapedAt] = string.find(name, STRING_NAME)
  if (shapedAt === undefined) return undefined
  const held = _G[name]
  if (typeof held !== "number") return undefined
  const text = GetString(held)
  if (text !== "") strings[name] = text
  return undefined
}

function collectInterfaceStringCatalog(this: void, onComplete: (this: void) => void): undefined {
  const strings: Record<string, string> = {}
  const step = InsecureNext ?? next
  let [key] = step(_G, undefined)
  while (key !== undefined) {
    if (typeof key === "string") keepString(strings, key)
    const [onward] = step(_G, key)
    key = onward
  }
  getSavedVariables().interfaceStringCatalog = { apiVersion: GetAPIVersion(), strings }
  onComplete()
  return undefined
}

registerCatalogDomain({ key: "interfaceStringCatalog", collect: collectInterfaceStringCatalog })
