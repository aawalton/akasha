import * as Inventory from "../craft-inventory/craft-inventory.module.code.ts"
import * as ResearchGrid from "../craft-research-grid/craft-research-grid.module.code.ts"
import * as Utilities from "../craft-utilities/craft-utilities.module.code.ts"
import * as DataValidation from "../craft-validation/craft-validation.module.code.ts"
import { nilCheckSet } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

const WM = WINDOW_MANAGER

interface CraftSkillEntry {
  unknown?: number
  maxsim?: number
  level?: number
  rank?: number
  [key: string]: unknown
}

type CraftSkillTable = Record<number, CraftSkillEntry | undefined>

function asCraftSkillTable(value: unknown): CraftSkillTable {
  return value as CraftSkillTable
}

export function updateAllStudies(): undefined {
  for (const [craft, craftData] of pairs(
    STATE.Account.crafting.studies[STATE.SelectedPlayer] ?? {}
  )) {
    for (const [line, lineData] of pairs(craftData)) {
      ResearchGrid.updateStudyLine(
        WM.GetControlByName(`TemperCrafting_PanelCraft${craft}Line${line}`),
        lineData,
        craft,
        line
      )
    }
  }
}

export function updateResearchWindows(): undefined {
  let known = 0
  let unknown = 0
  let row = 1
  const now = GetTimeStamp()
  let control: TemperCraftingControl | undefined
  const pip = `|r|c808080  ${GetString(SI_BULLET)}|r  `
  const skill = asCraftSkillTable(STATE.Account.crafting.skill[STATE.SelectedPlayer])
  for (const [craft, craftData] of pairs(
    STATE.Data.crafting.researched[STATE.SelectedPlayer] ?? {}
  )) {
    for (let x = 1; x <= 3; x++) {
      control = WM.GetControlByName(`TemperCrafting_PanelResearch${craft}WindowLine${x}`)
      if (control !== undefined) {
        ;(control as LabelControl).SetText("")
        control.data = undefined
        control.GetNamedChild<LabelControl>("Time")?.SetText("")
      }
    }
    for (const [line, lineData] of pairs(craftData)) {
      for (const [trait, traitData] of pairs(lineData)) {
        if (traitData !== false) {
          known = known + 1
        } else {
          unknown = unknown + 1
        }
        if (traitData !== true && traitData !== false) {
          if (traitData > 0) {
            control = WM.GetControlByName(`TemperCrafting_PanelResearch${craft}WindowLine${row}`)
            const [name, icon] = GetSmithingResearchLineInfo(craft, line)
            const [tid] = GetSmithingResearchLineTraitInfo(craft, line, trait)
            if (control !== undefined) {
              ;(control as LabelControl).SetText(
                ` |t28:28:${icon}|t  ${GetString("SI_ITEMTRAITTYPE", tid)}`
              )
              control.data = { info: zo_strformat("<<C:1>>", name) }
              if (STATE.SelectedPlayer === STATE.CurrentPlayer) {
                const [, remain] = GetSmithingResearchLineTraitTimes(craft, line, trait)
                control.GetNamedChild<LabelControl>("Time")?.SetText(Utilities.getTime(remain))
              } else {
                control
                  .GetNamedChild<LabelControl>("Time")
                  ?.SetText(Utilities.getTime(GetDiffBetweenTimeStamps(traitData, now)))
              }
            }
            row = row + 1
          }
        }
      }
    }
    const skillEntry = skill[craft]
    if (skillEntry !== undefined) {
      skillEntry.unknown = unknown
    }
    const maxsim = skillEntry?.maxsim ?? 1
    const level = skillEntry?.level ?? 1
    const rank = skillEntry?.rank ?? 1
    let simcolor = "|cFFFFFF"
    let unknowncolor = "|cFF0000"
    const current = row - 1
    if (current === maxsim || unknown === 0) {
      simcolor = "|c00FF00"
    } else {
      simcolor = "|cFF0000"
    }
    if (unknown === 0) {
      unknowncolor = "|c00FF00"
    }
    control = WM.GetControlByName(`TemperCrafting_PanelResearch${craft}Header`)
    if (control !== undefined) {
      control
        .GetNamedChild<LabelControl>("Data")
        ?.SetText(
          `|c00FF00${known}${pip}${unknowncolor}${unknown}${pip}|c808080${STATE.Loc.level}: ${level} (${rank})|r`
        )
      control.GetNamedChild<LabelControl>("Slot")?.SetText(`${simcolor}${current} / ${maxsim}|r`)
    }
    row = 1
    known = 0
    unknown = 0
  }
}

