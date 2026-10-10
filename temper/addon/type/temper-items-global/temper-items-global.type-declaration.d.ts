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

interface TemperItemsPlanItem {
  bagId: number
  slotIndex: number
  link: string
  count: number
  verb: string
  destination?: string
}

interface TemperItemsActionSummary {
  totalSlots: number
  venues: { label: string; count: number; line: string; items: TemperItemsPlanItem[] }[]
}

interface TemperItemsApi {
  ToggleHoveredItemSell: (this: void) => undefined
  ToggleHoveredItemLock: (this: void) => undefined
  ToggleInventoryBrowser: (this: void) => undefined
  getInventoryActionSummary: (this: void) => TemperItemsActionSummary | undefined
  getSavedVariables: (this: void) => TemperItemsSavedVariables
}

declare var TemperItems: TemperItemsApi | undefined
