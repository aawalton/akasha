import { ADDON_NAME } from "akasha/temper/addon/pages/world/modules/world-names/world-names.module.code.ts"
import {
  keepLast,
  PORT_TRACE_CAP,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-capture/quest-port-capture.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/world/quests/modules/quests-saved-variables/quests-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-3/eso-api-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-keybindings/eso-keybindings.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"

const EVENT_NAMESPACE = ADDON_NAME + "QuestPortKeyOwners"

const CYCLE_ACTION = "ASSIST_NEXT_TRACKED_QUEST"

const ACTIVATED_DELAY_MS = 3000

interface KeyBindingReading {
  readonly layer: string
  readonly category: string
  readonly action: string
  readonly bindingIndex: number
  readonly keyCode: number
  readonly mod1: number
  readonly mod2: number
  readonly mod3: number
  readonly mod4: number
}

interface LayerAction {
  readonly layer: string
  readonly action: string
}

export interface KeyOwnersEntry {
  at: number
  character: string
  occasion: string
  scene?: string
  baseScene?: boolean
  activeLayers?: string[]
  actionsOnKey?: LayerAction[]
  onKey?: KeyBindingReading[]
  cycleBindings?: KeyBindingReading[]
}

function attempt<T>(this: void, read: () => T): T | undefined {
  try {
    return read()
  } catch {
    return undefined
  }
}

interface Bindings {
  readonly onKey: KeyBindingReading[]
  readonly cycleBindings: KeyBindingReading[]
}

function bindingsOf(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number,
  found: Bindings
): undefined {
  const [layer] = GetActionLayerInfo(layerIndex)
  const [category] = GetActionLayerCategoryInfo(layerIndex, categoryIndex)
  const [action] = GetActionInfo(layerIndex, categoryIndex, actionIndex)
  const maxBindings = GetMaxBindingsPerAction()
  for (let bindingIndex = 1; bindingIndex <= maxBindings; bindingIndex++) {
    const [keyCode, mod1, mod2, mod3, mod4] = GetActionBindingInfo(
      layerIndex,
      categoryIndex,
      actionIndex,
      bindingIndex
    )
    if (keyCode === 0) continue
    const reading = { layer, category, action, bindingIndex, keyCode, mod1, mod2, mod3, mod4 }
    if (keyCode === KEY_T) found.onKey.push(reading)
    if (action === CYCLE_ACTION) found.cycleBindings.push(reading)
  }
  return undefined
}

function everyBinding(this: void): Bindings {
  const found: Bindings = { onKey: [], cycleBindings: [] }
  for (let layerIndex = 1; layerIndex <= GetNumActionLayers(); layerIndex++) {
    const [, numCategories] = GetActionLayerInfo(layerIndex)
    for (let categoryIndex = 1; categoryIndex <= numCategories; categoryIndex++) {
      const [, numActions] = GetActionLayerCategoryInfo(layerIndex, categoryIndex)
      for (let actionIndex = 1; actionIndex <= numActions; actionIndex++) {
        attempt(() => bindingsOf(layerIndex, categoryIndex, actionIndex, found))
      }
    }
  }
  return found
}

function activeLayers(this: void): string[] {
  const names: string[] = []
  for (let active = 1; active <= GetNumActiveActionLayers(); active++) {
    const layerIndex = GetActiveActionLayerIndex(active)
    if (layerIndex !== undefined) names.push(GetActionLayerNameByIndex(layerIndex))
  }
  return names
}

function actionsOnKey(this: void, layers: readonly string[]): LayerAction[] {
  const actions: LayerAction[] = []
  for (const layer of layers) {
    const action = attempt(() => GetActionNameFromKey(layer, KEY_T))
    if (action !== undefined && action !== "") actions.push({ layer, action })
  }
  return actions
}

export function noteKeyOwners(this: void, occasion: string): undefined {
  try {
    const entry: KeyOwnersEntry = {
      at: GetTimeStamp(),
      character: zo_strformat("<<1>>", GetUnitName("player")),
      occasion,
    }
    entry.scene = attempt(() => SCENE_MANAGER.GetCurrentSceneName())
    entry.baseScene = attempt(() => SCENE_MANAGER.IsShowingBaseScene())
    entry.activeLayers = attempt(activeLayers)
    entry.actionsOnKey = attempt(() => actionsOnKey(entry.activeLayers ?? []))
    const bindings = attempt(everyBinding)
    entry.onKey = bindings?.onKey
    entry.cycleBindings = bindings?.cycleBindings
    const sv = getSavedVariables()
    sv.keyOwnersTrace = keepLast(sv.keyOwnersTrace ?? [], entry, PORT_TRACE_CAP)
  } catch {
    return undefined
  }
  return undefined
}

export function initQuestPortKeyOwners(this: void): undefined {
  try {
    EVENT_MANAGER.RegisterForEvent(EVENT_NAMESPACE, EVENT_PLAYER_ACTIVATED, () => {
      zo_callLater(() => noteKeyOwners("activated"), ACTIVATED_DELAY_MS)
    })
    ZO_PreHook(FOCUSED_QUEST_TRACKER, "AssistNext", (): undefined => {
      noteKeyOwners("next-quest")
      return undefined
    })
  } catch {
    return undefined
  }
  return undefined
}
