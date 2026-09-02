declare const TemperWrit_AutoQuest: ((this: void) => void) | undefined

interface LscSubCommand {
  AddAlias: (this: LscSubCommand, alias: string) => void
  SetCallback: (this: LscSubCommand, callback: (this: void) => void) => void
  SetDescription: (this: LscSubCommand, description: string) => void
}

interface LscRegisteredCommand {
  RegisterSubCommand: (this: LscRegisteredCommand) => LscSubCommand
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
}
