import type { TraitEffect } from "../potion-constants/potion-constants.module.code.ts"
import {
  COLOR_DISABLED,
  COLOR_SELECT,
  TEXTURE_REAGENTUNKNOWN,
  TRAIT_EFFECT,
} from "../potion-constants/potion-constants.module.code.ts"
import { getPlayerSettings } from "../potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import type { BagSlot, Ingredient, Reagent } from "../potion-types/potion-types.module.code.ts"

interface SlotCacheEntry {
  itemType: number
  slotIndex: number
  name: string
  stackCount: number
  iconFile: string
  meetsUsageRequirement: boolean
  quality: number
}
interface SharedInventoryCacheView {
  CreateOrUpdateSlotData: (
    this: SharedInventoryCacheView,
    slot: SlotCacheEntry,
    bagId: number,
    slotIndex: number,
    forceUpdate: boolean
  ) => undefined
  GetOrCreateBagCache: (
    this: SharedInventoryCacheView,
    bagId: number
  ) => Record<number, SlotCacheEntry>
}
function asSharedInventoryCacheView(value: unknown): SharedInventoryCacheView {
  return value as SharedInventoryCacheView
}
const sharedInventory = asSharedInventoryCacheView(SHARED_INVENTORY)

type AlchemyItemTraitsRow = LuaMultiReturn<
  [
    trait1: string | undefined,
    icon1: string | undefined,
    a1: unknown,
    b1: unknown,
    c1: unknown,
    trait2: string | undefined,
    icon2: string | undefined,
    a2: unknown,
    b2: unknown,
    c2: unknown,
    trait3: string | undefined,
    icon3: string | undefined,
    a3: unknown,
    b3: unknown,
    c3: unknown,
    trait4: string | undefined,
    icon4: string | undefined,
  ]
>
type AlchemyItemTraitsFn = (this: void, bagId: number, slotIndex: number) => AlchemyItemTraitsRow
function asAlchemyItemTraitsFn(value: unknown): AlchemyItemTraitsFn {
  return value as AlchemyItemTraitsFn
}
const getAlchemyItemTraitsRow = asAlchemyItemTraitsFn(GetAlchemyItemTraits)

interface IngredientQualityView {
  qualityColor: string | ZoColorDef
}
function asIngredientQualityView(value: unknown): IngredientQualityView {
  return value as IngredientQualityView
}

type IngredientNewArg = Partial<Ingredient> & { itemId: number }
function asIngredientNewArg(value: unknown): IngredientNewArg {
  return value as IngredientNewArg
}
type IngredientSolventArg = Partial<Ingredient>
function asIngredientSolventArg(value: unknown): IngredientSolventArg {
  return value as IngredientSolventArg
}

type TraitEffectMap = Record<string, TraitEffect>
function asTraitEffectMap(value: unknown): TraitEffectMap {
  return value as TraitEffectMap
}

type InventoryHolder = PotMaker["Inventory"]
function asInventoryHolder(value: unknown): InventoryHolder {
  return value as InventoryHolder
}

function toggleBag(this: void, _button: Control): undefined {
  PotMaker.BagMode = !PotMaker.BagMode
  if (!PotMaker.BagMode) {
    const [r, g, b] = COLOR_DISABLED.UnpackRGB()
    TemperPotionsBagButtonTexture.SetColor(r, g, b)
  } else {
    const [r, g, b] = COLOR_SELECT.UnpackRGB()
    TemperPotionsBagButtonTexture.SetColor(r, g, b)
  }
  PotMaker.addStuffToInventory()
  PotMaker.updateControls()
}

function toggleBank(this: void, _button: Control): undefined {
  PotMaker.BankMode = !PotMaker.BankMode
  if (!PotMaker.BankMode) {
    const [r, g, b] = COLOR_DISABLED.UnpackRGB()
    TemperPotionsBankButtonTexture.SetColor(r, g, b)
  } else {
    const [r, g, b] = COLOR_SELECT.UnpackRGB()
    TemperPotionsBankButtonTexture.SetColor(r, g, b)
  }
  PotMaker.addStuffToInventory()
  PotMaker.updateControls()
}

