import { QUALITY } from "../craft-quality/craft-quality.module.code.ts"
import * as Tooltips from "../craft-tooltips/craft-tooltips.module.code.ts"
import * as Utilities from "../craft-utilities/craft-utilities.module.code.ts"
import { MAXCRAFT } from "../crafting-constants/crafting-constants.module.code.ts"
import { CHAT, hideControl } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

const WM = WINDOW_MANAGER

export interface CsCookButtonData {
  id: number
  list: number
  link: string
  sound: string | undefined
  crafting: [EditControl, number]
  addline: [string]
  craftable: boolean
}

export interface CsCookButton extends ButtonControl {
  data?: CsCookButtonData
}

function asCookButton(c: ButtonControl): CsCookButton {
  return c as CsCookButton
}

export function getCookChild(id: number): CsCookButton {
  let btn = WM.GetControlByName<CsCookButton>(
    `TemperCrafting_CookFoodSectionScrollChildButton${id}`
  )
  if (btn === undefined) {
    const created = asCookButton(
      WM.CreateControl(
        `TemperCrafting_CookFoodSectionScrollChildButton${id}`,
        TemperCrafting_CookFoodSectionScrollChild,
        CT_BUTTON
      )
    )
    created.SetAnchor(3, undefined, 3, 8, 5 + (id - 1) * 24)
    created.SetDimensions(508, 24)
    created.SetFont("ZoFontGame")
    created.EnableMouseButton(2, true)
    created.EnableMouseButton(3, true)
    created.SetClickSound("Click")
    created.SetMouseOverFontColor(1, 0.66, 0.2, 1)
    created.SetHorizontalAlignment(0)
    created.SetVerticalAlignment(1)
    created.SetHandler("OnMouseEnter", () => {
      Tooltips.tooltip(created, true, false, TemperCrafting_Cook, "tl")
    })
    created.SetHandler("OnMouseExit", () => {
      Tooltips.tooltip(created, false)
    })
    created.SetHandler("OnMouseDown", (_self: Control, button: number) => {
      cookStart(created, button)
    })
    btn = created
  } else {
    const [hasAnchor] = btn.GetAnchor(0)
    if (hasAnchor === false) {
      btn.SetAnchor(3, undefined, 3, 8, 5 + (id - 1) * 24)
    }
  }
  return btn
}

export function cookStart(
  control: CsCookButton | undefined,
  button: number,
  isEnchanting?: boolean
): undefined {
  if (control === undefined) {
    return
  }
  const enchanting = isEnchanting ?? false
  const notpreview = true
  const data = control.data
  const account = STATE.Account
  const character = STATE.Character
  if (data === undefined || account === undefined || character === undefined) {
    return
  }
  if (button === 3) {
    const idx = `${data.list}_${data.id}`
    const [, , , , , , tradeType] = GetRecipeInfo(data.list, data.id)
    const craftFavorites = character.favorites[tradeType]
    if (craftFavorites !== undefined) {
      if (craftFavorites[idx] !== undefined) {
        craftFavorites[idx] = undefined
      } else {
        craftFavorites[idx] = { 1: data.list, 2: data.id }
      }
    }
    cookShowRecipe(
      control,
      data.list,
      data.id,
      0,
      undefined,
      tradeType === CRAFTING_TYPE_ENCHANTING
    )
    return
  }
  if (notpreview && data.craftable) {
    if (GetNumBagFreeSlots(BAG_BACKPACK) > 0) {
      let amount: number
      if (enchanting) {
        amount = tonumber(TemperCrafting_RuneAmount.GetText()) ?? 1
      } else {
        amount = tonumber(TemperCrafting_CookAmount.GetText()) ?? 1
      }
      if (button === 2) {
        amount = account.options.bulkcraftlimit
        if (amount > data.crafting[1]) {
          amount = data.crafting[1]
        }
      }
      if (amount > MAXCRAFT) {
        amount = MAXCRAFT
        if (amount > data.crafting[1]) {
          amount = data.crafting[1]
        }
      }
      if (enchanting) {
        TemperCrafting_RuneAmount.SetText(tostring(amount))
      } else {
        TemperCrafting_CookAmount.SetText(tostring(amount))
      }
      CraftProvisionerItem(data.list, data.id, amount)
      PlaySound(data.sound)
    } else {
      CHAT.Print(STATE.Loc.nobagspace)
    }
  }
}

