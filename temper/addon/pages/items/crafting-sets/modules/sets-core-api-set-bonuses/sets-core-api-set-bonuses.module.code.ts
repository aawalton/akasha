import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

function getSetBonuses(this: void, itemLink: string, numBonuses: number): (string | undefined)[] {
  let bonuses: (string | undefined)[]
  if (numBonuses > 0) {
    bonuses = []
    for (const i of $range(1, numBonuses)) {
      const [, description] = GetItemLinkSetBonusInfo(itemLink, false, i)
      bonuses.push(description)
    }
  } else {
    const [, , description] = GetItemLinkEnchantInfo(itemLink)
    bonuses = [description]
  }
  return bonuses
}
lib.GetSetBonuses = getSetBonuses