export function updateResearch(): undefined {
  const crafts = [
    CRAFTING_TYPE_BLACKSMITHING,
    CRAFTING_TYPE_CLOTHIER,
    CRAFTING_TYPE_WOODWORKING,
    CRAFTING_TYPE_JEWELRYCRAFTING,
  ]
  for (const [, craft] of ipairs(crafts)) {
    for (let line = 1; line <= GetNumSmithingResearchLines(craft); line++) {
      for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
        const [, , known] = GetSmithingResearchLineTraitInfo(craft, line, trait)
        if (known === false) {
          const [, remaining] = GetSmithingResearchLineTraitTimes(craft, line, trait)
          if (remaining !== undefined && remaining > 0) {
            nilCheckSet(
              STATE.Data.crafting.researched,
              remaining + GetTimeStamp(),
              STATE.CurrentPlayer,
              craft,
              line,
              trait
            )
          } else {
            nilCheckSet(
              STATE.Data.crafting.researched,
              false,
              STATE.CurrentPlayer,
              craft,
              line,
              trait
            )
          }
        } else {
          nilCheckSet(STATE.Data.crafting.researched, true, STATE.CurrentPlayer, craft, line, trait)
        }
        ResearchGrid.updatePanelIcon(craft, line, trait)
      }
    }
  }
}

export interface ResearchWish {
  craft: number
  line: number
  trait: number
}

export function addResearchItems(
  items: ResearchWish[],
  bagData?: SharedInventorySlotData[]
): undefined {
  if (bagData === undefined) {
    bagData = SHARED_INVENTORY.GenerateFullSlotData(
      undefined,
      BAG_WORN,
      BAG_BACKPACK,
      BAG_BANK,
      BAG_SUBSCRIBER_BANK
    ) as SharedInventorySlotData[]
  }
  for (const [, data] of ipairs(bagData)) {
    const [nextKey] = next(items)
    if (nextKey === undefined) {
      break
    }
    const link = GetItemLink(data.bagId, data.slotIndex, LINK_STYLE_DEFAULT)
    if (DataValidation.isValidEquip(GetItemLinkEquipType(link))) {
      const [craft, line, trait] = DataValidation.getTrait(link)
      const locked = Inventory.isLocked(data.bagId, data.slotIndex)
      if (locked !== true) {
        for (const [itemsIndex, iData] of ipairs(items)) {
          if (iData.craft === craft && iData.line === line && iData.trait === trait) {
            items.splice(itemsIndex - 1, 1)
            Inventory.updateStored("added", data)
            break
          }
        }
      }
    }
  }
}

export function addResearchItem(
  craft: number,
  line: number,
  trait: number,
  bagData?: SharedInventorySlotData[]
): undefined {
  if (bagData === undefined) {
    bagData = SHARED_INVENTORY.GenerateFullSlotData(
      undefined,
      BAG_WORN,
      BAG_BACKPACK,
      BAG_BANK,
      BAG_SUBSCRIBER_BANK
    ) as SharedInventorySlotData[]
  }
  const [bag, slot] = Inventory.scanBagResearch(craft, line, trait, bagData)
  if (bag !== false && bag !== undefined) {
    for (const [, data] of ipairs(bagData)) {
      if (data.bagId === bag && data.slotIndex === slot) {
        Inventory.updateStored("added", data)
        break
      }
    }
  }
}
