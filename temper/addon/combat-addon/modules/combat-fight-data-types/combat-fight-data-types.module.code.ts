export type CombatLogLine = (number | undefined)[]

export type LogFilters = Record<number, boolean>

export interface FightUnit {
  unitType?: number
  zenEffectSlot?: unknown
  stacksOfZen?: unknown
  forceOfNature?: unknown
  forceOfNatureStacks?: unknown
  [key: string]: unknown
}

export interface FightCalculated {
  units: Record<number, unknown>
  resources?: Record<number, unknown>
  DPSOut?: number
  DPSIn?: number
  HPSOut?: number
  HPSIn?: number
  [key: string]: unknown
}

export interface Fight {
  units?: Record<number, FightUnit>
  calculated: FightCalculated
  bosses?: Record<number, number | undefined>
  playerid?: number
  unitConversion?: Record<number, number>
  log?: CombatLogLine[]
  starttime?: number
  fightlabel?: string
  char?: string
  charData?: { name?: string; [key: string]: unknown }
  zone?: string
  subzone?: string
  date?: number
  time?: string
  dpstime?: number
  hpstime?: number
  svversion?: number
  APIversion?: number
  ESOversion?: string
  stringlog?: string[]
  [key: string]: unknown
}

export interface SavedFightCalculated {
  DPSOut?: number
  DPSIn?: number
  HPSOut?: number
  HPSIn?: number
}

export interface SavedFightMeta {
  fightlabel?: string
  charData?: { name: string }
  zone?: string
  subzone?: string
  date?: number
  time?: string
  calculated?: SavedFightCalculated
  hpstime?: number
  dpstime?: number
}

export interface SavedFight extends SavedFightMeta {
  encodedStrings?: string[]
  stringlog?: string[]
  svversion: number
  log?: boolean
  [key: string]: unknown
}

export type FightDataSV = SavedFight[] & { version: number }

export type FightDataSVRaw = SavedFight[] & { version?: number }
