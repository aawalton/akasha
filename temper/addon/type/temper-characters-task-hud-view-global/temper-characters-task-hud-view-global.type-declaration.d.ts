interface TemperCharactersTaskHudQuestFocus {
  journalIndex: number
  name: string
  assistedWithZero: boolean
  assistedWithNil: boolean
}

interface TemperCharactersTaskHudLabelDrawn {
  text: string
  r: number
  g: number
  b: number
  a: number
}

interface TemperCharactersTaskHudRowDrawn {
  name: string
  hidden: boolean
  controlHidden: boolean
  offsetY?: number
  labels: TemperCharactersTaskHudLabelDrawn[]
}

interface TemperCharactersTaskHudWindowDrawn {
  name: string
  hidden: boolean
  controlHidden: boolean
  alpha: number
  left: number
  top: number
  width: number
  height: number
}

interface TemperCharactersTaskHudNamedWindow {
  name: string
  exists: boolean
  hidden?: boolean
  controlHidden?: boolean
}

interface TemperCharactersTaskHudDrawn {
  exit?: string
  window?: TemperCharactersTaskHudWindowDrawn
  contentHidden?: boolean
  contentChildren?: number
  emptyHidden?: boolean
  fragmentShowing?: boolean
  named: TemperCharactersTaskHudNamedWindow[]
  rows: TemperCharactersTaskHudRowDrawn[]
}

interface TemperCharactersTaskHudViewReading {
  assistedName?: string
  refreshCount: number
  lastRefreshAt?: number
  lastSyncedName?: string
  quests: TemperCharactersTaskHudQuestFocus[]
  drawn?: TemperCharactersTaskHudDrawn
}

interface TemperCharactersTaskHudViewApi {
  Read: (this: void) => TemperCharactersTaskHudViewReading | undefined
}

declare var TemperCharactersTaskHudView: TemperCharactersTaskHudViewApi | undefined
