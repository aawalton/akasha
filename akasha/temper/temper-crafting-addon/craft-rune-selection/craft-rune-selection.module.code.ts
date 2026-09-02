import type { RuneGlyphDef } from "../craft-rune/craft-rune.module.code.ts"
import type { RgbColor } from "../craft-rune-crafting/craft-rune-crafting.module.code.ts"
import * as RuneCrafting from "../craft-rune-crafting/craft-rune-crafting.module.code.ts"
import * as Tooltips from "../craft-tooltips/craft-tooltips.module.code.ts"
import { splitLink, toChat } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

export interface SelectorButtonData {
  [key: string]: unknown
  link: string
  addline?: string[]
}

export interface SelectorButton extends ButtonControl {
  data: SelectorButtonData
}

function asSelectorButton(c: ButtonControl): SelectorButton {
  return c as SelectorButton
}

export function runeShowSelection(): undefined {
  let color: RgbColor
  const runeSelected = () => {
    const essence = splitLink(
      RuneCrafting.runeGetLink(
        RuneCrafting.asRuneIdTable(STATE.Rune.rune[ITEMTYPE_ENCHANTING_RUNE_ESSENCE])[
          STATE.Character.essence
        ] ?? 0,
        1,
        1
      ),
      3
    )
    for (const [, enchant] of pairs(STATE.Rune.glyph)) {
      for (const [, glyph] of ipairs<RuneGlyphDef>(enchant)) {
        if (glyph[2] === essence && glyph[3] === STATE.Character.potencytype) {
          RuneCrafting.runeShow(
            1,
            glyph[1],
            STATE.Character.aspect,
            STATE.Character.potency,
            essence,
            glyph[3]
          )
          return
        }
      }
    }
  }
  const potencyLists = RuneCrafting.asPotencyRuneTables(
    STATE.Rune.rune[ITEMTYPE_ENCHANTING_RUNE_POTENCY]
  )
  for (const [x, rune] of ipairs<number>(potencyLists[1] ?? {})) {
    const link = RuneCrafting.runeGetLink(rune, 1, 1)
    const [known] = GetItemLinkEnchantingRuneName(link)
    const [bagCount, bankCount, virtCount] = GetItemLinkStacks(link)
    const count = bagCount + bankCount + virtCount
    color = STATE.Quality[GetItemLinkQuality(link)] ?? { 1: 0, 2: 0, 3: 0 }
    if (count === 0) {
      color = { 1: 0.4, 2: 0.4, 3: 0.4 }
    }
    if (known !== true) {
      color = { 1: 1, 2: 0, 3: 0 }
    }
    let btn = WINDOW_MANAGER.GetControlByName<SelectorButton>(
      `TemperCrafting_RuneGlyphSectionScrollChild1Selector${x}`
    )
    if (btn === undefined) {
      btn = asSelectorButton(
        WINDOW_MANAGER.CreateControl(
          `TemperCrafting_RuneGlyphSectionScrollChild1Selector${x}`,
          TemperCrafting_RuneGlyphSectionScrollChildSelection,
          CT_BUTTON
        )
      )
      btn.SetAnchor(3, undefined, 3, 8, 50 + (x - 1) * 30)
      btn.SetDimensions(160, 30)
      btn.SetFont("ZoFontGame")
      btn.EnableMouseButton(2, true)
      btn.SetClickSound("Click")
      btn.SetNormalFontColor(color[1], color[2], color[3], 1)
      btn.SetMouseOverFontColor(1, 0.66, 0.2, 1)
      btn.SetHorizontalAlignment(0)
      btn.SetVerticalAlignment(1)
      btn.SetHandler("OnMouseEnter", (ctrl: SelectorButton) => {
        Tooltips.tooltip(ctrl, true, false, TemperCrafting_Rune, "tl")
      })
      btn.SetHandler("OnMouseExit", (ctrl: SelectorButton) => {
        Tooltips.tooltip(ctrl, false)
      })
      btn.SetHandler("OnMouseDown", (_ctrl: SelectorButton, button: number) => {
        if (button === 1) {
          RuneCrafting.runeSetValue(3, x, 1)
          TemperCrafting_RuneLevelButton.SetText(`${STATE.Loc.level}: ${STATE.Rune.level[x]}`)
          TemperCrafting_RuneHighlight1.SetAnchor(
            2,
            WINDOW_MANAGER.GetControlByName(
              `TemperCrafting_RuneGlyphSectionScrollChild1Selector${x}`
            ),
            2,
            -14,
            0
          )
          runeSelected()
        } else if (button === 2) {
          toChat(link)
        }
      })
    }
    btn.SetText(
      `|t24:24:${GetItemLinkInfo(link)[0]}|t ${zo_strformat("<<C:1>>", GetItemLinkName(link))} |c666666(${count})`
    )
    btn.data = {
      link: link,
      addline: [`|cFFAA33Rune:|r ${STATE.Loc.level} ${STATE.Rune.level[x]}`],
    }
  }
  for (const [x, rune] of ipairs<number>(potencyLists[2] ?? {})) {
    const link = RuneCrafting.runeGetLink(rune, 1, 1)
    const [known] = GetItemLinkEnchantingRuneName(link)
    const [bagCount, bankCount, virtCount] = GetItemLinkStacks(link)
    const count = bagCount + bankCount + virtCount
    color = STATE.Quality[GetItemLinkQuality(link)] ?? { 1: 0, 2: 0, 3: 0 }
    if (count === 0) {
      color = { 1: 0.4, 2: 0.4, 3: 0.4 }
    }
    if (known !== true) {
      color = { 1: 1, 2: 0, 3: 0 }
    }
    let btn = WINDOW_MANAGER.GetControlByName<SelectorButton>(
      `TemperCrafting_RuneGlyphSectionScrollChild2Selector${x}`
    )
    if (btn === undefined) {
      btn = asSelectorButton(
        WINDOW_MANAGER.CreateControl(
          `TemperCrafting_RuneGlyphSectionScrollChild2Selector${x}`,
          TemperCrafting_RuneGlyphSectionScrollChildSelection,
          CT_BUTTON
        )
      )
      btn.SetAnchor(3, undefined, 3, 170, 50 + (x - 1) * 30)
      btn.SetDimensions(160, 30)
      btn.SetFont("ZoFontGame")
      btn.EnableMouseButton(2, true)
      btn.SetClickSound("Click")
      btn.SetNormalFontColor(color[1], color[2], color[3], 1)
      btn.SetMouseOverFontColor(1, 0.66, 0.2, 1)
      btn.SetHorizontalAlignment(0)
      btn.SetVerticalAlignment(1)
      btn.SetHandler("OnMouseEnter", (ctrl: SelectorButton) => {
        Tooltips.tooltip(ctrl, true, false, TemperCrafting_Rune, "tl")
      })
      btn.SetHandler("OnMouseExit", (ctrl: SelectorButton) => {
        Tooltips.tooltip(ctrl, false)
      })
      btn.SetHandler("OnMouseDown", (_ctrl: SelectorButton, button: number) => {
        if (button === 1) {
          RuneCrafting.runeSetValue(3, x, 2)
          TemperCrafting_RuneLevelButton.SetText(`${STATE.Loc.level}: ${STATE.Rune.level[x]}`)
          TemperCrafting_RuneHighlight1.SetAnchor(
            2,
            WINDOW_MANAGER.GetControlByName(
              `TemperCrafting_RuneGlyphSectionScrollChild2Selector${x}`
            ),
            2,
            -14,
            0
          )
          runeSelected()
        } else if (button === 2) {
          toChat(link)
        }
      })
    }
    btn.SetText(
      `|t24:24:${GetItemLinkInfo(link)[0]}|t ${zo_strformat("<<C:1>>", GetItemLinkName(link))} |c666666(${count})`
    )
    btn.data = {
      link: link,
      addline: [`|cFFAA33Rune:|r ${STATE.Loc.level} ${STATE.Rune.level[x]}`],
    }
  }
  const essenceList = RuneCrafting.asRuneIdTable(STATE.Rune.rune[ITEMTYPE_ENCHANTING_RUNE_ESSENCE])
  for (const [x, rune] of ipairs<number>(essenceList)) {
    const link = RuneCrafting.runeGetLink(rune, 1, 1)
    const [known] = GetItemLinkEnchantingRuneName(link)
    const [bagCount, bankCount, virtCount] = GetItemLinkStacks(link)
    const count = bagCount + bankCount + virtCount
    color = STATE.Quality[GetItemLinkQuality(link)] ?? { 1: 0, 2: 0, 3: 0 }
    if (count === 0) {
      color = { 1: 0.4, 2: 0.4, 3: 0.4 }
    }
    if (known !== true) {
      color = { 1: 1, 2: 0, 3: 0 }
    }
    let btn = WINDOW_MANAGER.GetControlByName<SelectorButton>(
      `TemperCrafting_RuneGlyphSectionScrollChild3Selector${x}`
    )
    if (btn === undefined) {
      btn = asSelectorButton(
        WINDOW_MANAGER.CreateControl(
          `TemperCrafting_RuneGlyphSectionScrollChild3Selector${x}`,
          TemperCrafting_RuneGlyphSectionScrollChildSelection,
          CT_BUTTON
        )
      )
      btn.SetAnchor(3, undefined, 3, 332, 50 + (x - 1) * 30)
      btn.SetDimensions(160, 30)
      btn.SetFont("ZoFontGame")
      btn.EnableMouseButton(2, true)
      btn.SetClickSound("Click")
      btn.SetNormalFontColor(color[1], color[2], color[3], 1)
      btn.SetMouseOverFontColor(1, 0.66, 0.2, 1)
      btn.SetHorizontalAlignment(0)
      btn.SetVerticalAlignment(1)
      btn.SetHandler("OnMouseEnter", (ctrl: SelectorButton) => {
        Tooltips.tooltip(ctrl, true, false, TemperCrafting_Rune, "tl")
      })
      btn.SetHandler("OnMouseExit", (ctrl: SelectorButton) => {
        Tooltips.tooltip(ctrl, false)
      })
      btn.SetHandler("OnMouseDown", (_ctrl: SelectorButton, button: number) => {
        if (button === 1) {
          TemperCrafting_RuneHighlight2.SetAnchor(
            2,
            WINDOW_MANAGER.GetControlByName(
              `TemperCrafting_RuneGlyphSectionScrollChild3Selector${x}`
            ),
            2,
            -14,
            0
          )
          RuneCrafting.runeSetValue(4, x)
          runeSelected()
        } else if (button === 2) {
          toChat(link)
        }
      })
    }
    btn.SetText(
      `|t24:24:${GetItemLinkInfo(link)[0]}|t ${zo_strformat("<<C:1>>", GetItemLinkName(link))} |c666666(${count})`
    )
    btn.data = { link: link }
  }
  let dot = WINDOW_MANAGER.GetControlByName<TextureControl>("TemperCrafting_RuneHighlight1")
  if (dot === undefined) {
    dot = WINDOW_MANAGER.CreateControl(
      "TemperCrafting_RuneHighlight1",
      TemperCrafting_RuneGlyphSectionScrollChildSelection,
      CT_TEXTURE
    )
    dot.SetAnchor(
      2,
      WINDOW_MANAGER.GetControlByName(
        `TemperCrafting_RuneGlyphSectionScrollChild${STATE.Character.potencytype}Selector${STATE.Character.potency}`
      ),
      2,
      -14,
      0
    )
    dot.SetDimensions(48, 48)
    dot.SetColor(1, 1, 1, 1)
    dot.SetTexture("esoui/art/quickslots/quickslot_highlight_blob.dds")
  }
  dot = WINDOW_MANAGER.GetControlByName<TextureControl>("TemperCrafting_RuneHighlight2")
  if (dot === undefined) {
    dot = WINDOW_MANAGER.CreateControl(
      "TemperCrafting_RuneHighlight2",
      TemperCrafting_RuneGlyphSectionScrollChildSelection,
      CT_TEXTURE
    )
    dot.SetAnchor(
      2,
      WINDOW_MANAGER.GetControlByName(
        `TemperCrafting_RuneGlyphSectionScrollChild3Selector${STATE.Character.essence}`
      ),
      2,
      -14,
      0
    )
    dot.SetDimensions(48, 48)
    dot.SetColor(1, 1, 1, 1)
    dot.SetTexture("esoui/art/quickslots/quickslot_highlight_blob.dds")
  }
  TemperCrafting_RuneGlyphDivider.SetHidden(false)
  TemperCrafting_RuneGlyphSectionScrollChildSelection.SetHidden(false)
  TemperCrafting_RuneInfo.SetText(GetString(SI_CRAFTING_PERFORM_FREE_CRAFT))
  runeSelected()
}
