export const HELP_FLAGS: readonly string[] = ["--help", "-h"]

export const VERSION_FLAG = "--version"

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

export type VerdictDisposition = "emits"

export type ReadingDisposition = "emits"

export type Irreversibility = "irreversible"

export interface CommandHelp {
  readonly description?: string
  readonly verdict?: VerdictDisposition
  readonly reading?: ReadingDisposition
  readonly irreversible?: Irreversibility
  readonly positionals?: readonly HelpPositional[]
  readonly flags?: readonly HelpFlag[]
  readonly mutuallyExclusive?: readonly (readonly string[])[]
  readonly envVars?: readonly HelpEnvVar[]
  readonly exits?: readonly HelpExit[]
  readonly examples?: readonly string[]
  readonly epilog?: string | (() => string | Promise<string>)
}

export interface CommandModule {
  readonly default: (args: readonly string[]) => Promise<void>
  readonly help?: CommandHelp
}

export interface CommandDocument {
  readonly slug: string
  readonly path: readonly string[]
  readonly entryFile: string
  readonly summary: string
  readonly help?: string
}

export interface Command {
  readonly path: readonly string[]
  readonly summary: string
  readonly load: () => Promise<CommandModule>
  readonly source?: string
  readonly document?: CommandDocument
}
