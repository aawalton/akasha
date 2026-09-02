import { CONSOLE_STATE } from "../skyshards-console-state/skyshards-console-state.module.code.ts"
import { getAchievementIDs } from "../skyshards-data-accessors/skyshards-data-accessors.module.code.ts"

const GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND = "|cffffff<<1>>|r"
const GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND_SSP = "|cffffff<<1>>/<<2>>|r"
const GAMEPAD_SKYSHARD_SKILLSPANEL_FORMAT_DETAILED = "|cffffff<<1>>/<<2>>|r"

let SSP = false

export function setSSP(this: void, value: boolean): undefined {
  SSP = value
}

const SOUL_SHRIVEN_QUEST_ID = 4296

export function getNumFoundSkyShards(this: void): undefined {
  CONSOLE_STATE.collectedSkyShards = 0
  CONSOLE_STATE.totalSkyShards = 1

  const ids = getAchievementIDs()
  for (const [achievementId] of pairs(ids)) {
    const zoneId = GetSkyshardAchievementZoneId(achievementId)
    const numSkyshards = GetNumSkyshardsInZone(zoneId)
    CONSOLE_STATE.totalSkyShards = CONSOLE_STATE.totalSkyShards + numSkyshards
    for (const skyshardIndex of $range(1, numSkyshards)) {
      const skyshardId = GetZoneSkyshardId(zoneId, skyshardIndex)
      const completed = GetSkyshardDiscoveryStatus(skyshardId)
      if (completed === SKYSHARD_DISCOVERY_STATUS_ACQUIRED) {
        CONSOLE_STATE.collectedSkyShards = CONSOLE_STATE.collectedSkyShards + 1
      }
    }
  }

  if (HasCompletedQuest(SOUL_SHRIVEN_QUEST_ID)) {
    CONSOLE_STATE.collectedSkyShards = CONSOLE_STATE.collectedSkyShards + 1
  }
}

function postHookRefreshPointsDisplay(this: void, self: GamepadSkillsScene): undefined {
  getNumFoundSkyShards()
  const availablePoints = SKILL_POINT_ALLOCATION_MANAGER.GetAvailableSkillPoints()

  let skillPointsLabel = zo_strformat(GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND, availablePoints)
  if (SSP) {
    skillPointsLabel = zo_strformat(
      GAMEPAD_SKYSHARD_SKILLPOINTS_TO_SPEND_SSP,
      availablePoints,
      SKILL_POINT_ALLOCATION_MANAGER.GetTotalNumSkillPoints()
    )
  }
  self.headerData.data1Text = skillPointsLabel

  const skyshardsLabel = zo_strformat(
    GAMEPAD_SKYSHARD_SKILLSPANEL_FORMAT_DETAILED,
    CONSOLE_STATE.collectedSkyShards,
    CONSOLE_STATE.totalSkyShards
  )
  self.headerData.data2Text = skyshardsLabel
  ZO_GamepadGenericHeader_RefreshData(self.header, self.headerData)
}

export function alterSkyShardsIndicator(this: void): undefined {
  getNumFoundSkyShards()
  ZO_PostHook(GAMEPAD_SKILLS, "RefreshPointsDisplay", postHookRefreshPointsDisplay)
}
