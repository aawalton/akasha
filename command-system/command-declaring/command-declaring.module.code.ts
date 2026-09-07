export type FlagValueShape = "prose" | "line" | "token"

interface HelpFlagCommon {
  readonly name: string
  readonly description: string
  readonly required?: boolean
  readonly default?: string
  readonly choices?: readonly string[]
  readonly deprecatedChoices?: readonly string[]
  readonly repeat?: boolean
  readonly acceptsStdin?: boolean
  readonly valueShape?: FlagValueShape
  readonly path?: boolean
  readonly aliases?: readonly string[]
}

interface HelpFlagBoolean extends HelpFlagCommon {
  readonly argLabel?: undefined
}

interface HelpFlagValued extends HelpFlagCommon {
  readonly argLabel: string
  readonly valueShape: FlagValueShape
}

export type HelpFlag = HelpFlagBoolean | HelpFlagValued

export interface HelpPositional {
  readonly name: string
  readonly description: string
  readonly required?: boolean
  readonly variadic?: boolean
  readonly aliasOfFlag?: string
}

export interface HelpEnvVar {
  readonly name: string
  readonly description: string
  readonly required?: boolean
  readonly default?: string
  readonly path?: boolean
}

export interface HelpExit {
  readonly code: number
  readonly meaning: string
}

export interface CommandHelp {
  readonly description?: string
  readonly positionals?: readonly HelpPositional[]
  readonly flags?: readonly HelpFlag[]
  readonly mutuallyExclusive?: readonly (readonly string[])[]
  readonly envVars?: readonly HelpEnvVar[]
  readonly exits?: readonly HelpExit[]
  readonly examples?: readonly string[]
}
