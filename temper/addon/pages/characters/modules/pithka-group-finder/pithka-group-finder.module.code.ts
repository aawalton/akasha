import {
  createDataStore,
  type GroupFinderDataStore,
  type Listing,
} from "akasha/temper/addon/pages/characters/modules/pithka-group-finder-data-store/pithka-group-finder-data-store.module.code.ts"
import {
  createSearchQueue,
  type Enabled,
  entriesOf,
  type GroupFinderSearchQueue,
  PRIORITY,
  type Search,
} from "akasha/temper/addon/pages/characters/modules/pithka-group-finder-search-queue/pithka-group-finder-search-queue.module.code.ts"
import {
  createStateMachine,
  EVENTS,
  type GroupFinderStateMachine,
  STATES,
} from "akasha/temper/addon/pages/characters/modules/pithka-group-finder-state-machine/pithka-group-finder-state-machine.module.code.ts"
import {
  type CallbackKey,
  getValue,
  registerCallback,
  savedVarsDb,
} from "akasha/temper/addon/pages/characters/modules/pithka-saved-vars/pithka-saved-vars.module.code.ts"
import "akasha/temper/addon/pages/characters/pithka-declarations/pithka-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-5/eso-interface-extra-5.type-declaration.d.ts"

type JoinData = { readonly listing: Listing }

export type GroupFinder = {
  readonly stateMachine: GroupFinderStateMachine<JoinData>
  readonly dataStore: GroupFinderDataStore
  readonly searchQueue: GroupFinderSearchQueue
  readonly AfterEachSearchStep: (this: void, fn: (this: void) => undefined) => undefined
  readonly JoinGroup: (this: void, listing: Listing) => boolean
  readonly UpdateSearchState: (this: void) => undefined
  readonly StartSearch: (this: void) => boolean
  readonly StopSearch: (this: void) => boolean
  readonly GetEnabledRoles: (this: void) => Enabled
  readonly GetRoleName: (this: void, role: number) => string
  readonly GetCategoryName: (this: void, category: number) => string
  readonly GetDifficultyName: (this: void, difficulty: number) => string
}

const SEARCH_PARAM_KEYS: readonly CallbackKey[] = [
  "groupFinderHealer",
  "groupFinderTank",
  "groupFinderDps",
  "groupFinderDungeons",
  "groupFinderTrials",
  "groupFinderNormal",
  "groupFinderVeteran",
]

const COOLDOWN_RETRY_MS = 1500

function enabledCategories(this: void): Enabled {
  return {
    [GROUP_FINDER_CATEGORY_TRIAL]: getValue("groupFinderTrials"),
    [GROUP_FINDER_CATEGORY_DUNGEON]: getValue("groupFinderDungeons"),
  }
}

function enabledDifficulties(this: void): Enabled {
  return {
    [DUNGEON_DIFFICULTY_NORMAL]: getValue("groupFinderNormal"),
    [DUNGEON_DIFFICULTY_VETERAN]: getValue("groupFinderVeteran"),
  }
}

function enabledRoles(this: void): Enabled {
  return {
    [LFG_ROLE_TANK]: getValue("groupFinderTank"),
    [LFG_ROLE_HEAL]: getValue("groupFinderHealer"),
    [LFG_ROLE_DPS]: getValue("groupFinderDps"),
  }
}

function roleName(this: void, role: number): string {
  if (role === LFG_ROLE_TANK) return "TANK"
  if (role === LFG_ROLE_HEAL) return "HEALER"
  if (role === LFG_ROLE_DPS) return "DPS"
  return tostring(role)
}

function categoryName(this: void, category: number): string {
  if (category === GROUP_FINDER_CATEGORY_TRIAL) return "TRIAL"
  if (category === GROUP_FINDER_CATEGORY_DUNGEON) return "DUNGEON"
  return tostring(category)
}

function difficultyName(this: void, difficulty: number): string {
  if (difficulty === DUNGEON_DIFFICULTY_NORMAL) return "NORMAL"
  if (difficulty === DUNGEON_DIFFICULTY_VETERAN) return "VETERAN"
  return tostring(difficulty)
}

function openingsFor(this: void, listing: Listing, role: number): boolean {
  if (role === LFG_ROLE_TANK) return listing.tankDesired > listing.tankAttained
  if (role === LFG_ROLE_HEAL) return listing.healerDesired > listing.healerAttained
  if (role === LFG_ROLE_DPS) return listing.dpsDesired > listing.dpsAttained
  return false
}

function isListingRelevant(this: void, listing: Listing): boolean {
  const roles = entriesOf(enabledRoles()).filter(([, enabled]) => enabled)
  if (roles.length === 0) return false
  if (!roles.some(([role]) => openingsFor(listing, role))) return false
  if (enabledCategories()[listing.category] !== true) return false
  const difficultyID = listing.difficultyID
  if (difficultyID === undefined) return false
  return enabledDifficulties()[difficultyID] === true
}