export function cookShowRecipe(
  control: CsCookButton | undefined,
  list: number,
  id: number,
  inc: number,
  sound?: string,
  enchanting?: boolean
): number {
  const character = STATE.Character
  if (control === undefined || character === undefined) {
    return inc
  }
  const [known, name, numIngredients, pLev, qLev] = GetRecipeInfo(list, id)
  let mark = ""
  if (known) {
    let fault = false
    let maxval = 999999
    const ing: string[] = []
    const link = GetRecipeResultItemLink(list, id, LINK_STYLE_DEFAULT)
    let level: string | number = GetItemLinkRequiredLevel(link)
    const levelcp = GetItemLinkRequiredChampionPoints(link)
    if (levelcp > 0) {
      level = `${STATE.ChampionPointsTexture}${levelcp}`
    }
    for (let num = 1; num <= numIngredients; num++) {
      const count = GetCurrentRecipeIngredientCount(list, id, num)
      const [, , qtyReq] = GetRecipeIngredientItemInfo(list, id, num)
      let color: string
      if (count < qtyReq) {
        color = "FF0000"
        fault = true
      } else {
        color = "00FF00"
      }
      if (count / qtyReq < maxval) {
        maxval = math.floor(count / qtyReq)
      }
      ing.push(
        zo_strformat(
          (qtyReq > 1 ? `${qtyReq}x ` : "") + "<<C:1>> |c<<2>>(<<3>>)|r",
          GetRecipeIngredientItemLink(list, id, num, LINK_STYLE_DEFAULT),
          color,
          count
        )
      )
    }
    let craftAmount: [EditControl, number] = [TemperCrafting_CookAmount, maxval]
    if (enchanting === true) {
      craftAmount = [TemperCrafting_RuneAmount, maxval]
      const enchantingFavorites = character.favorites[CRAFTING_TYPE_ENCHANTING]
      if (enchantingFavorites !== undefined && enchantingFavorites[`${list}_${id}`] !== undefined) {
        mark = "|t16:16:esoui/art/characterwindow/equipmentbonusicon_full.dds|t "
      } else {
        mark = ""
      }
    } else {
      const provisioningFavorites = character.favorites[CRAFTING_TYPE_PROVISIONING]
      if (
        provisioningFavorites !== undefined &&
        provisioningFavorites[`${list}_${id}`] !== undefined
      ) {
        mark = "|t16:16:esoui/art/characterwindow/equipmentbonusicon_full.dds|t "
      } else {
        mark = ""
      }
    }
    control.SetText(zo_strformat(`${mark}(<<1>>) <<C:2>> |c666666(<<3>>)|r`, level, name, maxval))
    if (fault || pLev > STATE.Cook.craftLevel || qLev > STATE.Cook.qualityLevel) {
      control.SetNormalFontColor(1, 0, 0, 1)
      fault = true
    } else {
      const color = QUALITY[GetItemLinkQuality(link)] ?? error("TemperCrafting: unknown quality")
      control.SetNormalFontColor(color[1], color[2], color[3], 1)
    }
    control.data = {
      id: id,
      list: list,
      link: link,
      sound: sound,
      crafting: craftAmount,
      addline: [table.concat(ing, "\n")],
      craftable: !fault,
    }
    control.SetHidden(false)
    return inc + 1
  }
  return inc
}

