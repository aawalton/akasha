import {
  asString,
  asZoColorDef,
} from "akasha/temper/addon/pages/items/crafting-station/modules/potion-casts/potion-casts.module.code.ts"
import {
  COLOR_DISABLED,
  COLOR_SELECT,
} from "akasha/temper/addon/pages/items/crafting-station/modules/potion-constants/potion-constants.module.code.ts"
import {
  conformsToSearch,
  createFavoriteIdentifier,
  matchesQuest,
} from "akasha/temper/addon/pages/items/crafting-station/modules/potion-potion-match/potion-potion-match.module.code.ts"
import { PotMaker } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-state/potion-state.module.code.ts"
import {
  addLineCenter,
  addLineSubTitle,
  addLineTitle,
  isScreenRightHalf,
} from "akasha/temper/addon/pages/items/crafting-station/modules/potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import type {
  Potion,
  PotionFactory,
} from "akasha/temper/addon/pages/items/crafting-station/modules/potion-types/potion-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/type/crafting-addon-neighbours/crafting-addon-neighbours.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

interface PotionButton extends Control {
  potion: Potion
}

interface FontControl {
  SetFont: (this: void, font: string) => undefined
}

function asPotion(value: unknown): Potion {
  return value as Potion
}
function asPotionButton(value: unknown): PotionButton {
  return value as PotionButton
}
function asFontControl(value: unknown): FontControl {
  return value as FontControl
}

function newPotion(this: void, o: Partial<Potion>): Potion {
  const instance = asPotion(o)
  const solvent = instance.solvent
  if (solvent !== undefined && solvent.name !== "") {
    const pack1 = instance.ingredients[0]?.pack[0]
    const pack2 = instance.ingredients[1]?.pack[0]
    const solventPack = solvent.pack[0]
    if (pack1 !== undefined && pack2 !== undefined && solventPack !== undefined) {
      const third = instance.ingredients[2]
      const pack3 = third?.pack[0]
      const usePack3 = third !== undefined && pack3 !== undefined
      const [link] = GetAlchemyResultingItemLink(
        solventPack.bagId,
        solventPack.slotIndex,
        pack1.bagId,
        pack1.slotIndex,
        pack2.bagId,
        pack2.slotIndex,
        usePack3 ? pack3.bagId : undefined,
        usePack3 ? pack3.slotIndex : undefined,
        LINK_STYLE_DEFAULT
      )
      instance.itemLink = link
    }
  } else {
    instance.searchName = ""
    instance.name = ""
    instance.itemLink = ""
    instance.solvent = undefined
  }
  instance.numTraits = NonContiguousCount(instance.traits)
  return instance
}

function getQualityColor(this: void, self: Potion): string | ZoColorDef {
  if (self.qualityColor !== "") {
    return self.qualityColor
  }
  self.qualityColor = GetItemQualityColor(GetItemLinkFunctionalQuality(self.itemLink))
  return self.qualityColor
}

function getName(this: void, self: Potion): string {
  if (self.name !== "") {
    return self.name
  }
  self.name = GetItemLinkName(self.itemLink)
  return self.name
}

function getUpperName(this: void, self: Potion): string {
  if (self.upperName !== "") {
    return self.upperName
  }
  self.upperName = string.upper(getName(self))
  return self.upperName
}

function setFont(this: void, control: Control, font: string): undefined {
  asFontControl(control).SetFont(font)
}

function applyLanguageSpecific(this: void): undefined {
  if (PotMaker.language.name === "jp") {
    const fontCommonSettings = "$(CHAT_FONT)|16|soft-shadow-thin"
    setFont(TemperPotionsSearchButton, fontCommonSettings)
    setFont(TemperPotionsOutputCombinationLabel, fontCommonSettings)
    setFont(TemperPotionsOutputTraitLabel, fontCommonSettings)
    setFont(TemperPotionsOutputSearchButton, fontCommonSettings)
    setFont(TemperPotionsTraitLabel1, fontCommonSettings)
    setFont(TemperPotionsTraitLabel2, fontCommonSettings)
    setFont(TemperPotionsSolventLabel, fontCommonSettings)
    setFont(TemperPotionsReagentLabel, fontCommonSettings)
    setFont(TemperPotionsOnlyReagentText, fontCommonSettings)
    setFont(TemperPotionsOnly2Text, fontCommonSettings)
    setFont(TemperPotionsQuestWrits, fontCommonSettings)
    setFont(TemperPotionsFavorites, fontCommonSettings)
    setFont(TemperPotionsOutputFavorite, fontCommonSettings)
    setFont(TemperPotionsOutputPageLabel, fontCommonSettings)
  }
}

function getPotion(this: void, resultButton: Control): Potion {
  return asPotionButton(resultButton).potion
}

