import "@akasha/temper-addon-library-types/lib-addon-menu"
import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-api-2"
import "@akasha/temper-eso-types/eso-chat"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-02"
import "@akasha/temper-eso-types/eso-enums-05"
import "@akasha/temper-eso-types/eso-enums-06"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-enums-13"
import "@akasha/temper-eso-types/eso-enums-15"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-18"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-functions-05"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-functions-10"
import "@akasha/temper-eso-types/eso-interface-extra-2"
import "@akasha/temper-eso-types/eso-string-ids"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-language-extensions"
import "../companions-globals/companions-globals.module.code.ts"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { finishPerfTrace, startPerfTrace } from "@akasha/temper-capture-perf/perf-trace"
import { initializeFcoCompanion } from "../companion-qol-init/companion-qol-init.module.code.ts"
import { refreshAllCompanionData } from "../companions-commands/companions-commands.module.code.ts"
import { ADDON_NAME } from "../companions-constants/companions-constants.module.code.ts"
import { createCompanionEquipmentPanel } from "../companions-equipment-panel/companions-equipment-panel.module.code.ts"
import { refreshCompanionEquipmentPanel } from "../companions-equipment-refresh/companions-equipment-refresh.module.code.ts"
import { registerCompanionEvents } from "../companions-events/companions-events.module.code.ts"
import { installCompanionOverviewRapportOverlay } from "../companions-overview-rapport/companions-overview-rapport.module.code.ts"
import { refreshCompanionPanel } from "../companions-panel/companions-panel.module.code.ts"
import {
  getSavedVariables,
  initializeSavedVariables,
  restoreTargetBuildsFromSync,
} from "../companions-saved-variables/companions-saved-variables.module.code.ts"
import { restoreSelectedCompanionId } from "../companions-selector/companions-selector.module.code.ts"
import {
  createCompanionSkillsPanel,
  refreshCompanionSkillsPanel,
} from "../companions-skills-panel/companions-skills-panel.module.code.ts"
import {
  createCompanionSummaryPanel,
  refreshCompanionSummaryPanel,
} from "../companions-summary-panel/companions-summary-panel.module.code.ts"

function registerCompanionSceneCallbacks(): undefined {
  const companionScenes = [
    "companionCharacterKeyboard",
    "companionSkillsKeyboard",
    "companionCollectionBookKeyboard",
  ]

  const onStateChange = (_oldState: number, newState: number): undefined => {
    if (newState === SCENE_HIDING) {
      TemperCharacters.HideWindow()
    }
  }

  for (const sceneName of companionScenes) {
    const scene = SCENE_MANAGER.GetScene(sceneName)
    if (scene !== undefined) {
      scene.RegisterCallback("StateChange", onStateChange)
    }
  }
}

function initialize(): undefined {
  const perfStart = startPerfTrace()
  initializeSavedVariables()
  restoreSelectedCompanionId()
  restoreTargetBuildsFromSync()
  registerCompanionSceneCallbacks()
  installCompanionOverviewRapportOverlay()

  TemperCharacters.TabManager.RegisterExternalTab(
    {
      id: "companion",
      title: "Companion",
      subTabs: [
        { id: "companion-summary", title: "Summary" },
        { id: "companion-equipment", title: "Equipment" },
        { id: "companion-skills", title: "Skills" },
      ],
    },
    {
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
    `${ADDON_NAME}_PlayerActivated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      refreshAllCompanionData()
    }
  )

  registerCompanionEvents()

  getSavedVariables().perf = finishPerfTrace(ADDON_NAME, perfStart)

  initializeFcoCompanion()
}

registerAddonInit(ADDON_NAME, initialize)
