interface LscAutoCompleteProvider {
  SetLists: (this: LscAutoCompleteProvider, results: object, lookup: object) => void
  SetPrefix: (this: LscAutoCompleteProvider, prefix: string) => void
  GetResultList: (this: LscAutoCompleteProvider) => object
  GetResultFromLabel: (this: LscAutoCompleteProvider, label: string) => string
  CanComplete: (this: LscAutoCompleteProvider, token: string) => boolean
  [key: string]: unknown
}

interface LscAutoCompleteProviderClass {
  Subclass: (this: LscAutoCompleteProviderClass) => LscAutoCompleteProviderClass
  New: (this: void, parent: object) => LscAutoCompleteProvider
  [key: string]: unknown
}

interface LscCommand {
  ShouldAutoComplete: (this: LscCommand, token: string) => boolean
  SetAutoComplete: (this: LscCommand, provider: LscAutoCompleteProvider) => void
  GetAutoCompleteResultFromDisplayText: (this: LscCommand, text: string) => string
  subCommandAliases: object
  [key: string]: unknown
}

interface LscCommandClass {
  New: (this: LscCommandClass) => LscCommand
  [key: string]: unknown
}

interface LibSlashCommander {
  Register: ((
    this: LibSlashCommander,
    alias: string,
    callback: (this: void) => void,
    description: string
  ) => LscCommand) &
    ((
      this: LibSlashCommander,
      slash: string,
      callback: (this: void, arg: string) => void,
      description: string
    ) => LscRegisteredCommand)
  GenerateLabel: (this: LibSlashCommander, alias: string, description: string) => string
  AutoCompleteProvider: LscAutoCompleteProviderClass
  Command: LscCommandClass
  GetCurrentCommandAndToken: (
    this: void,
    command: LscCommand,
    text: string
  ) => LuaMultiReturn<[command: LscCommand | undefined, token: string]>
  IsCommand: (this: void, command: unknown) => boolean
  currentCommand: LscCommand | undefined
  lastInput: string | undefined
  hasCustomResults: LscCommand | undefined
}
