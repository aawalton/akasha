import type { SandboxLibraryCatalogData } from "akasha/temper/capture/shape/modules/sandbox-library-catalog/sandbox-library-catalog.module.code.ts"
import { registerCatalogDomain } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const STANDARD_GLOBALS: readonly string[] = [
  "_G",
  "_VERSION",
  "assert",
  "collectgarbage",
  "dofile",
  "error",
  "gcinfo",
  "getfenv",
  "getmetatable",
  "ipairs",
  "load",
  "loadfile",
  "loadstring",
  "module",
  "newproxy",
  "next",
  "pairs",
  "pcall",
  "print",
  "rawequal",
  "rawget",
  "rawlen",
  "rawset",
  "require",
  "select",
  "setfenv",
  "setmetatable",
  "tonumber",
  "tostring",
  "type",
  "unpack",
  "warn",
  "xpcall",
]

const STANDARD_LIBRARIES: readonly string[] = [
  "bit",
  "bit32",
  "coroutine",
  "debug",
  "io",
  "math",
  "os",
  "package",
  "string",
  "table",
  "utf8",
]

interface Found {
  readonly globals: Record<string, string>
  readonly libraries: Record<string, string>
  readonly members: Record<string, string[]>
}

function membersOf(this: void, library: object): string[] {
  const names: string[] = []
  let [key] = next(library, undefined)
  while (key !== undefined) {
    if (typeof key === "string") {
      names[names.length] = key
    }
    const [onward] = next(library, key)
    key = onward
  }
  return names
}

function foundNow(this: void): Found {
  const found: Found = { globals: {}, libraries: {}, members: {} }
  for (const name of STANDARD_GLOBALS) {
    found.globals[name] = type(_G[name])
  }
  for (const name of STANDARD_LIBRARIES) {
    const library = _G[name]
    found.libraries[name] = type(library)
    if (typeof library === "object" && library !== null) {
      found.members[name] = membersOf(library)
    }
  }
  return found
}

const FOUND_AS_LOADED = foundNow()

function collectSandboxLibraryCatalog(this: void, onComplete: (this: void) => void): undefined {
  const catalog: SandboxLibraryCatalogData = {
    apiVersion: GetAPIVersion(),
    globals: FOUND_AS_LOADED.globals,
    libraries: FOUND_AS_LOADED.libraries,
    members: FOUND_AS_LOADED.members,
  }
  getSavedVariables().sandboxLibraryCatalog = catalog
  onComplete()
}

registerCatalogDomain({
  key: "sandboxLibraryCatalog",
  collect: collectSandboxLibraryCatalog,
})
