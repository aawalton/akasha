export type Listing = {
  title: string
  description: string
  category: number
  numRoles: number
  leader: string
  tankDesired: number
  tankAttained: number
  healerDesired: number
  healerAttained: number
  dpsDesired: number
  dpsAttained: number
  totalAttained: number
  searchKey: string
  difficulty: string
  specificActivity: string
  difficultyID: number | undefined
  role?: number
}

export type GroupFinderDataStore = {
  readonly RegisterUpdateCallback: (this: void, callback: (this: void) => undefined) => undefined
  readonly UpsertListing: (this: void, listing: Listing) => undefined
  readonly RemoveListing: (this: void, leader: string) => undefined
  readonly ClearSearchResults: (this: void, searchKey: string) => undefined
  readonly GetAllListings: (this: void) => Record<string, Listing | undefined>
  readonly ClearAll: (this: void) => undefined
}

export function createDataStore(this: void): GroupFinderDataStore {
  let listings: Record<string, Listing | undefined> = {}
  let searchIndex: Record<string, string[] | undefined> = {}
  const updateCallbacks: ((this: void) => undefined)[] = []
  const fireCallbacks = (): undefined => {
    for (const callback of updateCallbacks) callback()
    return undefined
  }
  const removeListing = (leader: string): undefined => {
    const listing = listings[leader]
    if (listing === undefined) return undefined
    listings[leader] = undefined
    const leaders = searchIndex[listing.searchKey]
    if (leaders !== undefined) {
      const at = leaders.indexOf(leader)
      if (at !== -1) leaders.splice(at, 1)
      if (leaders.length === 0) searchIndex[listing.searchKey] = undefined
    }
    return fireCallbacks()
  }
  return {
    RegisterUpdateCallback: (callback) => {
      updateCallbacks.push(callback)
      return undefined
    },
    UpsertListing: (listing) => {
      listings[listing.leader] = listing
      const leaders = searchIndex[listing.searchKey] ?? []
      searchIndex[listing.searchKey] = leaders
      if (!leaders.includes(listing.leader)) leaders.push(listing.leader)
      return fireCallbacks()
    },
    RemoveListing: removeListing,
    ClearSearchResults: (searchKey) => {
      const leaders = searchIndex[searchKey]
      if (leaders === undefined) return undefined
      for (const leader of [...leaders]) {
        if (listings[leader] !== undefined) removeListing(leader)
      }
      searchIndex[searchKey] = undefined
      return undefined
    },
    GetAllListings: () => listings,
    ClearAll: () => {
      listings = {}
      searchIndex = {}
      return fireCallbacks()
    },
  }
}
