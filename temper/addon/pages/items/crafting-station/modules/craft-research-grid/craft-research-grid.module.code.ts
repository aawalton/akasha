import { CRAFT_ICON } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-icons/craft-icons.module.code.ts"
import * as Inventory from "akasha/temper/addon/pages/items/crafting-station/modules/craft-inventory/craft-inventory.module.code.ts"
import { LANG } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-lang-index/craft-lang-index.module.code.ts"
import { updateTrackingStatus } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-research-tracking/craft-research-tracking.module.code.ts"
import type { CsTooltipOwner } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-tooltips/craft-tooltips.module.code.ts"
import * as Tooltips from "akasha/temper/addon/pages/items/crafting-station/modules/craft-tooltips/craft-tooltips.module.code.ts"
import {
  CHAT,
  toChat,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const WM = WINDOW_MANAGER

export function drawTraitColumn(craft: number, line: number): undefined {
  const [name, icon] = GetSmithingResearchLineInfo(craft, line)
  const [craftSkillType, craftSkillLineIndex] = GetCraftingSkillLineIndices(craft)
  const [craftname] = GetSkillLineInfo(craftSkillType, craftSkillLineIndex)
  const p = WM.GetControlByName(`TemperItemsCrafting_PanelCraft${craft}Line${line}`)
  let c: TemperItemsCraftingButton = WM.CreateControl(
    `TemperItemsCrafting_PanelCraft${craft}Line${line}Header`,
    p,
    CT_BUTTON
  )
  c.SetAnchor(3, p, 3, -1, 0)
  c.SetDimensions(27, 27)
  c.SetClickSound("Click")
  c.EnableMouseButton(2, true)
  c.SetHandler("OnMouseEnter", (self: CsTooltipOwner) => {
    Tooltips.tooltip(self, true, true, self, "bc")
  })
  c.SetHandler("OnMouseExit", (self: CsTooltipOwner) => {
    Tooltips.tooltip(self, false, true)
  })
  c.SetHandler("OnMouseDown", (_self: TemperItemsCraftingControl, button: number) => {
    const studies = STATE.Account.crafting.studies[STATE.SelectedPlayer]
    if (studies === undefined) {
      return
    }
    let value = false
    for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
      if (studies[craft]?.[line]?.[trait] === false) {
        value = true
        break
      }
    }
    if (button === 2) {
      const panel = WM.GetControlByName(`TemperItemsCrafting_PanelCraft${craft}`)
      if (panel !== undefined) {
        for (let col = 1; col <= panel.GetNumChildren(); col++) {
          const colTable = studies[craft]?.[col]
          if (colTable !== undefined) {
            for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
              colTable[trait] = value
            }
          }
          updateStudyLine(panel.GetChild<TemperItemsCraftingControl>(col), value)
        }
      }
    } else {
      const lineTable = studies[craft]?.[line]
      if (lineTable !== undefined) {
        for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
          lineTable[trait] = value
        }
      }
      updateStudyLine(p, value)
    }
    if (value === false) {
      STATE.Account.trait.tracking[STATE.SelectedPlayer] = false
    } else {
      updateTrackingStatus(STATE.SelectedPlayer)
    }
  })
  c.data = { info: zo_strformat(STATE.Loc.TT[0], name, CRAFT_ICON[craft], craftname) }
  const headerTexture = WM.CreateControl(
    `TemperItemsCrafting_PanelCraft${craft}Line${line}HeaderTexture`,
    c,
    CT_TEXTURE
  )
  headerTexture.SetAnchor(128, c, 128, 0, 0)
  headerTexture.SetDimensions(26, 26)
  headerTexture.SetTexture(icon)
  for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
    const bg = WM.CreateControl(
      `TemperItemsCrafting_PanelCraft${craft}Line${line}Trait${trait}Bg`,
      p,
      CT_BACKDROP
    )
    bg.SetAnchor(3, p, 3, -1, 2 + trait * 26)
    bg.SetDimensions(27, 25)
    bg.SetCenterColor(0.06, 0.06, 0.06, 1)
    bg.SetEdgeTexture("", 1, 1, 1, 1)
    bg.SetEdgeColor(1, 1, 1, 0.12)
    c = WM.CreateControl(
      `TemperItemsCrafting_PanelCraft${craft}Line${line}Trait${trait}`,
      bg,
      CT_BUTTON
    )
    c.SetAnchor(128, bg, 128, 0, 0)
    c.SetDimensions(25, 25)
    c.SetClickSound("Click")
    c.EnableMouseButton(2, true)
    c.EnableMouseButton(3, true)
    c.SetHandler("OnMouseEnter", (self: CsTooltipOwner) => {
      Tooltips.tooltip(self, true)
    })
    c.SetHandler("OnMouseExit", (self: CsTooltipOwner) => {
      Tooltips.tooltip(self, false)
    })
    c.SetHandler("OnMouseDown", (self: TemperItemsCraftingControl, button: number) => {
      const research = self.data?.research
      if (button === 3 && research !== undefined && STATE.SelectedPlayer === STATE.CurrentPlayer) {
        const account = STATE.Account
        let researchBag: number | undefined
        let researchSlot: number | undefined
        if (research[3] === STATE.CurrentPlayer || research[3] === LANG.en.bank) {
          const id = account.crafting.stored[research[0]]?.[research[1]]?.[research[2]]?.id
          const uid = typeof id === "string" ? id : false
          if (uid !== false) {
            const [bag, slot] = Inventory.scanUidBag(uid)
            if (
              bag !== false &&
              CanItemBeSmithingTraitResearched(bag, slot, research[0], research[1], research[2]) &&
              Inventory.isLocked(bag, slot) !== true
            ) {
              researchBag = bag
              researchSlot = slot
            }
          }
        }
        if (researchBag === undefined || researchSlot === undefined) {
          const [bag, slot] = Inventory.scanBagResearch(
            research[0],
            research[1],
            research[2],
            false,
            true
          )
          if (
            bag !== false &&
            CanItemBeSmithingTraitResearched(bag, slot, research[0], research[1], research[2])
          ) {
            researchBag = bag
            researchSlot = slot
          }
        }
        if (researchBag !== undefined && researchSlot !== undefined) {
          ResearchSmithingTrait(researchBag, researchSlot)
        } else {
          CHAT.Print(STATE.Loc.noSlot)
        }
      } else if (button === 2) {
        const [tnr] = GetSmithingResearchLineTraitInfo(craft, line, trait)
        toChat(zo_strformat(STATE.Loc.itemsearch, name, GetString("SI_ITEMTRAITTYPE", tnr)))
      } else if (button === 1) {
        const lineTable = STATE.Account.crafting.studies[STATE.SelectedPlayer]?.[craft]?.[line]
        if (lineTable !== undefined) {
          lineTable[trait] = !lineTable[trait]
          updateStudyLine(
            WM.GetControlByName(`TemperItemsCrafting_PanelCraft${craft}Line${line}`),
            lineTable
          )
          updateTrackingStatus(STATE.SelectedPlayer)
        }
      }
    })
    const traitTexture = WM.CreateControl(
      `TemperItemsCrafting_PanelCraft${craft}Line${line}Trait${trait}Texture`,
      c,
      CT_TEXTURE
    )
    traitTexture.SetAnchor(128, c, 128, 0, 0)
    traitTexture.SetDimensions(25, 25)
  }
  const countBg = WM.CreateControl(
    `TemperItemsCrafting_PanelCraft${craft}Line${line}CountBg`,
    p,
    CT_BACKDROP
  )
  countBg.SetAnchor(3, p, 3, -1, 262)
  countBg.SetDimensions(27, 25)
  countBg.SetCenterColor(0.06, 0.06, 0.06, 1)
  countBg.SetEdgeTexture("", 1, 1, 1, 1)
  countBg.SetEdgeColor(1, 1, 1, 0.12)
  const count = WM.CreateControl(
    `TemperItemsCrafting_PanelCraft${craft}Line${line}Count`,
    countBg,
    CT_BUTTON
  )
  count.SetAnchor(128, countBg, 128, 0, 0)
  count.SetDimensions(25, 25)
  count.SetHorizontalAlignment(1)
  count.SetVerticalAlignment(1)
  count.SetFont("TemperItemsCraftingFont")
  count.SetNormalFontColor(0.9, 0.87, 0.68, 1)
}

