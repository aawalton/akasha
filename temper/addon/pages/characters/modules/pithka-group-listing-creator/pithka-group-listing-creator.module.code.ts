import type { AchievementRow } from "akasha/temper/addon/pages/characters/modules/pithka-achievements/pithka-achievements.module.code.ts"
import { entriesOf } from "akasha/temper/addon/pages/characters/modules/pithka-group-finder-search-queue/pithka-group-finder-search-queue.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-3/eso-api-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-5/eso-interface-extra-5.type-declaration.d.ts"

export type ListingParams = {
  readonly title: string
  readonly description: string
  readonly category: number
  readonly difficulty: number
  readonly groupSize: number
  readonly roles: Record<number, number>
  readonly requiresChampion: boolean
  readonly autoAcceptRequests: boolean
  readonly enforceRoles: boolean
  readonly achievementData: AchievementRow
}

const DRAFT = GROUP_FINDER_GROUP_LISTING_USER_TYPE_GROUP_LISTING_DRAFT

function hasRomanNumeral(this: void, name: string): boolean {
  const [found] = string.match(name, " i+$")
  return found !== undefined
}

function romanNumeralStripped(this: void, name: string): string {
  const [stripped] = string.gsub(name, " i+$", "")
  return stripped
}

function findSecondaryOptionIndex(this: void, achievementData: AchievementRow): number | undefined {
  const userType = DRAFT
  const achievementName = achievementData.NAME
  const options: { name: string; index: number }[] = []
  const count = GetGroupFinderUserTypeGroupListingNumSecondaryOptions(userType)
  for (let index = 1; index <= count; index++) {
    const [name] = GetGroupFinderUserTypeGroupListingSecondaryOptionByIndex(userType, index)
    if (name !== undefined) options.push({ name, index })
  }
  options.sort((a, b) => b.name.length - a.name.length)
  const lowerAchievement = achievementName.toLowerCase()
  const achievementNumeral = hasRomanNumeral(lowerAchievement)
  for (const option of options) {
    if (option.name === achievementName) return option.index
    const lowerOption = option.name.toLowerCase()
    if (lowerOption === lowerAchievement) return option.index
    const optionNumeral = hasRomanNumeral(lowerOption)
    if (achievementNumeral && optionNumeral) {
      if (lowerOption === lowerAchievement) return option.index
    } else if (!achievementNumeral && !optionNumeral) {
      if (lowerOption.includes(lowerAchievement) || lowerAchievement.includes(lowerOption)) {
        return option.index
      }
    } else if (!achievementNumeral && optionNumeral) {
      const optionBase = romanNumeralStripped(lowerOption)
      if (optionBase === lowerAchievement || optionBase.includes(lowerAchievement)) {
        return option.index
      }
    }
  }
  return undefined
}

function forceUIRefresh(this: void): undefined {
  zo_callLater(() => {
    GROUP_FINDER_KEYBOARD?.createGroupListingContent?.Refresh()
  }, 50)
}

function setGroupSize(this: void, userType: number, size: number): undefined {
  SetGroupFinderUserTypeGroupListingGroupSize(userType, size)
}

