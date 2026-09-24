import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { refreshActivePanel } from "akasha/temper/addon/pages/characters/modules/characters-tab-manager/characters-tab-manager.module.code.ts"
import { applySkills } from "akasha/temper/addon/pages/characters/modules/companions-apply-build/companions-apply-build.module.code.ts"
import { decodeCompanionBuild } from "akasha/temper/addon/pages/characters/modules/companions-decoder/companions-decoder.module.code.ts"
import { notifyCompanionRapportChange } from "akasha/temper/addon/pages/characters/modules/companions-overview-rapport/companions-overview-rapport.module.code.ts"
import {
  addCompanionSkillLine,
  collectCompanionProgress,
  handleCompanionRapportUpdate,
  refreshAllCompanionSkillLines,
  updateCompanionExperience,
  updateCompanionSkillLine,
} from "akasha/temper/addon/pages/characters/modules/companions-progress/companions-progress.module.code.ts"
import {
  captureAndSaveActiveCompanionBuild,
  setSelectedCompanionId,
} from "akasha/temper/addon/pages/characters/modules/companions-selector/companions-selector.module.code.ts"
import { getTargetBuildHash } from "akasha/temper/addon/pages/characters/modules/companions-target-build-input/companions-target-build-input.module.code.ts"
import { ADDON_NAME } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-addon-constants/completion-addon-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-items-global/temper-items-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
export function registerCompanionEvents(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionActivated",
    EVENT_COMPANION_ACTIVATED,
    function (this: void): undefined {
      captureAndSaveActiveCompanionBuild()
      collectCompanionProgress()
      const companionId = GetActiveCompanionDefId()
      setSelectedCompanionId(companionId)

      const automation = TemperItems?.getSavedVariables()?.automation
      const companionToggles = automation?.companions?.[tostring(companionId)]
      if (companionToggles?.skills) {
        const hash = getTargetBuildHash(companionId)
        if (hash !== undefined) {
          const build = decodeCompanionBuild(hash)
          if (build !== undefined) {
            zo_callLater(() => {
              if (
                HasActiveCompanion() &&
                GetActiveCompanionDefId() === companionId &&
                !IsUnitInCombat("player")
              ) {
                applySkills(build)
              }
            }, 1500)
          }
        }
      }
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionDeactivated",
    EVENT_COMPANION_DEACTIVATED,
    function (this: void): undefined {
      refreshActivePanel()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionXP",
    EVENT_COMPANION_EXPERIENCE_GAIN,
    function (
      this: void,
      _event: number,
      _companionId: number,
      level: number,
      _prevXP: number,
      currentXP: number
    ): undefined {
      updateCompanionExperience(level, currentXP)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionRapport",
    EVENT_COMPANION_RAPPORT_UPDATE,
    function (
      this: void,
      _event: number,
      companionId: number,
      prevRapport: number,
      currentRapport: number
    ): undefined {
      handleCompanionRapportUpdate(currentRapport)
      notifyCompanionRapportChange(companionId, prevRapport, currentRapport)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionSkillXP",
    EVENT_COMPANION_SKILL_XP_UPDATE,
    function (this: void, _event: number, skillLineId: number): undefined {
      updateCompanionSkillLine(skillLineId)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionSkillRank",
    EVENT_COMPANION_SKILL_RANK_UPDATE,
    function (this: void, _event: number, skillLineId: number): undefined {
      updateCompanionSkillLine(skillLineId)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionSkillLineAdded",
    EVENT_COMPANION_SKILL_LINE_ADDED,
    function (this: void, _event: number, skillLineId: number): undefined {
      addCompanionSkillLine(skillLineId)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CompanionSkillsFullUpdate",
    EVENT_COMPANION_SKILLS_FULL_UPDATE,
    function (this: void): undefined {
      refreshAllCompanionSkillLines()
    }
  )
}
