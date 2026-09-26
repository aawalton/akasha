import type { GroupFinderDataStore } from "akasha/temper/addon/pages/characters/modules/pithka-group-finder-data-store/pithka-group-finder-data-store.module.code.ts"
import {
  type GroupFinderState,
  STATES,
} from "akasha/temper/addon/pages/characters/modules/pithka-group-finder-state-machine/pithka-group-finder-state-machine.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export const PRIORITY = {
  HIGH: 1,
  NORMAL: 2,
} as const

export type Search = {
  readonly category: number
  readonly difficulty: number
  readonly role: number | undefined
  readonly priority: number
  readonly searchKey: string
}

export type Enabled = Record<number, boolean | undefined>

export function entriesOf<V>(this: void, table: Record<number, V>): [number, V][] {
  const entries: [number, V][] = []
  for (const key in table) {
    const numeric = tonumber(key)
    const value = numeric === undefined ? undefined : table[numeric]
    if (numeric !== undefined && value !== undefined) entries.push([numeric, value])
  }
  return entries
}

export function searchKeyOf(this: void, category: number, difficulty: number): string {
  return `${category}_${difficulty}`
}

type Wanted = { readonly category: number; readonly difficulty: number }

export type GroupFinderSearchQueue = {
  readonly Next: (this: void, currentState: GroupFinderState) => Search | undefined
  readonly AddPrioritySearch: (
    this: void,
    category: number,
    difficulty: number,
    role: number | undefined
  ) => undefined
  readonly RemovePrioritySearch: (this: void) => undefined
  readonly BuildFromEnabled: (
    this: void,
    categories: Enabled,
    difficulties: Enabled,
    roles: Enabled
  ) => undefined
  readonly GetCurrentSearch: (this: void) => Search | undefined
  readonly QueueLength: (this: void) => number
  readonly ResetSearchCounter: (this: void) => undefined
  readonly GetTotalSearches: (this: void) => number
  readonly GetVisualSearchIndex: (this: void) => number
}

export function createSearchQueue(
  this: void,
  dataStore: GroupFinderDataStore
): GroupFinderSearchQueue {
  const queue: Search[] = []
  let currentSearch: Search | undefined
  let totalSearches = 0
  let searchCounter = 0

  const updateTotalSearches = (): undefined => {
    totalSearches = queue.filter((search) => search.priority !== PRIORITY.HIGH).length
    return undefined
  }

  const enqueue = (search: Search): undefined => {
    if (search.priority === PRIORITY.HIGH) {
      queue.unshift(search)
    } else {
      queue.push(search)
    }
    return updateTotalSearches()
  }

  const removePrioritySearch = (): undefined => {
    const at = queue.findIndex((search) => search.priority === PRIORITY.HIGH)
    if (at === -1) return undefined
    queue.splice(at, 1)
    return updateTotalSearches()
  }

  const removeSearchAndData = (category: number, difficulty: number): undefined => {
    for (let at = queue.length - 1; at >= 0; at--) {
      const search = queue[at]
      if (
        search !== undefined &&
        search.category === category &&
        search.difficulty === difficulty &&
        search.priority !== PRIORITY.HIGH
      ) {
        queue.splice(at, 1)
      }
    }
    dataStore.ClearSearchResults(searchKeyOf(category, difficulty))
    return updateTotalSearches()
  }

  const buildFromEnabled = (
    categories: Enabled,
    difficulties: Enabled,
    roles: Enabled
  ): undefined => {
    const expected: Record<string, Wanted | undefined> = {}
    const anyRoleEnabled = entriesOf(roles).some(([, enabled]) => enabled)
    for (const [category, categoryEnabled] of entriesOf(categories)) {
      for (const [difficulty, difficultyEnabled] of entriesOf(difficulties)) {
        if (categoryEnabled && difficultyEnabled && anyRoleEnabled) {
          expected[searchKeyOf(category, difficulty)] = { category, difficulty }
        }
      }
    }
    const existing: Record<string, Search | undefined> = {}
    for (const search of queue) {
      if (search.priority !== PRIORITY.HIGH) existing[search.searchKey] = search
    }
    const toRemove: Search[] = []
    for (const key in existing) {
      const search = existing[key]
      if (search !== undefined && expected[key] === undefined) toRemove.push(search)
    }
    const toAdd: Wanted[] = []
    for (const key in expected) {
      const wanted = expected[key]
      if (wanted !== undefined && existing[key] === undefined) toAdd.push(wanted)
    }
    for (const search of toRemove) removeSearchAndData(search.category, search.difficulty)
    for (const wanted of toAdd) {
      enqueue({
        category: wanted.category,
        difficulty: wanted.difficulty,
        role: undefined,
        priority: PRIORITY.NORMAL,
        searchKey: searchKeyOf(wanted.category, wanted.difficulty),
      })
    }
    if (toRemove.length > 0 || toAdd.length > 0) {
      updateTotalSearches()
      searchCounter = 0
    }
    return undefined
  }

  return {
    Next: (currentState) => {
      let search: Search | undefined
      if (currentState === STATES.JOINING) {
        if (queue[0]?.priority !== PRIORITY.HIGH) return undefined
        search = queue.shift()
      } else {
        search = queue.shift()
        if (search !== undefined && search.priority !== PRIORITY.HIGH) queue.push(search)
      }
      currentSearch = search
      if (search !== undefined) searchCounter = searchCounter + 1
      return search
    },
    AddPrioritySearch: (category, difficulty, role) => {
      removePrioritySearch()
      return enqueue({
        category,
        difficulty,
        role,
        priority: PRIORITY.HIGH,
        searchKey: searchKeyOf(category, difficulty),
      })
    },
    RemovePrioritySearch: removePrioritySearch,
    BuildFromEnabled: buildFromEnabled,
    GetCurrentSearch: () => currentSearch,
    QueueLength: () => queue.length,
    ResetSearchCounter: () => {
      searchCounter = 0
      return undefined
    },
    GetTotalSearches: () => totalSearches,
    GetVisualSearchIndex: () => {
      if (totalSearches === 0) return 0
      return ((searchCounter - 1) % totalSearches) + 1
    },
  }
}
