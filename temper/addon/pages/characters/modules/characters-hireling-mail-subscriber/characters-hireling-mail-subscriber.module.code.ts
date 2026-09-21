import {
  HIRELING_MAILS_DAILY_TARGET,
  nextHirelingMailCount,
} from "akasha/temper/addon/pages/characters/modules/characters-hireling-mail-count/characters-hireling-mail-count.module.code.ts"
import { scheduleTaskAutoCompletionCheck } from "akasha/temper/addon/pages/characters/modules/characters-task-auto-complete/characters-task-auto-complete.module.code.ts"
import { getEsoDayStringFromSec } from "akasha/temper/catalog/world/group-dungeon/modules/eso-reset/eso-reset.module.code.ts"
import { ADDON_NAME } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-addon-constants/completion-addon-constants.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const HIRELING_MAIL_LOOTED_CALLBACK = "Temper_HirelingMailLooted"

function onHirelingMailLooted(this: void, delta: unknown): undefined {
  if (typeof delta !== "number" || delta <= 0) return
  const sv = getSavedVariables()
  const today = getEsoDayStringFromSec(GetTimeStamp())
  sv.hirelingMails = nextHirelingMailCount(sv.hirelingMails, today, delta)
  d(`[${ADDON_NAME}] Hireling mail ${sv.hirelingMails.count}/${HIRELING_MAILS_DAILY_TARGET} today`)
  scheduleTaskAutoCompletionCheck()
}

export function registerHirelingMailSubscriber(): undefined {
  CALLBACK_MANAGER.RegisterCallback(HIRELING_MAIL_LOOTED_CALLBACK, onHirelingMailLooted)
}
