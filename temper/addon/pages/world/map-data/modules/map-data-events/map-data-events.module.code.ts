import {
  buildAllTables,
  getPlayerPos,
} from "akasha/temper/addon/pages/world/map-data/modules/map-data-build-tables/map-data-build-tables.module.code.ts"
import { LIB_IDENTIFIER } from "akasha/temper/addon/pages/world/map-data/modules/map-data-constants/map-data-constants.module.code.ts"
import {
  INTERNAL,
  LIB,
} from "akasha/temper/addon/pages/world/map-data/modules/map-data-lib-state/map-data-lib-state.module.code.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-reticle-interaction/eso-reticle-interaction.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-pins/eso-world-map-pins.type-declaration.d.ts"

export function initEvents(this: void): undefined {
  const approvedInteractionTypes: Record<string, boolean> = {}
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE1)] = true
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE5)] = true
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE13)] = true
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE6)] = true
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE10)] = true
  approvedInteractionTypes[GetString(SI_GAMECAMERAACTIONTYPE15)] = true

  ZO_PreHook(ZO_Reticle, "TryHandlingInteraction", function (this: void): undefined {
    if (IsGameCameraActive() && !IsGameCameraUIModeActive()) {
      const [action, name, interactBlocked] = GetGameCameraInteractableActionInfo()
      const validInteraction = action === undefined ? undefined : approvedInteractionTypes[action]
      if (name !== undefined && validInteraction === true && !interactBlocked) {
        LIB.reticleInteractionName = name
      } else if (validInteraction !== true) {
        LIB.reticleInteractionName = undefined
      }
    }
  })

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnPrepareForJump`,
    EVENT_PREPARE_FOR_JUMP,
    function (this: void): undefined {
      LIB.reticleInteractionName = undefined
      LIB.lastInteractionTarget = undefined
      LIB.onPrepareForJumpInProgress = true
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_zone_changed`,
    EVENT_ZONE_CHANGED,
    function (
      this: void,
      _eventCode: number,
      _zoneName: string,
      _subZoneName: string,
      newSubzone: boolean,
      _zoneId: number,
      subZoneId: number
    ): undefined {
      LIB.reticleInteractionName = undefined
      LIB.lastInteractionTarget = undefined
      LIB.newSubzone = newSubzone
      LIB.subZoneId = subZoneId
      INTERNAL.SetUpSetPlayerLocationQueue()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnWorldPositionChanged`,
    EVENT_LINKED_WORLD_POSITION_CHANGED,
    function (this: void): undefined {
      LIB.reticleInteractionName = undefined
      LIB.lastInteractionTarget = undefined
      INTERNAL.SetUpSetPlayerLocationQueue()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_activated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void, _eventCode: number, initial: boolean): undefined {
      if (!initial) {
        LIB.reticleInteractionName = undefined
        LIB.lastInteractionTarget = undefined
      }
      LIB.onPrepareForJumpInProgress = false
      LIB.onAddonLoadInProgress = false
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnPlayerDeactivated`,
    EVENT_PLAYER_DEACTIVATED,
    function (this: void): undefined {
      LIB.reticleInteractionName = undefined
      LIB.lastInteractionTarget = undefined
    }
  )

  CALLBACK_MANAGER.RegisterCallback("OnWorldMapChanged", function (this: void): undefined {
    LIB.SetMapToPlayerLocationQueueStart = 0
    LIB.setMapToPlayerLocationQueueInProgress = false
    LIB.lastMapId = LIB.mapId
    LIB.lastMapTexture = LIB.mapTexture
    INTERNAL.UpdateMapInfo()
    INTERNAL.SetWasSetMapToPlayerLocationCalledFalse()
    INTERNAL.MapTextureMapIdUpdated()
  })

  WORLD_MAP_SCENE.RegisterCallback(
    "StateChange",
    function (this: void, _oldState: number, newState: number): undefined {
      LIB.SetMapToPlayerLocationQueueStart = 0
      LIB.setMapToPlayerLocationQueueInProgress = false
      if (newState === SCENE_HIDDEN) {
        INTERNAL.SetWasSetMapToPlayerLocationCalledFalse()
      }
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnInteract`,
    EVENT_CLIENT_INTERACT_RESULT,
    function (
      this: void,
      _eventCode: number,
      _result: number,
      interactTargetName: string
    ): undefined {
      const text = zo_strformat(SI_CHAT_MESSAGE_FORMATTER, interactTargetName)
      LIB.lastInteractionTarget = text
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${LIB_IDENTIFIER}_OnQuestSharred`,
    EVENT_QUEST_SHARED,
    function (this: void): undefined {
      LIB.reticleInteractionName = undefined
      LIB.lastInteractionTarget = undefined
      LIB.questShared = true
    }
  )
}

export function onAddOnLoaded(this: void): undefined {
  INTERNAL.dm("Debug", "OnAddOnLoaded")

  SLASH_COMMANDS["/tempermappos"] = (_command: string): undefined => {
    getPlayerPos()
  }

  buildAllTables()

  INTERNAL.UpdateMapInfo()
  if (LIB.lastMapTexture === undefined) LIB.lastMapTexture = LIB.mapTexture
  if (LIB.lastMapId === undefined) LIB.lastMapId = LIB.mapId
  LIB.newSubzone = false
  LIB.setMapToPlayerLocationQueueInProgress = false
}