function listingAt(this: void, index: number, current: Search): Listing {
  const [tankDesired, tankAttained] = GetGroupFinderSearchListingRoleStatusCount(
    index,
    LFG_ROLE_TANK
  )
  const [healerDesired, healerAttained] = GetGroupFinderSearchListingRoleStatusCount(
    index,
    LFG_ROLE_HEAL
  )
  const [dpsDesired, dpsAttained] = GetGroupFinderSearchListingRoleStatusCount(index, LFG_ROLE_DPS)
  const [difficulty, specificActivity] =
    GetGroupFinderSearchListingOptionsSelectionTextByIndex(index)
  return {
    title: GetGroupFinderSearchListingTitleByIndex(index),
    description: GetGroupFinderSearchListingDescriptionByIndex(index),
    category: GetGroupFinderSearchListingCategoryByIndex(index),
    numRoles: GetGroupFinderSearchListingNumRolesByIndex(index),
    leader: GetGroupFinderSearchListingLeaderDisplayNameByIndex(index),
    tankDesired,
    tankAttained,
    healerDesired,
    healerAttained,
    dpsDesired,
    dpsAttained,
    totalAttained: tankAttained + healerAttained + dpsAttained,
    searchKey: current.searchKey,
    difficulty,
    specificActivity,
    difficultyID: current.difficulty,
  }
}

function copyOf(this: void, table: Enabled): Enabled {
  const copy: Enabled = {}
  for (const [key, value] of entriesOf(table)) copy[key] = value
  return copy
}

function anyDisabled(this: void, previous: Enabled | undefined, current: Enabled): boolean {
  if (previous === undefined) return false
  return entriesOf(previous).some(
    ([key, wasEnabled]) => wasEnabled === true && current[key] !== true
  )
}

function setJoiningOverlay(this: void, joining: boolean): undefined {
  const content = TemperCharactersPithka_GroupFinderGUI.GetNamedChild("ContentContainer")
  content?.GetNamedChild("JoiningOverlay")?.SetHidden(!joining)
  content?.GetNamedChild("List")?.SetHidden(joining)
  return undefined
}

