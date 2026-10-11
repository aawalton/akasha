interface CompanionsConfigGlobal {
  readonly version: number
  readonly companionTargetBuilds?: Record<number, string>
  readonly companionTargetTimestamps?: Record<number, number>
  readonly companionRapport?: Record<string, Record<number, number>>
}

declare var TemperCharactersCompanionsConfig: CompanionsConfigGlobal | undefined
