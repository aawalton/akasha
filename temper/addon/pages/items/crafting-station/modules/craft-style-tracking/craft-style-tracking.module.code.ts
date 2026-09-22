import * as BlueprintFurnisher from "akasha/temper/addon/pages/items/crafting-station/modules/craft-blueprint-furnisher/craft-blueprint-furnisher.module.code.ts"
import * as Knowledge from "akasha/temper/addon/pages/items/crafting-station/modules/craft-knowledge/craft-knowledge.module.code.ts"
import * as RecipeCooking from "akasha/temper/addon/pages/items/crafting-station/modules/craft-recipe-cooking/craft-recipe-cooking.module.code.ts"
import type { StyleApi } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-styles-data/craft-styles-data.module.code.ts"
import { CB_CONTROL_SHOW } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-constants/crafting-constants.module.code.ts"
import {
  STATE,
  type StyleNameRow,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-crafting-inventories/eso-crafting-inventories.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const WM = WINDOW_MANAGER

function styleApi(): StyleApi {
  return STATE.Style ?? error("TemperItemsCrafting: style API not initialized")
}

function asort(a: StyleNameRow, b: StyleNameRow): boolean {
  return string.lower(a.name) < string.lower(b.name)
}

function msort(a: StyleNameRow, b: StyleNameRow): boolean {
  return a.motif < b.motif
}

export function styleSort(): undefined {
  const rows: StyleNameRow[] = []
  STATE.styleNames = rows
  const styleLib = styleApi()
  const numStyles = GetNumValidItemStyles()
  for (let id = 1; id <= numStyles; id++) {
    const style = GetValidItemStyleId(id)
    const [, , name] = styleLib.getHeadline(style)
    if (id !== 33 && styleLib.checkStyle(style)) {
      rows.push({
        name: name,
        id: id,
        motif: styleLib.styleMotifNumber(style),
      })
    }
  }

  if (STATE.Account.options.sortstyles === 1) {
    table.sort(rows, asort)
  } else if (STATE.Account.options.sortstyles === 2) {
    table.sort(rows, msort)
  }
}

export function updateStyleKnowledge(_activate?: boolean): undefined {
  styleSort()
  const styleLib = styleApi()
  const rows: Record<number, StyleNameRow> = STATE.styleNames
  for (const [id, data] of pairs(rows)) {
    const style = GetValidItemStyleId(data.id)
    for (let chapter = 1; chapter <= 14; chapter++) {
      const known = Knowledge.isItemKnownById(
        STATE.SelectedPlayer,
        styleLib.getChapterId(style, chapter)
      )
      const control = WM.GetControlByName<TextureControl>(
        `TemperItemsCrafting_StylePanelScrollChild${id}Button${chapter}Texture`
      )
      if (control !== undefined) {
        if (known) {
          control.SetColor(1, 1, 1, 1)
        } else {
          control.SetColor(1, 0, 0, 0.5)
        }
      }
    }
    filterStyles()
  }
}

export function setAllStyles(): undefined {
  if (TemperItemsCrafting_Style_Window.IsHidden()) {
    TemperItemsCrafting_StylePanelScrollChildStyles.SetHidden(false)
    TemperItemsCrafting_StylePanelScrollChildSets.SetHidden(true)
    TemperItemsCrafting_StyleHeader.SetText("TemperItemsCrafting Styles")
    CALLBACK_MANAGER.FireCallbacks(CB_CONTROL_SHOW, TemperItemsCrafting_Style_Window)
  } else {
    TemperItemsCrafting_Style_Window.SetHidden(true)
  }
}

export function closeStyle(): undefined {
  TemperItemsCrafting_Style_Window.SetHidden(true)
  ACHIEVEMENTS.popup.Hide()
}

export function hideStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hidestyles = !STATE.Character.hidestyles
  }
  TemperItemsCrafting_StyleHideButton.SetText(
    zo_strformat(tex, STATE.Character.hidestyles ? "checked" : "unchecked") + STATE.Loc.hideStyles
  )
  filterStyles()
}

