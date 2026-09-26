type TemperCombatSavedVariablesTable = {
  Default?: Record<
    string,
    | Record<
        string,
        { version?: number; Settings?: Record<string, unknown> } & Record<string, unknown>
      >
    | undefined
  >
}

declare var TemperCombat_Save:
  | (TemperCombatSavedVariablesTable & {
      carriedCombatMetricsSettings?: boolean
      carriedCombatMetricsFights?: boolean
    })
  | undefined

declare var TemperCombat_CombatMetricsSave: TemperCombatSavedVariablesTable | undefined

declare var TemperCombat_CombatMetricsFightData:
  | import("akasha/temper/addon/pages/combat/modules/combat-fight-data-types/combat-fight-data-types.module.code.ts").FightDataSVRaw
  | undefined
