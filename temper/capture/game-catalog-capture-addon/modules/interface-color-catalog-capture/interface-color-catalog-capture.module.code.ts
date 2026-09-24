import type { InterfaceColorEntry } from "akasha/temper/capture/shape/modules/interface-color-catalog/interface-color-catalog.module.code.ts"
import { registerCatalogDomain } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const FIELDS = 128

const NOTHING = 0

function boundOf(name: string): number {
  const held = _G[name]
  return typeof held === "number" ? held : NOTHING
}

function colorsOf(this: void, type: number, found: InterfaceColorEntry[]): undefined {
  for (let field = 0; field < FIELDS; field++) {
    const [red, green, blue, alpha] = GetInterfaceColor(type, field)
    if (red + green + blue + alpha !== NOTHING) {
      found[found.length] = { type, field, red, green, blue, alpha }
    }
  }
  return undefined
}

function collectInterfaceColorCatalog(this: void, onComplete: (this: void) => void): undefined {
  const colors: InterfaceColorEntry[] = []
  const last = boundOf("INTERFACE_COLOR_TYPE_ITERATION_END")
  for (let type = boundOf("INTERFACE_COLOR_TYPE_ITERATION_BEGIN"); type <= last; type++) {
    colorsOf(type, colors)
  }
  getSavedVariables().interfaceColorCatalog = { apiVersion: GetAPIVersion(), colors }
  onComplete()
}

registerCatalogDomain({ key: "interfaceColorCatalog", collect: collectInterfaceColorCatalog })
