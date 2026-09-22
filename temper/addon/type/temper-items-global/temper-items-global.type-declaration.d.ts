interface TemperItemsCharacterAutomation {
  equipment?: boolean
  food?: boolean
  potions?: boolean
}

interface TemperItemsCompanionAutomation {
  equipment?: boolean
  skills?: boolean
}

interface TemperItemsAutomation {
  characters: Record<string, TemperItemsCharacterAutomation>
  companions: Record<string, TemperItemsCompanionAutomation>
}

interface TemperItemsBackpack {
  bufferSlots?: number
}

interface TemperItemsSavedVariables {
  automation?: TemperItemsAutomation
  backpack?: TemperItemsBackpack
}

interface TemperItemsActionSummary {
  totalSlots: number
  venues: { label: string; count: number }[]
}

interface TemperItemsApi {
  ToggleHoveredItemSell: (this: void) => undefined
  ToggleHoveredItemLock: (this: void) => undefined
  ToggleInventoryBrowser: (this: void) => undefined
  getInventoryActionSummary: (this: void) => TemperItemsActionSummary | undefined
  getBackpackFreeSlots: (this: void) => number
  getSavedVariables: (this: void) => TemperItemsSavedVariables
  isSavedVariablesReady: (this: void) => boolean
}

declare var TemperItems: TemperItemsApi | undefined
