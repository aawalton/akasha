import "akasha/temper/addon/type/lib-addon-menu/lib-addon-menu.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-18/eso-enums-18.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { registerExternalTab } from "akasha/temper/addon/pages/characters/modules/characters-tab-manager/characters-tab-manager.module.code.ts"
import { hideWindow } from "akasha/temper/addon/pages/characters/modules/characters-window/characters-window.module.code.ts"
import { initializeCompanionQol } from "akasha/temper/addon/pages/characters/modules/companion-qol-init/companion-qol-init.module.code.ts"
import { refreshAllCompanionData } from "akasha/temper/addon/pages/characters/modules/companions-command/companions-command.module.code.ts"
import { createCompanionEquipmentPanel } from "akasha/temper/addon/pages/characters/modules/companions-equipment-panel/companions-equipment-panel.module.code.ts"
import { refreshCompanionEquipmentPanel } from "akasha/temper/addon/pages/characters/modules/companions-equipment-refresh/companions-equipment-refresh.module.code.ts"
import { registerCompanionEvents } from "akasha/temper/addon/pages/characters/modules/companions-events/companions-events.module.code.ts"
import { installCompanionOverviewRapportOverlay } from "akasha/temper/addon/pages/characters/modules/companions-overview-rapport/companions-overview-rapport.module.code.ts"
import {
  createCompanionPanel,
  refreshCompanionPanel,
} from "akasha/temper/addon/pages/characters/modules/companions-panel/companions-panel.module.code.ts"
import {
  initializeSavedVariables,
  restoreTargetBuildsFromSync,
} from "akasha/temper/addon/pages/characters/modules/companions-saved-variables/companions-saved-variables.module.code.ts"
import { restoreSelectedCompanionId } from "akasha/temper/addon/pages/characters/modules/companions-selector/companions-selector.module.code.ts"
import {
  createCompanionSkillsPanel,
  refreshCompanionSkillsPanel,
} from "akasha/temper/addon/pages/characters/modules/companions-skills-panel/companions-skills-panel.module.code.ts"
import { createCompanionSummaryPanel } from "akasha/temper/addon/pages/characters/modules/companions-summary-panel/companions-summary-panel.module.code.ts"
import { refreshCompanionSummaryPanel } from "akasha/temper/addon/pages/characters/modules/companions-summary-refresh/companions-summary-refresh.module.code.ts"
import { ADDON_NAME } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-addon-constants/completion-addon-constants.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"

function registerCompanionSceneCallbacks(): undefined {
  const companionScenes = [
    "companionCharacterKeyboard",
    "companionSkillsKeyboard",
    "companionCollectionBookKeyboard",
  ]

  const onStateChange = (_oldState: number, newState: number): undefined => {
    if (newState === SCENE_HIDING) {
      hideWindow()
    }
  }

  for (const sceneName of companionScenes) {
    const scene = SCENE_MANAGER.GetScene(sceneName)
    if (scene !== undefined) {
      scene.RegisterCallback("StateChange", onStateChange)
    }
  }
}

export function initializeCompanions(): undefined {
  initializeSavedVariables()
  restoreSelectedCompanionId()
  restoreTargetBuildsFromSync()
  registerCompanionSceneCallbacks()
  installCompanionOverviewRapportOverlay()

  registerExternalTab(
    {
      id: "companion",
      title: "Companion",
      subTabs: [
        { id: "companion-companion", title: "Companion" },
        { id: "companion-summary", title: "Summary" },
        { id: "companion-equipment", title: "Equipment" },
        { id: "companion-skills", title: "Skills" },
      ],
    },
    {
      "companion-companion": createCompanionPanel,
      "companion-summary": createCompanionSummaryPanel,
      "companion-equipment": createCompanionEquipmentPanel,
      "companion-skills": createCompanionSkillsPanel,
    },
    {
      "companion-companion": refreshCompanionPanel,
      "companion-summary": refreshCompanionSummaryPanel,
      "companion-equipment": refreshCompanionEquipmentPanel,
      "companion-skills": refreshCompanionSkillsPanel,
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ADDON_NAME}_CompanionsPlayerActivated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      refreshAllCompanionData()
    }
  )

  registerCompanionEvents()

  initializeCompanionQol()
}
