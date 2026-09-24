import type { InterfaceColorEntry } from "akasha/temper/capture/shape/modules/interface-color-catalog/interface-color-catalog.module.code.ts"
import { registerCatalogDomain } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const NOTHING = 0

const FLAGS = "COMBAT_MECHANIC_FLAGS"

const FAMILIES: [string, string][] = [
  ["ALLIANCE", "ALLIANCE"],
  ["ANTIQUITY_DIGGING", "ANTIQUITY_DIGGING_COLORS"],
  ["ANTIQUITY_QUALITY_COLORS", "ANTIQUITY_QUALITY"],
  ["BATTLEGROUND_TEAM", "BATTLEGROUND_TEAM"],
  ["BOOK_MEDIUM", "BOOK_MEDIUM"],
  ["BUFF_TYPE", "BUFF_TYPE_COLOR"],
  ["CON_COLORS", "CON"],
  ["DEATH_INTERFACE_COLORS", "DEATH_INTERFACE_COLORS"],
  ["GAMEPAD_TOOLTIP", "GAMEPAD_TOOLTIP_COLOR"],
  ["GENERAL", "INTERFACE_GENERAL_COLOR"],
  ["ITEM_QUALITY_COLORS", "ITEM_DISPLAY_QUALITY"],
  ["ITEM_TOOLTIP", "ITEM_TOOLTIP_COLOR"],
  ["KEEP_TOOLTIP", "KEEP_TOOLTIP_COLOR"],
  ["LEADERBOARD_COLORS", "LEADERBOARD_COLORS"],
  ["MAP_PIN", "MAP_PIN_COLOR"],
  ["MARKET_COLORS", "MARKET_COLORS"],
  ["POWER", FLAGS],
  ["POWER_START", FLAGS],
  ["POWER_END", FLAGS],
  ["POWER_FADE_IN", FLAGS],
  ["POWER_FADE_OUT", FLAGS],
  ["PROGRESSION", "PROGRESSION_COLOR"],
  ["SKILLS_ADVISOR", "SKILLS_ADVISOR_COLOR"],
  ["STATUS_EFFECT", "STATUS_EFFECT_TYPE"],
  ["STAT_VALUE", "STAT_VALUE_COLOR"],
  ["TEXT_COLORS", "INTERFACE_TEXT_COLOR"],
  ["TRIBUTE_RESOURCE", "TRIBUTE_RESOURCE"],
  ["TRIBUTE_TIER", "TRIBUTE_TIER"],
  ["UNIT_REACTION_COLOR", "UNIT_REACTION_COLOR"],
]

function numberNamed(name: string): number | undefined {
  const held = _G[name]
  return typeof held === "number" ? held : undefined
}

function colorAt(this: void, type: number, field: number, found: InterfaceColorEntry[]): undefined {
  const [red, green, blue, alpha] = GetInterfaceColor(type, field)
  if (red + green + blue + alpha !== NOTHING) {
    found[found.length] = { type, field, red, green, blue, alpha }
  }
  return undefined
}

function colorsOf(
  this: void,
  typeName: string,
  family: string,
  found: InterfaceColorEntry[]
): undefined {
  const type = numberNamed(`INTERFACE_COLOR_TYPE_${typeName}`)
  const first = numberNamed(`${family}_ITERATION_BEGIN`)
  const last = numberNamed(`${family}_ITERATION_END`)
  if (type === undefined || first === undefined || last === undefined) return undefined
  if (family === FLAGS) {
    for (let field = first; field <= last; field = field * 2) colorAt(type, field, found)
    return undefined
  }
  for (let field = first; field <= last; field++) colorAt(type, field, found)
  return undefined
}

function collectInterfaceColorCatalog(this: void, onComplete: (this: void) => void): undefined {
  const colors: InterfaceColorEntry[] = []
  for (const [typeName, family] of FAMILIES) colorsOf(typeName, family, colors)
  getSavedVariables().interfaceColorCatalog = { apiVersion: GetAPIVersion(), colors }
  onComplete()
}

registerCatalogDomain({ key: "interfaceColorCatalog", collect: collectInterfaceColorCatalog })