function addAllStuffToInventory(this: void): undefined {
  const playerSettings = getPlayerSettings()

  function addTraitsFromKnown(this: void, newTraits: Reagent): Record<string, TraitEffect> {
    const traits: Record<string, TraitEffect> = {}
    for (const trait in newTraits.traits) {
      traits[trait] = TRAIT_EFFECT.None
    }
    return traits
  }
  function addTraitsFromLink(this: void, newTraits: Reagent): Record<string, TraitEffect> {
    const traits: Record<string, TraitEffect> = {}
    const itemLink = newTraits.itemLink
    if (itemLink !== undefined) {
      for (let index = 1; index <= 4; index++) {
        const [known, trait] = GetItemLinkReagentTraitInfo(itemLink, index)
        if (known && trait !== undefined) {
          traits[trait] = TRAIT_EFFECT.None
        }
      }
    }
    return traits
  }
  const addTraits = playerSettings.useUnknown ? addTraitsFromKnown : addTraitsFromLink

  for (const itemIdKey in PotMaker.allReagents) {
    const itemId = tonumber(itemIdKey)
    if (itemId === undefined) {
      continue
    }
    const newTraits = PotMaker.allReagents[itemId]
    if (newTraits === undefined) {
      continue
    }
    const item = PotMaker.Ingredient.new(
      asIngredientNewArg({
        itemId,
        icon: TEXTURE_REAGENTUNKNOWN,
        traits: addTraits(newTraits),
        iconTraits: {},
        pack: [],
      })
    )
    asIngredientQualityView(item).qualityColor = GetItemQualityColor(ITEM_FUNCTIONAL_QUALITY_MAGIC)
    PotMaker.Inventory.reagents[itemId] = item
  }
}

function append<T>(this: void, toTable: T[], item: T): undefined {
  toTable[toTable.length] = item
}

