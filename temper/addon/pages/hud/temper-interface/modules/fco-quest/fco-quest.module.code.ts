import { STATE } from "akasha/temper/addon/pages/hud/temper-interface/modules/fco-state/fco-state.module.code.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

let questTrackerHeader1: QuestTrackerHeaderControl | undefined
let QUEST_TRACKER_ON_MOVE_HOOKED = false

function questTrackerLoadPosition(this: void, onInit?: boolean): undefined {
  if (questTrackerHeader1 === undefined) {
    return
  }

  const settings = STATE.settingsVars.settings
  if (onInit === true || settings.questTrackerMovable === true) {
    const questTrackerSavedPosition = settings.questTrackerPos
    if (questTrackerSavedPosition.x > -1 && questTrackerSavedPosition.y > -1) {
      questTrackerHeader1.ClearAnchors()
      questTrackerHeader1.SetAnchor(
        TOPLEFT,
        GuiRoot,
        TOPLEFT,
        questTrackerSavedPosition.x,
        questTrackerSavedPosition.y
      )
    }
  }
}

export function questTrackerMovable(this: void, isMovable?: boolean, loadPos?: boolean): undefined {
  const movable = isMovable ?? false
  if (questTrackerHeader1 === undefined) {
    return
  }

  questTrackerHeader1.SetMouseEnabled(movable)
  questTrackerHeader1.SetMovable(movable)

  if (!QUEST_TRACKER_ON_MOVE_HOOKED) {
    let doNotSaveMovedPos = false
    const header = questTrackerHeader1
    header.SetHandler("OnMoveStop", (_questTrackerCtrl: unknown) => {
      if (doNotSaveMovedPos) {
        doNotSaveMovedPos = false
        return
      }
      const settings = STATE.settingsVars.settings
      if (settings.questTrackerMovable === true) {
        const pos = settings.questTrackerPos
        pos.x = header.GetLeft()
        pos.y = header.GetTop()
      }
    })

    ZO_PreHook(FOCUSED_QUEST_TRACKER, "AssistNext", () => {
      doNotSaveMovedPos = true
      return undefined
    })

    CALLBACK_MANAGER.RegisterCallback("QuestTrackerUpdatedOnScreen", () => {
      doNotSaveMovedPos = false
      questTrackerLoadPosition(true)
    })

    SecurePostHook(SCENE_MANAGER, "SetInUIMode", (_self, inUIMode) => {
      if (inUIMode !== true) {
        doNotSaveMovedPos = false
        questTrackerLoadPosition(true)
      }
    })

    QUEST_TRACKER_ON_MOVE_HOOKED = true
  }

  if (loadPos === true) {
    questTrackerLoadPosition()
  }
}

function questTrackerChanges(this: void): undefined {
  questTrackerHeader1 =
    questTrackerHeader1 ?? ZO_FocusedQuestTrackerPanelContainerQuestContainerTrackedHeader1

  questTrackerMovable(STATE.settingsVars.settings.questTrackerMovable === true)
}

export function questChanges(this: void): undefined {
  questTrackerChanges()
  questTrackerLoadPosition(true)
}
