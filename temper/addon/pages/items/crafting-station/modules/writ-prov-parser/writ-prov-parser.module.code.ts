import { str } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-i18n/writ-i18n.module.code.ts"
import { newKnow } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-know/writ-know.module.code.ts"
import { startNewEvent as logStartNewEvent } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-log/writ-log.module.code.ts"
import {
  findRecipe,
  type Recipe,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-prov-data/writ-prov-data.module.code.ts"
import {
  PR_DRINK_4X,
  PR_FOOD_4X,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-required-skill/writ-required-skill.module.code.ts"
import type {
  KnowList,
  MatList,
  Parser,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-types/writ-types.module.code.ts"
import { KNOW } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-types/writ-types.module.code.ts"
import { toWritFields } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-writ-fields/writ-writ-fields.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/writ-global/writ-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"

interface ProvisioningParser extends Parser {
  recipe: Recipe | undefined
}

export function newProvisioningParser(): ProvisioningParser {
  const o: ProvisioningParser = {
    class: "provisioning",
    crafting_type: CRAFTING_TYPE_PROVISIONING,
    recipe: undefined,

    ParseItemLink(this: Parser, itemLink: string): Parser | undefined {
      logStartNewEvent("ParseItemLink: %s %s", o.class, itemLink)
      const fields = toWritFields(itemLink)
      if (fields.writ1 === undefined) {
        return undefined
      }
      o.recipe = findRecipe(fields.writ1)
      if (o.recipe === undefined) {
        return undefined
      }
      return o
    },

    ToMatList(this: Parser): MatList {
      return o.recipe?.mat_list ?? []
    },

    ToKnowList(this: Parser): KnowList {
      logStartNewEvent("ToKnowList: %s", o.class)
      const recipe = o.recipe
      const k = newKnow({
        name: "recipe",
        is_known: recipe?.is_known ?? false,
        lack_msg: str("know_err_recipe") ?? "",
        how: KNOW.RECIPE,
      })
      const r: KnowList = [k]
      if (recipe?.fooddrinkItemType === ITEMTYPE_FOOD) {
        const chef = PR_FOOD_4X.ToKnow()
        chef.is_warn = true
        r[r.length] = chef
      } else if (recipe?.fooddrinkItemType === ITEMTYPE_DRINK) {
        const brewer = PR_DRINK_4X.ToKnow()
        brewer.is_warn = true
        r[r.length] = brewer
      }
      return r
    },
  }
  return o
}

interface ProvisioningParserNamespace {
  class: string
  New: (this: ProvisioningParserNamespace) => ProvisioningParser
}

const PROVISIONING_PARSER_NAMESPACE: ProvisioningParserNamespace = {
  class: "provisioning",
  New: newProvisioningParser,
}

const PROVISIONING_NAMESPACE = TemperWrit.Provisioning
if (PROVISIONING_NAMESPACE !== undefined) {
  PROVISIONING_NAMESPACE.Parser = PROVISIONING_PARSER_NAMESPACE
}
