import * as Characters from "akasha/temper/addon/pages/items/crafting-station/modules/craft-characters/craft-characters.module.code.ts"
import { LANG } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-lang-index/craft-lang-index.module.code.ts"
import { needAppend } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-research-tracking/craft-research-tracking.module.code.ts"
import * as Utilities from "akasha/temper/addon/pages/items/crafting-station/modules/craft-utilities/craft-utilities.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function updatePanelIcon(
  craft: number | undefined,
  line: number | undefined,
  trait: number | undefined
): undefined {
  if (craft === undefined || line === undefined || trait === undefined) {
    return
  }
  if (trait < 1) {
    return
  }
  const account = STATE.Account
  const [traitType] = GetSmithingResearchLineTraitInfo(craft, line, trait)
  const traitname = GetString("SI_ITEMTRAITTYPE", traitType)
  const control = WINDOW_MANAGER.GetControlByName<TextureControl>(
    `TemperItemsCrafting_PanelCraft${craft}Line${line}Trait${trait}Texture`
  )
  if (control === undefined) {
    return
  }
  const parent: TemperItemsCraftingControl | undefined = control.GetParent()
  if (parent === undefined) {
    return
  }
  const known =
    STATE.Data.crafting.researched[STATE.SelectedPlayer]?.[craft]?.[line]?.[trait] ?? false
  const store = account.crafting.stored[craft]?.[line]?.[trait]
  const storeLink = store?.link
  const storeOwner = store?.owner
  const now = GetTimeStamp()
  let tip = ""
  const countTraits = (): number => {
    let count = 0
    for (const [, t] of pairs(
      STATE.Data.crafting.researched[STATE.SelectedPlayer]?.[craft]?.[line] ?? {}
    )) {
      if (t === true) {
        count = count + 1
      }
    }
    return count
  }
  const need: string[] = []
  const unneed: string[] = []
  const researching: string[] = []
  for (const [, char] of ipairs(Characters.getCharacters())) {
    const val = STATE.Data.crafting.researched[char]?.[craft]?.[line]?.[trait] ?? false
    if (val === true) {
      unneed.push(`|c00FF00${char}|r`)
    } else if (val === false) {
      need.push(`|cFF1010${char}|r`)
    } else if (val !== undefined && val > 0) {
      if (char === STATE.CurrentPlayer) {
        const [, remain] = GetSmithingResearchLineTraitTimes(craft, line, trait)
        researching.push(`|c66FFCC${char} (${Utilities.getTime(remain)})|r`)
      } else {
        researching.push(
          `|c66FFCC${char} (${Utilities.getTime(GetDiffBetweenTimeStamps(val, now))})|r`
        )
      }
    }
  }

  const [needTip, unneedTip, researchingTip] = needAppend(need, unneed, researching)

  if (researchingTip !== "") {
    tip = `\n${researchingTip}`
  }
  if (needTip !== "") {
    tip = `${tip}\n${needTip}`
  }
  if (unneedTip !== "") {
    tip = `${tip}\n${unneedTip}`
  }

  parent.data = {
    info: `|cFFFFFF${traitname}|r${tip}`,
    buttons: [STATE.Loc.TT[33], STATE.Loc.TT[5]],
  }

  if (known === false) {
    let altKnown = false
    if (account.options.advancedcolorgrid) {
      for (const [, char] of ipairs(Characters.getCharacters())) {
        const v = STATE.Data.crafting.researched[char]?.[craft]?.[line]?.[trait]
        if (v !== undefined && v !== false) {
          altKnown = true
          break
        }
      }
    }
    control.SetColor(1, 0, 0, 1)
    if (altKnown) {
      control.SetColor(1, 170 / 255, 0, 1)
    }
    control.SetTexture("esoui/art/buttons/decline_up.dds")
    if (storeLink !== undefined && storeOwner !== false && storeOwner !== undefined) {
      const [isSet] = GetItemLinkSetInfo(storeLink, false)
      let mark = true
      if (!account.options.marksetitems && isSet) {
        mark = false
      }
      if (mark) {
        tip = `|t20:20:esoui/art/buttons/pointsplus_up.dds|t |cE8DFAF${storeOwner}|r${tip}`
        control.SetColor(1, 1, 1, 1)

        if (account.options.advancedcolorgrid) {
          if (storeOwner === LANG.en.bank) {
            control.SetColor(0, 0, 0.5, 1)
            if (altKnown) {
              control.SetColor(0.5, 0, 0.5, 1)
            }
          } else if (storeOwner === STATE.SelectedPlayer) {
            control.SetColor(0, 0, 1, 1)
            if (altKnown) {
              control.SetColor(0.5, 0, 1, 1)
            }
          } else if (storeOwner === STATE.CurrentPlayer) {
            control.SetColor(0, 1, 1, 1)
            if (altKnown) {
              control.SetColor(1, 0, 1, 1)
            }
          } else if (altKnown) {
            control.SetColor(1, 1, 0, 1)
          }
        }
        control.SetTexture("esoui/art/buttons/pointsplus_up.dds")
        parent.data = {
          link: storeLink,
          addline: [tip],
          research: [craft, line, trait, storeOwner],
          buttons: [STATE.Loc.TT[32], STATE.Loc.TT[33], STATE.Loc.TT[5]],
        }
      }
    }
  } else if (known === true) {
    control.SetColor(0, 1, 0, 1)
    control.SetTexture("esoui/art/buttons/accept_up.dds")
  } else {
    control.SetColor(0.4, 1, 0.8, 1)
    control.SetTexture("esoui/art/miscellaneous/timer_32.dds")
  }
  WINDOW_MANAGER.GetControlByName<LabelControl>(
    `TemperItemsCrafting_PanelCraft${craft}Line${line}Count`
  )?.SetText(countTraits())
}