function addStuffToInventoryForBag(this: void, bagId: number): undefined {
  const playerSettings = getPlayerSettings()

  function addToKnownTrait(
    this: void,
    iconTraits: Record<string, string>,
    trait: string | undefined,
    icon: string | undefined,
    traits: Record<string, boolean>
  ): string | undefined {
    if (trait !== undefined) {
      const localized = LocalizeString("<<C:1>>", trait)
      if (icon !== undefined) {
        iconTraits[localized] = icon
      }
      traits[localized] = true
      return localized
    }
    return trait
  }

  function addReagent(this: void, slot: SlotCacheEntry): undefined {
    const itemType = slot.itemType
    const slotIndex = slot.slotIndex
    sharedInventory.CreateOrUpdateSlotData(slot, bagId, slotIndex, false)
    const icon = slot.iconFile
    const stack = slot.stackCount
    const meetsUsageRequirement = slot.meetsUsageRequirement
    const itemId = GetItemId(bagId, slotIndex)
    const level = GetItemLevel(bagId, slotIndex)
    if (!IsAlchemySolvent(itemType)) {
      const [trait1, icon1, , , , trait2, icon2, , , , trait3, icon3, , , , trait4, icon4] =
        getAlchemyItemTraitsRow(bagId, slotIndex)
      const iconTraits: Record<string, string> = {}
      const traits: Record<string, boolean> = {}
      addToKnownTrait(iconTraits, trait1, icon1, traits)
      addToKnownTrait(iconTraits, trait2, icon2, traits)
      addToKnownTrait(iconTraits, trait3, icon3, traits)
      addToKnownTrait(iconTraits, trait4, icon4, traits)
      if (playerSettings.useUnknown) {
        const newTraits = PotMaker.allReagents[itemId]
        if (newTraits !== undefined) {
          for (const trait in newTraits.traits) {
            if (traits[trait] === undefined) {
              traits[trait] = false
            }
          }
        }
      }

      const itemAlreadyInInventory = PotMaker.Inventory.reagents[itemId]
      const item = PotMaker.Ingredient.new(
        asIngredientNewArg({
          itemId,
          icon,
          level,
          traits: asTraitEffectMap(traits),
          iconTraits,
          pack: [],
          protected: true,
        })
      )
      if (itemAlreadyInInventory !== undefined) {
        const existing = asMutableReagentView(itemAlreadyInInventory)
        existing.icon = icon
        existing.level = level
        existing.iconTraits = iconTraits
        existing.traits = item.traits
        existing.stack = existing.stack + stack
        existing.protected = (existing.protected ?? false) && PotMaker.IsProtected(bagId, slotIndex)
        append(existing.pack, asBagSlot({ bagId, slotIndex }))
      } else {
        const mutable = asMutableReagentView(item)
        append(mutable.pack, asBagSlot({ bagId, slotIndex }))
        mutable.stack = stack
        mutable.protected = PotMaker.IsProtected(bagId, slotIndex)
        PotMaker.Inventory.reagents[itemId] = item
      }
    } else if (meetsUsageRequirement && itemType === PotMaker.solventMode) {
      const itemAlreadyInInventory = PotMaker.Inventory.solvents[itemId]
      if (itemAlreadyInInventory !== undefined) {
        const existing = asMutableReagentView(itemAlreadyInInventory)
        existing.stack = existing.stack + stack
        existing.protected = (existing.protected ?? false) && PotMaker.IsProtected(bagId, slotIndex)
        append(existing.pack, asBagSlot({ bagId, slotIndex }))
      } else {
        const item = PotMaker.Ingredient.solvent(
          asIngredientSolventArg({
            name: slot.name,
            itemId,
            icon,
            level,
            pack: [asBagSlot({ bagId, slotIndex })],
          })
        )
        const mutable = asMutableReagentView(item)
        mutable.stack = stack
        mutable.protected = PotMaker.IsProtected(bagId, slotIndex)
        PotMaker.Inventory.solvents[itemId] = item
      }
    }
  }

  const bagCache = sharedInventory.GetOrCreateBagCache(bagId)
  for (const slotIndexKey in bagCache) {
    const slotIndex = tonumber(slotIndexKey)
    if (slotIndex === undefined) {
      continue
    }
    const slot = bagCache[slotIndex]
    if (slot === undefined) {
      continue
    }
    const itemType = slot.itemType
    if (
      itemType !== ITEMTYPE_POTION &&
      itemType !== ITEMTYPE_POISON &&
      ZO_Alchemy_IsAlchemyItem(bagId, slotIndex)
    ) {
      addReagent(slot)
    }
  }
}

interface MutableReagentView {
  icon: string
  level: number
  iconTraits: Record<string, string>
  traits: Record<string, TraitEffect>
  stack: number
  protected: boolean | undefined
  pack: BagSlot[]
}
function asMutableReagentView(value: unknown): MutableReagentView {
  return value as MutableReagentView
}
function asBagSlot(value: unknown): BagSlot {
  return value as BagSlot
}

function updateStuffofInventory(this: void): undefined {
  if (PotMaker.BagMode) {
    PotMaker.addStuffToInventoryForBag(BAG_BACKPACK)
    PotMaker.addStuffToInventoryForBag(BAG_VIRTUAL)
  }
  if (PotMaker.BankMode) {
    PotMaker.addStuffToInventoryForBag(BAG_BANK)
    PotMaker.addStuffToInventoryForBag(BAG_SUBSCRIBER_BANK)
  }
}

function addStuffToInventory(this: void): undefined {
  PotMaker.Inventory = asInventoryHolder({
    reagents: {},
    solvents: {},
  })
  if (getPlayerSettings().useMissing) {
    PotMaker.addAllStuffToInventory()
  }
  PotMaker.updateStuffofInventory()
}

PotMaker.toggleBag = toggleBag
PotMaker.toggleBank = toggleBank
PotMaker.addAllStuffToInventory = addAllStuffToInventory
PotMaker.addStuffToInventoryForBag = addStuffToInventoryForBag
PotMaker.updateStuffofInventory = updateStuffofInventory
PotMaker.addStuffToInventory = addStuffToInventory