export function cookShowCategory(list?: number, override?: boolean): undefined {
  const lang = GetCVar("language.2")
  const character = STATE.Character
  if (list === undefined || character === undefined) {
    return
  }
  const overrideSearch = override ?? true
  const search = TemperCrafting_CookSearch.GetText()
  if (
    search !== "" &&
    search !== `${GetString(SI_GAMEPAD_HELP_SEARCH)}...` &&
    overrideSearch === false
  ) {
    cookSearchRecipe()
  } else {
    TemperCrafting_CookSearch.SetText(`${GetString(SI_GAMEPAD_HELP_SEARCH)}...`)
    let inc = 1
    let name: string | undefined
    const numChildren = TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      hideControl(`TemperCrafting_CookFoodSectionScrollChildButton${x}`)
    }
    if (list === 17) {
      name = STATE.Loc.TT[10]
      const provisioningFavorites = character.favorites[CRAFTING_TYPE_PROVISIONING] ?? {}
      for (const [, val] of pairs(provisioningFavorites)) {
        const [, , , , , ingredientType] = GetRecipeInfo(val[1] ?? 0, val[2] ?? 0)
        if (ingredientType !== PROVISIONER_SPECIAL_INGREDIENT_TYPE_FURNISHING) {
          const control = getCookChild(inc)
          inc = cookShowRecipe(control, val[1] ?? 0, val[2] ?? 0, inc)
        }
        if (inc > TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()) {
          break
        }
      }
    } else if (list === 20) {
      name = `${STATE.Loc.TT[23]} ${STATE.Loc.TT[10]}`
      const provisioningFavorites = character.favorites[CRAFTING_TYPE_PROVISIONING] ?? {}
      for (const [, val] of pairs(provisioningFavorites)) {
        const [, , , , , ingredientType, tradeType] = GetRecipeInfo(val[1] ?? 0, val[2] ?? 0)
        if (
          ingredientType === PROVISIONER_SPECIAL_INGREDIENT_TYPE_FURNISHING &&
          tradeType === CRAFTING_TYPE_PROVISIONING
        ) {
          const control = getCookChild(inc)
          inc = cookShowRecipe(control, val[1] ?? 0, val[2] ?? 0, inc)
        }
        if (inc > TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()) {
          break
        }
      }
    } else if (list === 18) {
      name = STATE.Loc.TT[22]
      Utilities.getQuest()
      const quest = STATE.Quest[CRAFTING_TYPE_PROVISIONING]
      if (quest !== undefined) {
        const lists = [1, 2, 3, 8, 9, 10]
        for (const questList of lists) {
          const [, num, , , , , sound] = GetRecipeListInfo(questList)
          for (let id = num; id >= 1; id--) {
            const [, recipeName] = GetRecipeInfo(questList, id)
            for (const [, step] of pairs(quest.work)) {
              const [stepNoHyphens] = string.gsub(step, "-", " ")
              const [stepNoSuffix] = string.gsub(stepNoHyphens, "%^%a*", "")
              let tempStep = string.lower(stepNoSuffix)
              const [nameNoHyphens] = string.gsub(recipeName, "-", " ")
              const [nameNoSuffix] = string.gsub(nameNoHyphens, "%^%a*", "")
              let tempName = string.lower(nameNoSuffix)
              if (lang === "de") {
                const [nameNoTrailingS] = string.gsub(tempName, "s$", "")
                tempName = nameNoTrailingS
                let tempWord = ""
                let newTempStep = ""
                for (const [word] of string.gmatch(tempStep, "%a+")) {
                  const [stemmed] = string.gsub(word ?? "", ".$", ".")
                  tempWord = stemmed
                  newTempStep = `${newTempStep} ${tempWord}`
                }
                tempStep = newTempStep
                let newTempName = ""
                for (const [word] of string.gmatch(tempName, "%a+")) {
                  const [stemmed] = string.gsub(word ?? "", ".$", ".")
                  tempWord = stemmed
                  newTempName = `${newTempName} ${tempWord}`
                }
                tempName = newTempName
              }
              const [res1, res2] = string.find(tempStep, tempName)
              if (
                ((res1 === STATE.Loc.provisioningWritOffset && lang === "en") ||
                  (res1 !== undefined && lang !== "en")) &&
                res2 !== 0
              ) {
                const control = getCookChild(inc)
                inc = cookShowRecipe(control, questList, id, inc, sound)
              }
            }
          }
        }
      }
    } else if (list === 19) {
      name = STATE.Loc.TT[23]
      const numLists = GetNumRecipeLists()
      for (let cat = 17; cat <= numLists; cat++) {
        const [, num, , , , , sound] = GetRecipeListInfo(cat)
        for (let id = num; id >= 1; id--) {
          const [, , , , , , crafttype] = GetRecipeInfo(cat, id)
          if (crafttype === RECIPE_CRAFTING_SYSTEM_PROVISIONING_DESIGNS) {
            const control = getCookChild(inc)
            inc = cookShowRecipe(control, cat, id, inc, sound)
          }
        }
      }
    } else {
      const [, num, , , , , sound] = GetRecipeListInfo(list)
      for (let id = num; id >= 1; id--) {
        const control = getCookChild(inc)
        inc = cookShowRecipe(control, list, id, inc, sound)
      }
    }
    TemperCrafting_CookFoodSectionScrollChild.SetHeight(inc * 24 - 15)
    TemperCrafting_CookHeadline.SetText(zo_strformat("<<C:1>>", name))
    TemperCrafting_CookInfo.SetText(STATE.Cook.category[list] ?? "")
    character.recipe = list
  }
}