export function updateStudyLine(
  control: TemperItemsCraftingControl | undefined,
  tracking: boolean | Record<number, boolean>,
  _craft?: number,
  _line?: number
): undefined {
  if (control === undefined) {
    return
  }
  const trackingTable: Record<number, boolean> = {}
  if (tracking === true || tracking === false) {
    for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
      trackingTable[trait] = tracking
    }
  } else if (type(tracking) === "table") {
    for (const [index, data] of pairs(tracking)) {
      trackingTable[index] = data
    }
  }
  let allTracked = true
  for (const [, data] of pairs(trackingTable)) {
    if (data === false) {
      allTracked = false
      break
    }
  }

  if (allTracked) {
    control.GetNamedChild<TextureControl>("HeaderTexture")?.SetColor(1, 1, 1, 1)
    for (let x = 2; x <= control.GetNumChildren() - 1; x++) {
      const subcontrol = control.GetChild<BackdropControl>(x)
      subcontrol?.SetCenterColor(0.06, 0.06, 0.06, 1)
      subcontrol?.SetEdgeColor(1, 1, 1, 0.12)
    }
  } else {
    control.GetNamedChild<TextureControl>("HeaderTexture")?.SetColor(1, 0, 0, 1)
    for (let x = 2; x <= control.GetNumChildren() - 1; x++) {
      const subcontrol = control.GetChild<BackdropControl>(x)
      if (trackingTable[x - 1] === true) {
        subcontrol?.SetCenterColor(0.06, 0.06, 0.06, 1)
        subcontrol?.SetEdgeColor(1, 1, 1, 0.12)
      } else {
        subcontrol?.SetCenterColor(0.15, 0, 0, 1)
        subcontrol?.SetEdgeColor(1, 0, 0, 0.5)
      }
    }
  }
}