export function hideCrownStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hidecrownstyles = !STATE.Character.hidecrownstyles
  }
  TemperItemsCrafting_StyleHideCrownButton.SetText(
    zo_strformat(tex, STATE.Character.hidecrownstyles ? "checked" : "unchecked") +
      STATE.Loc.hideCrownStyles
  )
  filterStyles()
}

export function hidePerfectedStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideperfectedstyles = !STATE.Character.hideperfectedstyles
  }
  TemperItemsCrafting_StyleHidePerfectedButton.SetText(
    zo_strformat(tex, STATE.Character.hideperfectedstyles ? "checked" : "unchecked") +
      STATE.Loc.hideKnown
  )
  filterStyles()
}

export function hideUnknownStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideunknownstyles = !STATE.Character.hideunknownstyles
  }
  TemperItemsCrafting_StyleHideUnknownButton.SetText(
    zo_strformat(tex, STATE.Character.hideunknownstyles ? "checked" : "unchecked") +
      STATE.Loc.hideUnknown
  )
  filterStyles()
}

export function filterStyles(): undefined {
  const styleLib = styleApi()
  const filterPerfected = STATE.Character.hideperfectedstyles
  const filterSimple = STATE.Character.hidestyles
  const filterCrown = STATE.Character.hidecrownstyles
  const filterUnknown = STATE.Character.hideunknownstyles
  const rows: Record<number, StyleNameRow> = STATE.styleNames
  for (const [id, data] of pairs(rows)) {
    const style = GetValidItemStyleId(data.id)
    const c = WM.GetControlByName(`TemperItemsCrafting_StyleRow${id}`)
    if (c !== undefined) {
      if (
        (filterPerfected && styleLib.isPerfectedStyle(style)) ||
        (filterUnknown && styleLib.isUnknownStyle(style)) ||
        (filterCrown && styleLib.isCrownStyle(style)) ||
        (filterSimple && styleLib.isSimpleStyle(style))
      ) {
        c.SetHidden(true)
        c.SetHeight(0)
      } else {
        c.SetHidden(false)
        c.SetHeight(90)
      }
    }
  }
}

export function hideKnownBlueprints(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideKnownBlueprints = !STATE.Character.hideKnownBlueprints
  }
  TemperItemsCrafting_BlueprintHideKnownButton.SetText(
    zo_strformat(tex, STATE.Character.hideKnownBlueprints ? "checked" : "unchecked") +
      STATE.Loc.hideKnown
  )
  filterBlueprints()
}

export function hideUnknownBlueprints(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideUnknownBlueprints = !STATE.Character.hideUnknownBlueprints
  }
  TemperItemsCrafting_BlueprintHideUnknownButton.SetText(
    zo_strformat(tex, STATE.Character.hideUnknownBlueprints ? "checked" : "unchecked") +
      STATE.Loc.hideUnknown
  )
  filterBlueprints()
}

export function filterBlueprints(): undefined {
  BlueprintFurnisher.blueprintShowCategory(STATE.Character.furniture)
}

export function hideKnownRecipes(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideKnownRecipes = !STATE.Character.hideKnownRecipes
  }
  TemperItemsCrafting_RecipeHideKnownButton.SetText(
    zo_strformat(tex, STATE.Character.hideKnownRecipes ? "checked" : "unchecked") +
      STATE.Loc.hideKnown
  )
  filterRecipes()
}

export function hideUnknownRecipes(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideUnknownRecipes = !STATE.Character.hideUnknownRecipes
  }
  TemperItemsCrafting_RecipeHideUnknownButton.SetText(
    zo_strformat(tex, STATE.Character.hideUnknownRecipes ? "checked" : "unchecked") +
      STATE.Loc.hideUnknown
  )
  filterRecipes()
}

export function filterRecipes(): undefined {
  RecipeCooking.recipeShowCategory(STATE.Character.recipe)
}
