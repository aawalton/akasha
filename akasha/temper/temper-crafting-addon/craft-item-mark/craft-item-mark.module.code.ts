import { COOK } from "../craft-cook/craft-cook.module.code.ts"
import * as DataValidation from "../craft-validation/craft-validation.module.code.ts"
import { splitLink } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

const WM = WINDOW_MANAGER

const ITEMMARK: Record<string, TextureControl> = {}

export interface CsItemMarkSlot {
  bagId: number
  slotIndex: number
  lootId: number
}

export interface CsItemMarkControl extends Control {
  dataEntry?: { data?: CsItemMarkSlot }
}

export function setItemMark(
  control: CsItemMarkControl | undefined,
  linksource?: number
): undefined {
  if (control === undefined) {
    return
  }
  const account = STATE.Account
  const row = control
  function getMark(owner: Control): TextureControl {
    const name = owner.GetName()
    let m = ITEMMARK[name]
    if (m === undefined) {
      m = WM.CreateControl(`${name}CSMark`, owner, CT_TEXTURE)
      ITEMMARK[name] = m
    }
    m.SetDrawLayer(3)
    m.SetDimensions(30, 30)
    m.SetHidden(true)
    m.ClearAnchors()
    return m
  }
  function show(
    mark: TextureControl,
    icon: string,
    color: boolean | [number, number, number]
  ): undefined {
    if (color === false) {
      color = [1, 0, 1]
    } else if (color === true) {
      color = [1, 0, 0]
    }
    mark.SetColor(color[0], color[1], color[2], 0.8)
    mark.SetHidden(false)
    if (row.GetWidth() - row.GetHeight() > 5) {
      mark.SetAnchor(LEFT, row.GetNamedChild("Bg"), LEFT, 0, 0)
    } else {
      mark.SetAnchor(TOPLEFT, row.GetNamedChild("Bg"), TOPLEFT, -4, -4)
    }
    mark.SetTexture(icon)
  }
  const slot = control.dataEntry?.data
  if (slot === undefined) {
    return
  }
  let link: string | undefined
  const uniqueId = GetItemUniqueId(slot.bagId, slot.slotIndex)
  let uid: string | undefined = uniqueId !== undefined ? Id64ToString(uniqueId) : undefined
  if (linksource === 3) {
    link = GetTradingHouseSearchResultItemLink(slot.slotIndex, LINK_STYLE_DEFAULT)
    uid = undefined
  } else if (linksource === 2) {
    link = GetLootItemLink(slot.lootId, LINK_STYLE_DEFAULT)
    uid = undefined
  } else if (linksource === 1) {
    link = GetItemLink(slot.bagId, slot.slotIndex, LINK_STYLE_DEFAULT)
  }
  if (link === undefined) {
    return
  }
  const mark = getMark(control)
  if (account.options.showsymbols) {
    const trait = GetItemTrait(slot.bagId, slot.slotIndex)
    if (
      trait === ITEM_TRAIT_TYPE_ARMOR_INTRICATE ||
      trait === ITEM_TRAIT_TYPE_WEAPON_INTRICATE ||
      trait === ITEM_TRAIT_TYPE_JEWELRY_INTRICATE
    ) {
      show(mark, "esoui/art/icons/servicemappins/servicepin_smithy.dds", [0, 1, 1])
      return
    } else if (
      trait === ITEM_TRAIT_TYPE_ARMOR_ORNATE ||
      trait === ITEM_TRAIT_TYPE_WEAPON_ORNATE ||
      trait === ITEM_TRAIT_TYPE_JEWELRY_ORNATE
    ) {
      show(mark, "esoui/art/guild/guild_tradinghouseaccess.dds", [1, 1, 0])
      return
    }
  }
  if (account.options.markitems) {
    const [item, specializedItemType] = GetItemLinkItemType(link)
    if (item === ITEMTYPE_INGREDIENT) {
      const ingid = splitLink(link, 3)
      if (ingid !== undefined && ingid !== false) {
        if (COOK.ingredient[ingid]) {
          show(mark, "esoui/art/inventory/newitem_icon.dds", [0, 1, 0])
        } else {
          mark.SetHidden(true)
        }
        return
      }
    }
    if (item === ITEMTYPE_RACIAL_STYLE_MOTIF) {
      const [styleNeed] = DataValidation.isStyleNeeded(link)
      if (styleNeed !== "") {
        show(mark, "esoui/art/inventory/newitem_icon.dds", STATE.SELF)
        return
      }
    }
    if (item === ITEMTYPE_RECIPE) {
      if (
        specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_ALCHEMY_FORMULA_FURNISHING ||
        specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_BLACKSMITHING_DIAGRAM_FURNISHING ||
        specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_CLOTHIER_PATTERN_FURNISHING ||
        specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_ENCHANTING_SCHEMATIC_FURNISHING ||
        specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_DESIGN_FURNISHING ||
        specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_WOODWORKING_BLUEPRINT_FURNISHING ||
        specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_JEWELRYCRAFTING_SKETCH_FURNISHING
      ) {
        const [blueprintNeed] = DataValidation.isBlueprintNeeded(link)
        if (blueprintNeed !== "") {
          show(mark, "esoui/art/inventory/newitem_icon.dds", STATE.SELF)
          return
        }
      } else {
        const [recipeNeed] = DataValidation.isRecipeNeeded(link)
        if (recipeNeed !== "") {
          show(mark, "esoui/art/inventory/newitem_icon.dds", STATE.SELF)
          return
        }
      }
    }
    const [craft, line, trait] = DataValidation.getTrait(link)
    if (craft !== false && line !== undefined && trait !== undefined) {
      const [itemNeed] = DataValidation.isItemNeeded(craft, line, trait, uid, link)
      if (itemNeed !== "") {
        show(mark, "esoui/art/inventory/newitem_icon.dds", STATE.SELF)
        return
      }
    }
  }
}