export function cookSearchRecipe(): undefined {
  const search = TemperCrafting_CookSearch.GetText()
  let inc = 1
  if (search !== "") {
    const numChildren = TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      hideControl(`TemperCrafting_CookFoodSectionScrollChildButton${x}`)
    }
    const numLists = GetNumRecipeLists()
    for (let list = 1; list <= numLists; list++) {
      const [, num] = GetRecipeListInfo(list)
      for (let id = num; id >= 1; id--) {
        const [known, name, , , , , tradeSkill] = GetRecipeInfo(list, id)
        if (tradeSkill === CRAFTING_TYPE_PROVISIONING) {
          const [found] = string.find(string.lower(name), string.lower(search))
          if (found !== undefined && known) {
            const control = getCookChild(inc)
            inc = cookShowRecipe(control, list, id, inc)
            if (inc > TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()) {
              break
            }
          }
        }
      }
    }
    TemperCrafting_CookFoodSectionScrollChild.SetHeight(inc * 23 - 10)
    TemperCrafting_CookHeadline.SetText(STATE.Loc.searchfor)
    TemperCrafting_CookInfo.SetText(search)
  }
}

export function cookShowVanilla(): undefined {
  if (!IsInGamepadPreferredMode()) {
    TemperCrafting_Cook.SetHidden(true)
    STATE.Cook.job = { amount: 0 }
    const numChildren = TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      hideControl(`TemperCrafting_CookFoodSectionScrollChildButton${x}`)
    }
  }
  const numProvisionerChildren = ZO_ProvisionerTopLevel.GetNumChildren()
  for (let x = 2; x <= numProvisionerChildren; x++) {
    const child = ZO_ProvisionerTopLevel.GetChild(x)
    if (child !== undefined) {
      child.SetAlpha(1)
    }
  }
  ZO_KeybindStripControl.SetHidden(false)
  ZO_ProvisionerTopLevel.SetHidden(false)
}

export function cookShow(): undefined {
  TemperCrafting_CookAmount.SetText("")
  TemperCrafting_CookSearch.SetText(`${GetString(SI_GAMEPAD_HELP_SEARCH)}...`)
  TemperCrafting_Cook.SetHidden(false)
  if (!IsInGamepadPreferredMode()) {
    const numProvisionerChildren = ZO_ProvisionerTopLevel.GetNumChildren()
    for (let x = 2; x <= numProvisionerChildren; x++) {
      const child = ZO_ProvisionerTopLevel.GetChild(x)
      if (child !== undefined) {
        child.SetAlpha(0)
      }
    }
    ZO_KeybindStripControl.SetHidden(true)
    ZO_ProvisionerTopLevel.SetHidden(true)
  }
}