function setListingValues(this: void, params: ListingParams): undefined {
  const userType = DRAFT
  SetGroupFinderUserTypeGroupListingTitle(userType, params.title)
  SetGroupFinderUserTypeGroupListingDescription(userType, params.description)
  SetGroupFinderUserTypeGroupListingCategory(userType, params.category)
  UpdateGroupFinderUserTypeGroupListingOptions(userType)
  SetGroupFinderUserTypeGroupListingSecondaryOptionDefault(userType)
  if (
    params.category === GROUP_FINDER_CATEGORY_DUNGEON ||
    params.category === GROUP_FINDER_CATEGORY_ARENA ||
    params.category === GROUP_FINDER_CATEGORY_TRIAL
  ) {
    SetGroupFinderUserTypeGroupListingPrimaryOption(userType, params.difficulty)
    UpdateGroupFinderUserTypeGroupListingOptions(userType)
    zo_callLater(() => {
      const secondaryIndex = findSecondaryOptionIndex(params.achievementData)
      if (secondaryIndex !== undefined) {
        SetGroupFinderUserTypeGroupListingSecondaryOption(userType, secondaryIndex)
        forceUIRefresh()
      }
    }, 100)
  }

  let size = params.groupSize
  const minSize = GetGroupFinderUserTypeGroupSizeIterationBegin(userType)
  const maxSize = GetGroupFinderUserTypeGroupSizeIterationEnd(userType)
  if (size < minSize || size > maxSize) size = Math.max(minSize, Math.min(maxSize, size))
  setGroupSize(userType, size)
  zo_callLater(() => {
    setGroupSize(userType, size)
    if (GetGroupFinderUserTypeGroupListingGroupSize(userType) !== size) {
      for (let attempt = 1; attempt <= 5; attempt++) {
        zo_callLater(() => setGroupSize(userType, size), attempt * 100)
      }
      zo_callLater(() => {
        setGroupSize(userType, size)
        forceUIRefresh()
      }, 1000)
    }
    forceUIRefresh()
  }, 200)

  GroupFinderUserTypeGroupListingClearDesiredRoles(userType)
  for (const [role, count] of entriesOf(params.roles)) {
    if (count > 0) {
      SetGroupFinderUserTypeGroupListingRoleCount(userType, role, count)
    }
  }
  SetGroupFinderUserTypeGroupListingRequiresChampion(userType, params.requiresChampion)
  SetGroupFinderUserTypeGroupListingAutoAcceptRequests(userType, params.autoAcceptRequests)
  SetGroupFinderUserTypeGroupListingEnforceRoles(userType, params.enforceRoles)
}

type TreeNode = {
  GetData: () => { isGroupFinder?: boolean; searchCategory?: number } | undefined
}

function findNode(
  this: void,
  test: (this: void, data: NonNullable<ReturnType<TreeNode["GetData"]>>) => boolean
): TreeNode | undefined {
  let found: TreeNode | undefined
  GROUP_MENU_KEYBOARD.GetTree().ExecuteOnSubTree(undefined, (node: TreeNode) => {
    const data = node.GetData()
    if (data !== undefined && test(data)) {
      found = node
      return true
    }
    return false
  })
  return found
}

function showCreationDialog(this: void, targetCategory: number): undefined {
  if (IsInGamepadPreferredMode()) {
    GROUP_FINDER_GAMEPAD?.createEditDialogObject?.ShowDialog()
    return
  }
  if (GROUP_FINDER_KEYBOARD === undefined) return
  if (GROUP_FINDER_KEYBOARD.mode === ZO_GROUP_FINDER_MODES.CREATE_EDIT) {
    GROUP_FINDER_KEYBOARD.ExitCreateEditState()
    zo_callLater(() => showCreationDialog(targetCategory), 100)
    return
  }
  SetGroupFinderFilterCategory(targetCategory)
  const groupFinderNode = findNode((data) => data.isGroupFinder === true)
  const groupFinderData = groupFinderNode?.GetData()
  if (groupFinderData === undefined) return
  GROUP_MENU_KEYBOARD.ShowCategoryByData(groupFinderData)
  zo_callLater(() => {
    const targetNode = findNode((data) => data.searchCategory === targetCategory)
    if (targetNode !== undefined) GROUP_MENU_KEYBOARD.GetTree().SelectNode(targetNode)
    zo_callLater(() => {
      GROUP_FINDER_KEYBOARD?.SetMode(ZO_GROUP_FINDER_MODES.CREATE_EDIT)
    }, 200)
  }, 100)
}

export function createListing(this: void, params: ListingParams): boolean {
  const [canCreate] = ZO_GroupFinder_CanDoCreateEdit()
  if (!canCreate) {
    if (IsGroupFinderRoleChangeRequested()) {
      zo_callLater(() => createListing(params), 3000)
    }
    return false
  }
  GroupFinderUserTypeGroupListingClearDesiredRoles(DRAFT)
  showCreationDialog(params.category)
  zo_callLater(() => setListingValues(params), 500)
  return true
}