function showPotion(this: void, resultButton: Control): undefined {
  const potion = getPotion(resultButton)
  PotMaker.AddToCraftTable(potion)
  PotMaker.SetSelected(potion)
}

function getIngredientString(this: void, self: Potion): string {
  return zo_strformat(
    "<<1>> (<<2>>)",
    getPotionNameString(self),
    COLOR_SELECT.Colorize(tostring(self.quantity))
  )
}

function getInBagString(this: void, self: Potion): string {
  let inBag = ""
  if (self.itemLink !== "") {
    const [bagCount, bankCount] = GetItemLinkStacks(self.itemLink)
    if (bankCount > 0) {
      inBag = "|t28:28:esoui/art/icons/servicemappins/servicepin_bank.dds:inheritColor|t"
    } else if (bagCount > 0) {
      inBag =
        "|t28:28:esoui/art/crafting/crafting_provisioner_inventorycolumn_icon.dds:inheritColor|t"
    }
  }
  return inBag
}

const UNKNOWN_RESULT: Record<number, string> = {
  [ITEMTYPE_POTION_BASE]: zo_strformat(
    SI_ALCHEMY_UNKNOWN_RESULT,
    GetString(SI_ITEM_FORMAT_STR_POTION)
  ),
  [ITEMTYPE_POISON_BASE]: zo_strformat(
    SI_ALCHEMY_UNKNOWN_RESULT,
    GetString(SI_ITEM_FORMAT_STR_POISON)
  ),
}

function getPotionNameString(this: void, self: Potion): string {
  if (self.solvent === undefined) {
    return COLOR_DISABLED.Colorize(zo_strformat("(<<1>>)", PotMaker.language.need_solvent))
  } else if (self.itemLink === "") {
    return UNKNOWN_RESULT[PotMaker.solventMode] ?? asString(UNKNOWN_RESULT[ITEMTYPE_POTION_BASE])
  } else {
    const color = getQualityColor(self)
    const colorDef = asZoColorDef(color)
    return colorDef.Colorize(zo_strformat(SI_TOOLTIP_ITEM_NAME, getName(self)))
  }
}

function setToolTip(this: void, self: Potion, resultButton: Control): undefined {
  if (self.name === "") {
    if (isScreenRightHalf(resultButton)) {
      InitializeTooltip(InformationTooltip, resultButton, RIGHT, -32, 0, LFFT)
    } else {
      InitializeTooltip(InformationTooltip, resultButton, LEFT, 32, 0, RIGHT)
    }
    InformationTooltip.ClearLines()
    const potion = asPotionButton(resultButton).potion
    addLineTitle(InformationTooltip, getPotionNameString(potion))
    InformationTooltip.AddVerticalPadding(-9)
    ZO_Tooltip_AddDivider(InformationTooltip)

    addLineSubTitle(InformationTooltip, GetString(SI_PROVISIONER_INGREDIENTS_HEADER))
    const color = GetItemQualityColor(2)
    for (let i = 0; i < potion.ingredients.length; i = i + 1) {
      const ingredient = potion.ingredients[i]
      if (ingredient === undefined) {
        continue
      }
      const amount = ingredient.stack
      addLineCenter(
        InformationTooltip,
        zo_strformat(
          "<<1>> (<<2>>)",
          color.Colorize(zo_strformat(SI_TOOLTIP_ITEM_NAME, ingredient.name)),
          amount
        )
      )
    }
    addLineSubTitle(InformationTooltip, GetString(SI_CRAFTING_COMPONENT_TOOLTIP_TRAITS))
    for (const v in potion.traits) {
      const effect = potion.traits[v]
      if (effect !== undefined) {
        const traitColor = PotMaker.traitColor[effect]
        if (traitColor !== undefined) {
          addLineCenter(InformationTooltip, traitColor.Colorize(v))
        }
      }
    }
  } else {
    if (isScreenRightHalf(resultButton)) {
      InitializeTooltip(ItemTooltip, resultButton, RIGHT, -32, 0, LEFT)
    } else {
      InitializeTooltip(ItemTooltip, resultButton, LEFT, 32, 0, RIGHT)
    }
    ItemTooltip.SetLink(self.itemLink)
  }
}

const POTION_FACTORY: PotionFactory = {
  new: newPotion,
  get: getPotion,
  show: showPotion,
  GetQualityColor: getQualityColor,
  GetName: getName,
  GetUpperName: getUpperName,
  MatchesQuest: matchesQuest,
  conformsToSearch,
  createFavoriteIdentifier,
  getIngredientString,
  getInBagString,
  getPotionNameString,
  SetToolTip: setToolTip,
}

PotMaker.Potion = POTION_FACTORY
PotMaker.ApplyLanguageSpecific = applyLanguageSpecific
