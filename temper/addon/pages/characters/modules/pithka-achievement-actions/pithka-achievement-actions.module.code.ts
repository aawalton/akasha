import {
  ACHIEVEMENT_ROWS,
  type AchievementRow,
} from "akasha/temper/addon/pages/characters/modules/pithka-achievements/pithka-achievements.module.code.ts"
import { toggleTracker } from "akasha/temper/addon/pages/characters/modules/pithka-controls/pithka-controls.module.code.ts"
import { GROUP_FINDER } from "akasha/temper/addon/pages/characters/modules/pithka-group-finder/pithka-group-finder.module.code.ts"
import { STATES } from "akasha/temper/addon/pages/characters/modules/pithka-group-finder-state-machine/pithka-group-finder-state-machine.module.code.ts"
import {
  createListing,
  type ListingParams,
} from "akasha/temper/addon/pages/characters/modules/pithka-group-listing-creator/pithka-group-listing-creator.module.code.ts"
import "akasha/temper/eso/type/eso-addon-screen/eso-addon-screen.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-crafting-inventories/eso-crafting-inventories.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

const COMPLETE_CACHE: Record<number, boolean | undefined> = {}

let searchedAchievementId = 0

export function isAchievementComplete(this: void, id: number): boolean {
  let done = COMPLETE_CACHE[id]
  if (done !== true) {
    done = IsAchievementComplete(id)
    COMPLETE_CACHE[id] = done
  }
  return done
}

export function isAchievementReleased(this: void, id: number): boolean {
  return GetAchievementIdFromLink(GetAchievementLink(id, 1)) !== 0
}

export function achievementTooltipFn(
  this: void,
  id: number
): (this: void, control: Control) => undefined {
  return (control) => {
    InitializeTooltip(ItemTooltip, control, TOP, 0, 0, BOTTOM)
    ItemTooltip.SetLink(GetAchievementLink(id, 1))
  }
}

function openJournal(this: void, id: number): undefined {
  if (!SCENE_MANAGER.IsShowing("achievements")) MAIN_MENU_KEYBOARD.ShowScene("achievements")
  searchedAchievementId = id
  ACHIEVEMENTS.contentSearchEditBox.SetText(GetAchievementName(id))
}

function linkInChat(this: void, id: number): undefined {
  const entry = CHAT_SYSTEM.textEntry
  entry.SetText(`${entry.GetText()}${GetAchievementLink(id, 1)}`)
}

function achievementData(this: void, id: number): AchievementRow | undefined {
  return ACHIEVEMENT_ROWS.find(
    (row) =>
      row.VET === id ||
      row.HM === id ||
      row.PHM1 === id ||
      row.PHM2 === id ||
      row.TRI === id ||
      row.EXT === id ||
      row.CHA === id ||
      row.SR === id ||
      row.ND === id
  )
}

function listingTitle(this: void, row: AchievementRow, id: number): string {
  let kind = "Achievement"
  if (row.VET === id) kind = "Veteran"
  else if (row.HM === id) kind = "Hard Mode"
  else if (row.PHM1 === id) kind = `HM+${row.PHM1NAME ?? "1"}`
  else if (row.PHM2 === id) kind = `HM+${row.PHM2NAME ?? "2"}`
  else if (row.TRI === id) kind = "Trifecta"
  else if (row.EXT === id) kind = "Extra"
  else if (row.CHA === id) kind = "Challenger"
  else if (row.SR === id) kind = "Speed Run"
  else if (row.ND === id) kind = "No Death"
  return `${row.ABBV} ${kind}`
}

function listingParams(this: void, row: AchievementRow, id: number): ListingParams | undefined {
  let category: number
  let groupSize: number
  let tanks: number
  let healers: number
  let dps: number
  if (row.TYPE === "trial") {
    category = GROUP_FINDER_CATEGORY_TRIAL
    groupSize = 12
    tanks = 2
    healers = 2
    dps = 8
  } else if (
    row.TYPE === "triDungeon" ||
    row.TYPE === "baseDungeon-wI" ||
    row.TYPE === "baseDungeon-noI"
  ) {
    category = GROUP_FINDER_CATEGORY_DUNGEON
    groupSize = 4
    tanks = 1
    healers = 1
    dps = 2
  } else if (row.TYPE === "arena") {
    category = GROUP_FINDER_CATEGORY_ARENA
    groupSize = 4
    tanks = 1
    healers = 1
    dps = 2
  } else {
    return undefined
  }
  return {
    title: listingTitle(row, id),
    description: `Achievement Name: ${GetAchievementName(id)}\nCreated by Pithka Achievement Tracker`,
    category,
    difficulty: DUNGEON_DIFFICULTY_VETERAN,
    groupSize,
    roles: { [LFG_ROLE_TANK]: tanks, [LFG_ROLE_HEAL]: healers, [LFG_ROLE_DPS]: dps },
    requiresChampion: true,
    autoAcceptRequests: true,
    enforceRoles: true,
    achievementData: row,
  }
}

function createGroupFinderListing(this: void, id: number): undefined {
  toggleTracker()
  const groupFinder = GROUP_FINDER.instance
  let wasSearching = false
  if (
    groupFinder !== undefined &&
    groupFinder.stateMachine.GetCurrentState() === STATES.SEARCHING
  ) {
    wasSearching = true
    groupFinder.StopSearch()
  }
  zo_callLater(() => {
    const row = achievementData(id)
    if (row === undefined) return
    const params = listingParams(row, id)
    if (params === undefined) return
    createListing(params)
    if (wasSearching) zo_callLater(() => GROUP_FINDER.instance?.StartSearch(), 2000)
  }, 1000)
}

export function achievementContextMenuFn(
  this: void,
  id: number
): (this: void, control: Control, button: number) => undefined {
  return (control, button) => {
    if (button === 2) {
      ClearMenu()
    } else if (button === 1) {
      ClearMenu()
      AddMenuItem("Link in Chat", () => linkInChat(id))
      AddMenuItem("Open Journal", () => openJournal(id))
      AddMenuItem("Create Group Finder", () => createGroupFinderListing(id))
      ShowMenu(control)
    }
  }
}

function onAchievementSearchResults(this: void): undefined {
  if (ACHIEVEMENTS.contentSearchEditBox.GetText() !== GetAchievementName(searchedAchievementId))
    return
  const [categoryIndex, subCategoryIndex] = GetCategoryInfoFromAchievementId(searchedAchievementId)
  ACHIEVEMENTS.OpenCategory(categoryIndex, subCategoryIndex)
  ACHIEVEMENTS.achievementsById[searchedAchievementId]?.Expand()
}

export function registerAchievementSearch(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(
    "TemperCharactersPithka",
    EVENT_ACHIEVEMENTS_SEARCH_RESULTS_READY,
    onAchievementSearchResults
  )
}
