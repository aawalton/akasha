import { getEsoDayStringFromSec } from "@akasha/temper-dungeons/eso-reset"
import { ADDON_NAME } from "@akasha/temper-player-completion-state/completion-addon-constants"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import {
  HIRELING_MAILS_DAILY_TARGET,
  nextHirelingMailCount,
} from "../characters-hireling-mail-count/characters-hireling-mail-count.module.code.ts"
import { scheduleTaskAutoCompletionCheck } from "../characters-task-auto-complete/characters-task-auto-complete.module.code.ts"

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
