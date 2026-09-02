import * as Inventory from "../craft-inventory/craft-inventory.module.code.ts"
import type { RuneRefineGlyphEntry } from "../craft-rune/craft-rune.module.code.ts"
import { CB_INVENTORY_SPACE } from "../crafting-constants/crafting-constants.module.code.ts"
import { CHAT } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

export interface GlyphStack extends RuneRefineGlyphEntry {
  name: string
  icon: string
  link: string
  quality: number
  level: number
}

export interface RefineButtonData {
  [key: string]: unknown
  link: string
  location: [number, number][]
  buttons: [string, string]
}

export interface RefineButton extends ButtonControl {
  data: RefineButtonData
}

export function runeCheckGlyph(glyphs: GlyphStack[], link: string): number {
  let found = 0
  for (const [ind, data] of ipairs(glyphs)) {
    const [, , , itemId1] = ZO_LinkHandler_ParseLink(data.link)
    const [, , , itemId2] = ZO_LinkHandler_ParseLink(link)
    const [level1, cplevel1] = GetItemLinkGlyphMinLevels(data.link)
    const [level2, cplevel2] = GetItemLinkGlyphMinLevels(link)
    if (
      IsItemLinkCrafted(data.link) === IsItemLinkCrafted(link) &&
      data.quality === GetItemLinkQuality(link) &&
      level1 === level2 &&
      cplevel1 === cplevel2 &&
      itemId1 === itemId2
    ) {
      found = ind
      break
    }
  }
  return found
}

export function glyphSort(a: GlyphStack, b: GlyphStack): boolean {
  if (a.level === b.level) {
    if (a.name === b.name) {
      return a.quality < b.quality
    } else {
      return a.name < b.name
    }
  } else {
    return a.level < b.level
  }
}

export function runeGetGylphs(): GlyphStack[] {
  const bag = SHARED_INVENTORY.GenerateFullSlotData(
    undefined,
    BAG_BANK,
    BAG_SUBSCRIBER_BANK,
    BAG_BACKPACK,
    BAG_VIRTUAL
  )
  const glyphs: GlyphStack[] = []
  for (const data of bag) {
    const item = data.itemType
    const link = GetItemLink(data.bagId, data.slotIndex)
    const icon = data.iconFile
    if (
      (item === ITEMTYPE_GLYPH_ARMOR ||
        item === ITEMTYPE_GLYPH_WEAPON ||
        item === ITEMTYPE_GLYPH_JEWELRY) &&
      Inventory.isLocked(data.bagId, data.slotIndex) !== true
    ) {
      const glyphPosition = runeCheckGlyph(glyphs, link)
      if (glyphPosition === 0) {
        const [level, cplevel] = GetItemLinkGlyphMinLevels(link)
        if (level === undefined && cplevel === undefined) {
          CHAT.Print(`Unknown level: ${link}`)
        } else {
          const resolvedLevel = level !== undefined ? level : (cplevel ?? 0) + 50
          glyphs.push({
            name: zo_strformat("<<C:1>>", data.name),
            icon: icon,
            link: link,
            quality: data.quality,
            level: resolvedLevel,
            location: [[data.bagId, data.slotIndex]],
            crafted: IsItemLinkCrafted(link),
          })
        }
      } else {
        const existing = glyphs[glyphPosition - 1]
        if (existing !== undefined) {
          existing.location.push([data.bagId, data.slotIndex])
        }
      }
    }
  }
  table.sort(glyphs, glyphSort)
  return glyphs
}

export function runeRefining(): undefined {
  const first = STATE.Rune.refine.glyphs[0]
  if (first !== undefined) {
    if (
      GetNumBagFreeSlots(BAG_BACKPACK) >= 3 ||
      (tonumber(GetSetting(SETTING_TYPE_LOOT, LOOT_SETTING_AUTO_ADD_TO_CRAFT_BAG)) === 1 &&
        IsESOPlusSubscriber())
    ) {
      ExtractEnchantingItem(first.location[0]?.[0] ?? 0, first.location[0]?.[1] ?? 0)
      PlaySound("Enchanting_Extract_Start_Anim")
      if (first.location.length === 1) {
        STATE.Rune.refine.glyphs.shift()
      } else {
        first.location.shift()
      }
    } else {
      CHAT.Print(STATE.Loc.nobagspace)
    }
  }
  CALLBACK_MANAGER.FireCallbacks(CB_INVENTORY_SPACE, TemperCrafting_RuneSpaceButtonName)
}

export function runeRefine(control: RefineButton, button: number): undefined {
  if (button === 2) {
    const glyphs: RuneRefineGlyphEntry[] = []
    glyphs.push({
      location: control.data.location,
      crafted: IsItemLinkCrafted(control.data.link),
    })
    STATE.Rune.refine = { glyphs: glyphs, crafted: true }
    runeRefining()
  } else if (
    GetNumBagFreeSlots(BAG_BACKPACK) >= 3 ||
    (tonumber(GetSetting(SETTING_TYPE_LOOT, LOOT_SETTING_AUTO_ADD_TO_CRAFT_BAG)) === 1 &&
      IsESOPlusSubscriber())
  ) {
    ExtractEnchantingItem(control.data.location[0]?.[0] ?? 0, control.data.location[0]?.[1] ?? 0)
    PlaySound("Enchanting_Extract_Start_Anim")
  } else {
    CHAT.Print(STATE.Loc.nobagspace)
  }
  CALLBACK_MANAGER.FireCallbacks(CB_INVENTORY_SPACE, TemperCrafting_RuneSpaceButtonName)
}

export function refineAll(_: unknown, button: number): undefined {
  STATE.Rune.refine = { glyphs: runeGetGylphs(), crafted: button === 2 }
  if (STATE.Rune.refine.glyphs.length > 0) {
    let remove = true
    while (remove) {
      if (STATE.Rune.refine.glyphs[0]?.crafted === true && !STATE.Rune.refine.crafted) {
        STATE.Rune.refine.glyphs.shift()
      } else {
        remove = false
      }
    }
    runeRefining()
  }
}
