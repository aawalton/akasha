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

interface TemperItemsSavedVariables {
  automation?: TemperItemsAutomation
}

interface TemperItemsActionSummary {
  totalSlots: number
  venues: { label: string; count: number; line: string }[]
}

interface TemperItemsApi {
  ToggleHoveredItemSell: (this: void) => undefined
  ToggleHoveredItemLock: (this: void) => undefined
  ToggleInventoryBrowser: (this: void) => undefined
  getInventoryActionSummary: (this: void) => TemperItemsActionSummary | undefined
  getSavedVariables: (this: void) => TemperItemsSavedVariables
}

declare var TemperItems: TemperItemsApi | undefined
