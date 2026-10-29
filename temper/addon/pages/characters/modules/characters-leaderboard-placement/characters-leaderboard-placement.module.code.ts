import { getCharactersConfig } from "akasha/temper/addon/pages/characters/modules/characters-config/characters-config.module.code.ts"
import { getCompletionKey } from "akasha/temper/addon/pages/characters/modules/characters-task-auto-complete/characters-task-auto-complete.module.code.ts"
import { refreshTaskHud } from "akasha/temper/addon/pages/characters/modules/characters-task-hud/characters-task-hud.module.code.ts"
import {
  getEsoDayStringFromSec,
  getEsoResetTimestampSec,
} from "akasha/temper/catalog/world/group-dungeon/modules/eso-reset/eso-reset.module.code.ts"
import { ADDON_NAME } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-addon-constants/completion-addon-constants.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-enums-16/eso-enums-16.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const LEADERBOARD_PLACEMENT_EVENT = ADDON_NAME + "_LeaderboardPlacement"

const RAID_KIND = "raid"

const ENDLESS_DUNGEON_KIND = "endless-dungeon"

const PLAYER_MEMBER_AT = 4

const noticedNotificationIds = new Set<number>()

function noticeNotificationsAlreadyThere(this: void): undefined {
  let notificationId = GetNextLeaderboardScoreNotificationId(undefined)
  while (notificationId !== undefined) {
    noticedNotificationIds.add(notificationId)
    notificationId = GetNextLeaderboardScoreNotificationId(notificationId)
  }
}

function leaderboardKindOf(contentType: number): string | undefined {
  if (contentType === LEADERBOARD_SCORE_NOTIFICATION_TYPE_RAID) return RAID_KIND
  if (contentType === LEADERBOARD_SCORE_NOTIFICATION_TYPE_ENDLESS_DUNGEON)
    return ENDLESS_DUNGEON_KIND
  return undefined
}

function notificationNamesPlayer(notificationId: number): boolean {
  const [, , , , , numMembers] = GetLeaderboardScoreNotificationInfo(notificationId)
  for (let index = 1; index <= numMembers; index++) {
    if (
      GetLeaderboardScoreNotificationMemberInfo(notificationId, index)[PLAYER_MEMBER_AT] === true
    ) {
      return true
    }
  }
  return false
}

function markPlaced(kind: string): number {
  const cfg = getCharactersConfig()
  const sv = getSavedVariables()
  const nowSec = GetTimeStamp()
  const today = getEsoDayStringFromSec(nowSec)
  const resetTs = getEsoResetTimestampSec(nowSec)

  let marked = 0
  for (const [taskId, task] of Object.entries(cfg.tasks)) {
    const waited = task.leaderboardActivity
    if (waited === undefined || waited.indexOf(kind) < 0) continue
    if (task.dueDate !== undefined && task.dueDate > today) continue

    const key = getCompletionKey(taskId, task)
    const existing = sv.completions[key]
    if (existing !== undefined && existing >= resetTs) continue

    sv.completions[key] = nowSec
    marked++
  }
  return marked
}

function onLeaderboardScoreNotification(this: void): undefined {
  let marked = 0
  let notificationId = GetNextLeaderboardScoreNotificationId(undefined)
  while (notificationId !== undefined) {
    if (!noticedNotificationIds.has(notificationId)) {
      noticedNotificationIds.add(notificationId)
      const [contentType] = GetLeaderboardScoreNotificationInfo(notificationId)
      const kind = leaderboardKindOf(contentType)
      if (kind !== undefined && notificationNamesPlayer(notificationId)) {
        marked += markPlaced(kind)
      }
    }
    notificationId = GetNextLeaderboardScoreNotificationId(notificationId)
  }
  if (marked === 0) return
  d(`[${ADDON_NAME}] Placed on a leaderboard: ${marked} task(s) marked done`)
  refreshTaskHud()
}

export function registerLeaderboardPlacement(): undefined {
  noticeNotificationsAlreadyThere()
  EVENT_MANAGER.RegisterForEvent(
    LEADERBOARD_PLACEMENT_EVENT,
    EVENT_LEADERBOARD_SCORE_NOTIFICATION_ADDED,
    onLeaderboardScoreNotification
  )
}
