import { defined } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-defined/craft-defined.module.code.ts"
import * as StyleTracking from "akasha/temper/addon/pages/items/crafting-station/modules/craft-style-tracking/craft-style-tracking.module.code.ts"
import type { CsTooltipOwner } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-tooltips/craft-tooltips.module.code.ts"
import * as Tooltips from "akasha/temper/addon/pages/items/crafting-station/modules/craft-tooltips/craft-tooltips.module.code.ts"
import {
  mustControl,
  toChat,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import {
  paintSurface,
  type SurfaceLevel,
} from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-crafting-inventories/eso-crafting-inventories.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const ROW_LEVEL: SurfaceLevel = 2

export function asWidth(this: void, value: unknown): number {
  return value as number
}

export function styleInitialize(): undefined {
  const styleLib = defined(STATE.Style)
  let pre = 0
  const icons = [8, 5, 9, 12, 7, 3, 2, 1, 14, 10, 6, 13, 4, 11]
  StyleTracking.styleSort()
  for (const [id, data] of ipairs(STATE.styleNames)) {
    const style = GetValidItemStyleId(data.id)
    const c = WINDOW_MANAGER.GetControlByName(`TemperItemsCrafting_StyleRow${pre}`)
    let p: TemperItemsCraftingControl
    if (WINDOW_MANAGER.GetControlByName(`TemperItemsCrafting_StyleRow${id}`) === undefined) {
      p = WINDOW_MANAGER.CreateControl(
        `TemperItemsCrafting_StyleRow${id}`,
        TemperItemsCrafting_StylePanelScrollChildStyles,
        CT_CONTROL
      )
      if (c !== undefined) {
        p.SetAnchor(3, c, 6, 0, 0)
      } else {
        p.SetAnchor(3, undefined, 3, 0, 3)
      }
      p.SetDimensions(750, 90)
    } else {
      p = mustControl<TemperItemsCraftingControl>(`TemperItemsCrafting_StyleRow${id}`)
    }
    let bg: BackdropControl
    if (
      WINDOW_MANAGER.GetControlByName(`TemperItemsCrafting_StylePanelScrollChildBgLine${id}`) ===
      undefined
    ) {
      bg = WINDOW_MANAGER.CreateControl(
        `TemperItemsCrafting_StylePanelScrollChildBgLine${id}`,
        p,
        CT_BACKDROP
      )
      bg.SetAnchor(3, p, 3, 0, 0)
      bg.SetDimensions(750, 37)
      paintSurface(bg, ROW_LEVEL)
    } else {
      bg = mustControl<BackdropControl>(`TemperItemsCrafting_StylePanelScrollChildBgLine${id}`)
    }

    let btn: TemperItemsCraftingButton
    const [icon, link, name, aName, aLink, popup] = styleLib.getHeadline(style)
    if (
      WINDOW_MANAGER.GetControlByName(`TemperItemsCrafting_StylePanelScrollChildMaterial${id}`) ===
      undefined
    ) {
      btn = WINDOW_MANAGER.CreateControl(
        `TemperItemsCrafting_StylePanelScrollChildMaterial${id}`,
        p,
        CT_BUTTON
      )
      btn.SetAnchor(2, bg, 2, 10, 0)
      btn.SetDimensions(30, 30)
    } else {
      btn = mustControl<TemperItemsCraftingButton>(
        `TemperItemsCrafting_StylePanelScrollChildMaterial${id}`
      )
    }

    btn.SetNormalTexture(icon)
    btn.EnableMouseButton(2, true)
    btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
      Tooltips.tooltip(self, true, false, TemperItemsCrafting_Style, "tl")
    )
    btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.tooltip(self, false))
    btn.SetHandler("OnMouseDown", (self: TemperItemsCraftingButton, button: number) => {
      if (button === 2) {
        toChat(defined(self.data?.link))
      }
    })
    btn.data = { link: link, buttons: [STATE.Loc.TT[5]] }

    let lbl: LabelControl
    if (
      WINDOW_MANAGER.GetControlByName(`TemperItemsCrafting_StylePanelScrollChildName${id}`) ===
      undefined
    ) {
      lbl = WINDOW_MANAGER.CreateControl(
        `TemperItemsCrafting_StylePanelScrollChildName${id}`,
        p,
        CT_LABEL
      )
      lbl.SetAnchor(2, bg, 2, 50, 0)
      lbl.SetDimensions(asWidth(undefined), 32)
      lbl.SetFont("TemperItemsCraftingFont")
      lbl.SetColor(1, 0.66, 0.2, 1)
      lbl.SetHorizontalAlignment(0)
      lbl.SetVerticalAlignment(1)
    } else {
      lbl = mustControl<LabelControl>(`TemperItemsCrafting_StylePanelScrollChildName${id}`)
    }
    lbl.SetText(name)

    let av: TemperItemsCraftingButton
    if (
      WINDOW_MANAGER.GetControlByName(
        `TemperItemsCrafting_StylePanelScrollChildAchievement${id}`
      ) === undefined
    ) {
      av = WINDOW_MANAGER.CreateControl(
        `TemperItemsCrafting_StylePanelScrollChildAchievement${id}`,
        p,
        CT_BUTTON
      )
      av.SetAnchor(2, lbl, 8, 15, 0)
      av.SetDimensions(300, 32)
      av.SetFont("TemperItemsCraftingFont")
      av.SetNormalFontColor(1, 0.66, 0.2, 0.5)
      av.SetMouseOverFontColor(1, 0.66, 0.2, 1)
      av.SetHorizontalAlignment(0)
      av.SetVerticalAlignment(1)
    } else {
      av = mustControl<TemperItemsCraftingButton>(
        `TemperItemsCrafting_StylePanelScrollChildAchievement${id}`
      )
    }

    if (aName !== "crown") {
      av.EnableMouseButton(2, true)
      av.SetText(`[${aName}]`)
      av.SetHandler("OnMouseDown", (_self: TemperItemsCraftingButton, button: number) => {
        if (button === 2) {
          toChat(defined(aLink))
        } else {
          const [popupAchievement, popupProgress, popupTimestamp] = unpack(popup)
          ACHIEVEMENTS.ShowAchievementPopup(popupAchievement, popupProgress, popupTimestamp)
          ZO_PopupTooltip_Hide()
        }
      })
    } else {
      av.SetText("|t32:32:esoui/art/currency/currency_crowns_32.dds|t")
    }
    for (const [z, y] of ipairs(icons)) {
      const [slotIcon, slotLink] = styleLib.getIconAndLink(style, y)
      let slotBtn: TemperItemsCraftingButton
      const btnName = `TemperItemsCrafting_StylePanelScrollChild${id}Button${y}`
      if (WINDOW_MANAGER.GetControlByName(btnName) === undefined) {
        slotBtn = WINDOW_MANAGER.CreateControl(btnName, p, CT_BUTTON)
        slotBtn.SetAnchor(3, bg, 6, 4 + (z - 1) * 52, 2)
        slotBtn.SetDimensions(52, 50)
        slotBtn.EnableMouseButton(2, true)
        slotBtn.SetClickSound("Click")
        slotBtn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
          Tooltips.tooltip(self, true, true, TemperItemsCrafting_Style, "tl")
        )
        slotBtn.SetHandler("OnMouseExit", (self: CsTooltipOwner) =>
          Tooltips.tooltip(self, false, true)
        )
        slotBtn.SetHandler("OnMouseDown", (self: TemperItemsCraftingButton, button: number) => {
          if (button === 2) {
            toChat(defined(self.data?.link))
          }
        })
      } else {
        slotBtn = mustControl<TemperItemsCraftingButton>(btnName)
      }
      slotBtn.data = { link: slotLink, buttons: [STATE.Loc.TT[5]] }
      let texControl: TextureControl
      if (WINDOW_MANAGER.GetControlByName(`${btnName}Texture`) === undefined) {
        texControl = WINDOW_MANAGER.CreateControl(`${btnName}Texture`, slotBtn, CT_TEXTURE)
        texControl.SetAnchor(128, slotBtn, 128, 0, 0)
        texControl.SetDimensions(45, 45)
        texControl.SetColor(1, 0, 0, 0.5)
      } else {
        texControl = mustControl<TextureControl>(`${btnName}Texture`)
      }
      texControl.SetTexture(slotIcon)
    }
    pre = id
  }
  StyleTracking.updateStyleKnowledge()
}
