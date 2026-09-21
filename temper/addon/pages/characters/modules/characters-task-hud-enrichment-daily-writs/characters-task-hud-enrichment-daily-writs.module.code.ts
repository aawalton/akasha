import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import {
  reconcileDailyWritStates,
  scanDailyWritJournal,
} from "akasha/temper/addon/pages/characters/modules/characters-daily-writs/characters-daily-writs.module.code.ts"
import { getEsoDayStringFromSec } from "akasha/temper/catalog/world/group-dungeon/modules/eso-reset/eso-reset.module.code.ts"
import {
  DAILY_WRIT_CRAFT_TYPES,
  type DailyWritProfessionState,
  resolveDailyWritProfessionState,
} from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-daily-writs-state/completion-daily-writs-state.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

export interface DailyWritRow {
  readonly label: string
  readonly state: DailyWritProfessionState
}

export function getDailyWritsEnrichmentRows(): readonly DailyWritRow[] {
  const charEntry = currentCharacterEntry()
  const today = getEsoDayStringFromSec(GetTimeStamp())
  const scan =
    charEntry !== undefined ? reconcileDailyWritStates(charEntry) : scanDailyWritJournal()
  const states = charEntry?.dailyWritStates
  return DAILY_WRIT_CRAFT_TYPES.map(
    (c): DailyWritRow => ({
      label: c.label,
      state: resolveDailyWritProfessionState(c.craftType, states, today, scan),
    })
  )
}