export function createGroupFinder(this: void): GroupFinder {
  const stateMachine = createStateMachine<JoinData>()
  const dataStore = createDataStore()
  const searchQueue = createSearchQueue(dataStore)
  const afterSearchSteps: ((this: void) => undefined)[] = []
  let isSearching = false
  let pendingDelayedSearches: Record<string, boolean | undefined> = {}
  let previousRoles: Enabled = copyOf(enabledRoles())
  let previousCategories: Enabled | undefined
  let previousDifficulties: Enabled | undefined
  let targetListing: Listing | undefined

  const rebuildQueue = (): undefined =>
    searchQueue.BuildFromEnabled(enabledCategories(), enabledDifficulties(), enabledRoles())

  const executeSearch = (search: Search): undefined => {
    const state = stateMachine.GetCurrentState()
    if (state !== STATES.SEARCHING && state !== STATES.JOINING) return undefined
    if (isSearching) return undefined
    isSearching = true
    SetGroupFinderFilterEnforceRoles(false)
    SetGroupFinderFilterCategory(search.category)
    SetGroupFinderFilterPrimaryOptionByIndex(
      search.difficulty === DUNGEON_DIFFICULTY_VETERAN ? 2 : 1,
      true
    )
    if (search.priority === PRIORITY.HIGH && search.role !== undefined) {
      UpdateSelectedLFGRole(search.role)
      SetGroupFinderFilterEnforceRoles(true)
    }
    if (IsGroupFinderSearchOnCooldown()) {
      isSearching = false
      const delayedSearchId = `${GetTimeStamp()}_${Math.random()}`
      pendingDelayedSearches[delayedSearchId] = true
      zo_callLater(() => {
        if (pendingDelayedSearches[delayedSearchId] !== true) return
        pendingDelayedSearches[delayedSearchId] = undefined
        executeSearch(search)
      }, COOLDOWN_RETRY_MS)
      return undefined
    }
    RequestGroupFinderSearch()
    return undefined
  }

  const processNextSearch = (): undefined => {
    const state = stateMachine.GetCurrentState()
    if (state === STATES.SEARCHING || state === STATES.JOINING) {
      const search = searchQueue.Next(state)
      if (search === undefined) {
        stateMachine.HandleEvent(EVENTS.STOP_SEARCH)
      } else {
        executeSearch(search)
      }
    }
    for (const step of afterSearchSteps) step()
    return undefined
  }

  const processSearchResults = (): undefined => {
    const current = searchQueue.GetCurrentSearch()
    if (current === undefined) return undefined
    const state = stateMachine.GetCurrentState()
    if (state === STATES.SEARCHING) dataStore.ClearSearchResults(current.searchKey)
    const numResults = GetGroupFinderSearchNumListings()
    for (let index = 1; index <= numResults; index++) {
      const listing = listingAt(index, current)
      if (state === STATES.JOINING) {
        if (targetListing !== undefined && listing.leader === targetListing.leader) {
          ZO_Dialogs_ShowPlatformDialog(
            "GROUP_FINDER_APPLICATION_KEYBOARD",
            ZO_GroupListingSearchData.New(index)
          )
          searchQueue.RemovePrioritySearch()
          stateMachine.HandleEvent(EVENTS.START_SEARCH)
          return undefined
        }
      } else if (state === STATES.SEARCHING && isListingRelevant(listing)) {
        dataStore.UpsertListing(listing)
      }
    }
    return undefined
  }

  const updateSearchState = (): undefined => {
    const state = stateMachine.GetCurrentState()
    const windowVisible = !TemperCharactersPithka_GroupFinderGUI.IsControlHidden()
    const shouldSearch = windowVisible && searchQueue.QueueLength() > 0
    if (shouldSearch && state === STATES.IDLE) {
      stateMachine.HandleEvent(EVENTS.START_SEARCH)
    } else if (!shouldSearch && state === STATES.SEARCHING) {
      stateMachine.HandleEvent(EVENTS.STOP_SEARCH)
    }
    return undefined
  }

  const checkForDisabledSearchParams = (): undefined => {
    const roles = enabledRoles()
    const categories = enabledCategories()
    const difficulties = enabledDifficulties()
    const disabled =
      anyDisabled(previousRoles, roles) ||
      anyDisabled(previousCategories, categories) ||
      anyDisabled(previousDifficulties, difficulties)
    previousRoles = copyOf(roles)
    previousCategories = copyOf(categories)
    previousDifficulties = copyOf(difficulties)
    if (!disabled) return undefined
    const all = dataStore.GetAllListings()
    for (const leader in all) {
      const listing = all[leader]
      if (listing !== undefined && !isListingRelevant(listing)) dataStore.RemoveListing(leader)
    }
    return undefined
  }

  stateMachine.RegisterCallback(STATES.SEARCHING, () => {
    setJoiningOverlay(false)
    pendingDelayedSearches = {}
    rebuildQueue()
    return processNextSearch()
  })
  stateMachine.RegisterCallback(STATES.JOINING, (_old, data) => {
    if (data === undefined) return undefined
    const usage = savedVarsDb()?.groupFinderUsage
    if (usage !== undefined) usage.joiningAttempts = (usage.joiningAttempts ?? 0) + 1
    setJoiningOverlay(true)
    pendingDelayedSearches = {}
    targetListing = data.listing
    let difficultyID = data.listing.difficultyID
    if (difficultyID === undefined) {
      const said = data.listing.difficulty.toLowerCase()
      if (said.includes("veteran")) difficultyID = DUNGEON_DIFFICULTY_VETERAN
      else if (said.includes("normal")) difficultyID = DUNGEON_DIFFICULTY_NORMAL
    }
    if (difficultyID === undefined) return undefined
    searchQueue.AddPrioritySearch(data.listing.category, difficultyID, data.listing.role)
    return processNextSearch()
  })
  stateMachine.RegisterCallback(STATES.IDLE, () => {
    setJoiningOverlay(false)
    pendingDelayedSearches = {}
    dataStore.ClearAll()
    return searchQueue.ResetSearchCounter()
  })
  EVENT_MANAGER.RegisterForEvent(
    "TemperCharactersPithkaGroupFinder",
    EVENT_GROUP_FINDER_SEARCH_COMPLETE,
    () => {
      isSearching = false
      const state = stateMachine.GetCurrentState()
      if (state === STATES.SEARCHING) {
        processSearchResults()
        processNextSearch()
      } else if (state === STATES.JOINING) {
        const current = searchQueue.GetCurrentSearch()
        processSearchResults()
        if (current === undefined || current.priority !== PRIORITY.HIGH) {
          processNextSearch()
        } else if (stateMachine.GetCurrentState() === STATES.JOINING) {
          stateMachine.HandleEvent(EVENTS.STOP_SEARCH)
        }
      }
    }
  )
  registerCallback((key) => {
    if (!SEARCH_PARAM_KEYS.includes(key)) return undefined
    checkForDisabledSearchParams()
    rebuildQueue()
    return updateSearchState()
  })
  rebuildQueue()

  return {
    stateMachine,
    dataStore,
    searchQueue,
    AfterEachSearchStep: (fn) => {
      afterSearchSteps.push(fn)
      return undefined
    },
    JoinGroup: (listing) => stateMachine.HandleEvent(EVENTS.JOIN_GROUP, { listing }),
    UpdateSearchState: updateSearchState,
    StartSearch: () => stateMachine.HandleEvent(EVENTS.START_SEARCH),
    StopSearch: () => stateMachine.HandleEvent(EVENTS.STOP_SEARCH),
    GetEnabledRoles: enabledRoles,
    GetRoleName: roleName,
    GetCategoryName: categoryName,
    GetDifficultyName: difficultyName,
  }
}

export const GROUP_FINDER: { instance: GroupFinder | undefined } = { instance: undefined }
