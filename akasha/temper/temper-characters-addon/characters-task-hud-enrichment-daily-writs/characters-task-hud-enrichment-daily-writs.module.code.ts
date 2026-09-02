import { getEsoDayStringFromSec } from "@akasha/temper-dungeons/eso-reset"
import {
  DAILY_WRIT_CRAFT_TYPES,
  type DailyWritProfessionState,
  resolveDailyWritProfessionState,
} from "@akasha/temper-player-completion-state/completion-daily-writs-state"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"
import {
  reconcileDailyWritStates,
  scanDailyWritJournal,
} from "../characters-daily-writs/characters-daily-writs.module.code.ts"

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
