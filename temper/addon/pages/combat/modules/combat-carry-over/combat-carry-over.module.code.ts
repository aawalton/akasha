import type { FightDataSVRaw } from "akasha/temper/addon/pages/combat/modules/combat-fight-data-types/combat-fight-data-types.module.code.ts"
import { FIGHT_DATA_VERSION } from "akasha/temper/addon/pages/combat/modules/combat-saved-fights/combat-saved-fights.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-saved-fights-declarations/combat-saved-fights-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-saved-variables-declarations/combat-saved-variables-declarations.type-declaration.d.ts"

const WINDOW_KEYS: readonly (readonly [string, string])[] = [
  ["CombatMetrics_LiveReport", "TemperCombat_LiveReport"],
  ["CombatMetrics_Report", "TemperCombat_Report"],
]

function ownSave(): NonNullable<typeof TemperCombat_Save> {
  const save = globalThis.TemperCombat_Save ?? {}
  globalThis.TemperCombat_Save = save
  return save
}

function carrySettings(): undefined {
  const source = globalThis.TemperCombat_CombatMetricsSave
  if (source === undefined) return undefined
  globalThis.TemperCombat_CombatMetricsSave = undefined

  const save = ownSave()
  if (save.carriedCombatMetricsSettings === true || source.Default === undefined) return undefined

  const ownDefault = save.Default ?? {}
  save.Default = ownDefault

  for (const [account, entries] of pairs(source.Default)) {
    if (entries === undefined) continue
    const ownAccount = ownDefault[account] ?? {}
    ownDefault[account] = ownAccount

    for (const [key, entry] of pairs(entries)) {
      const settings = entry.Settings
      if (settings !== undefined) {
        for (const [upstreamKey, ownKey] of WINDOW_KEYS) {
          if (settings[upstreamKey] !== undefined) {
            settings[ownKey] = settings[upstreamKey]
            delete settings[upstreamKey]
          }
        }
      }
      ownAccount[key] = entry
    }
  }

  save.carriedCombatMetricsSettings = true
  return undefined
}

function carryFights(): undefined {
  const source = globalThis.TemperCombat_CombatMetricsFightData
  if (source === undefined) return undefined
  globalThis.TemperCombat_CombatMetricsFightData = undefined

  const save = ownSave()
  if (save.carriedCombatMetricsFights === true) return undefined

  let own: FightDataSVRaw | undefined = globalThis.TemperCombat_FightData
  if (own === undefined || own.version === undefined) {
    own = []
    own.version = FIGHT_DATA_VERSION
    globalThis.TemperCombat_FightData = own
  }

  for (const fight of source) {
    own.push(fight)
  }

  save.carriedCombatMetricsFights = true
  return undefined
}

export function carryCombatMetricsSavedVariables(): undefined {
  carrySettings()
  carryFights()
  return undefined
}
