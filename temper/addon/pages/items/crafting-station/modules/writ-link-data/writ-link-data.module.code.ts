import { LINK } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-link-data-table/writ-link-data-table.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/modules/writ-public-api/writ-public-api.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/writ-writworthy-global/writ-writworthy-global.type-declaration.d.ts"

export function toLinkKey(name: string): string {
  const [s1] = string.gsub(name, "%^.*", "")
  const [s2] = string.gsub(s1, "|.*", "")
  return string.lower(s2)
}

export function findLink(matName: string): string | undefined {
  const key = toLinkKey(matName)
  return LINK[key]
}

TemperWrit.LINK = LINK
TemperWrit.FindLink = findLink
TemperWrit.ToLinkKey = toLinkKey
