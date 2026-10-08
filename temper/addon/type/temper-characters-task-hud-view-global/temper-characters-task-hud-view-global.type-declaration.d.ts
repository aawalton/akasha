interface TemperCharactersTaskHudQuestFocus {
  journalIndex: number
  name: string
  assistedWithZero: boolean
  assistedWithNil: boolean
}

interface TemperCharactersTaskHudViewReading {
  assistedName?: string
  refreshCount: number
  lastRefreshAt?: number
  lastSyncedName?: string
  quests: TemperCharactersTaskHudQuestFocus[]
}

interface TemperCharactersTaskHudViewApi {
  Read: (this: void) => TemperCharactersTaskHudViewReading | undefined
}

declare var TemperCharactersTaskHudView: TemperCharactersTaskHudViewApi | undefined
