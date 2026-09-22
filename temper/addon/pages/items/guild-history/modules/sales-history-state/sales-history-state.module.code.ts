import {
  asCallbackObject,
  asHistoryHandle,
  asHistoryInternal,
  asLogger,
} from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-casts/sales-history-casts.module.code.ts"
import {
  CALLBACK,
  LIB_IDENTIFIER,
  REQUEST_MODE_AUTO,
  REQUEST_MODE_OFF,
  REQUEST_MODE_ON,
  STOP_REASON_ITERATION_COMPLETED,
  STOP_REASON_LAST_CACHED_EVENT_REACHED,
  STOP_REASON_MANAGED_RANGE_LOST,
  STOP_REASON_MANUAL_STOP,
  ZOOM_MODE_AUTO,
  ZOOM_MODE_FULL_RANGE,
  ZOOM_MODE_MISSING_RANGE,
} from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-constants/sales-history-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-debug-logger-global/temper-debug-logger-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

const callbackObject = asCallbackObject(ZO_CallbackObject.New())
if (TemperDebugLogger === undefined) {
  error(`${LIB_IDENTIFIER} requires LibDebugLogger`)
}
const logger = asLogger(TemperDebugLogger(LIB_IDENTIFIER))

const NAMESPACE_COUNTER = { next: 1 }

type EventManagerEventCallback = (this: void, eventCode: number, ...args: never[]) => void
function asEventManagerEventCallback(value: (...args: never[]) => void): EventManagerEventCallback {
  return value as EventManagerEventCallback
}

function registerForEvent(this: void, event: number, callback: (...args: never[]) => void): string {
  const namespace = LIB_IDENTIFIER + tostring(NAMESPACE_COUNTER.next)
  EVENT_MANAGER.RegisterForEvent(namespace, event, asEventManagerEventCallback(callback))
  NAMESPACE_COUNTER.next = NAMESPACE_COUNTER.next + 1
  return namespace
}

function unregisterForEvent(this: void, namespace: string, event: number): boolean {
  return EVENT_MANAGER.UnregisterForEvent(namespace, event)
}

function registerForUpdate(
  this: void,
  interval: number,
  callback: (...args: never[]) => void
): string {
  const namespace = LIB_IDENTIFIER + tostring(NAMESPACE_COUNTER.next)
  EVENT_MANAGER.RegisterForUpdate(namespace, interval, callback)
  NAMESPACE_COUNTER.next = NAMESPACE_COUNTER.next + 1
  return namespace
}

function unregisterForUpdate(this: void, namespace: string): boolean {
  return EVENT_MANAGER.UnregisterForUpdate(namespace)
}

export const internal = asHistoryInternal({
  callbackObject,
  callback: CALLBACK,
  class: {},
  logger,
  RegisterForEvent: registerForEvent,
  UnregisterForEvent: unregisterForEvent,
  RegisterForUpdate: registerForUpdate,
  UnregisterForUpdate: unregisterForUpdate,
  UI_LOAD_TIME: GetTimeStamp(),
  WORLD_NAME: GetWorldName(),
  REQUEST_MODE_AUTO,
  REQUEST_MODE_OFF,
  REQUEST_MODE_ON,
  ZOOM_MODE_AUTO,
  ZOOM_MODE_FULL_RANGE,
  ZOOM_MODE_MISSING_RANGE,
  STOP_REASON_MANUAL_STOP,
  STOP_REASON_LAST_CACHED_EVENT_REACHED,
  STOP_REASON_ITERATION_COMPLETED,
  STOP_REASON_MANAGED_RANGE_LOST,
})

export const lib = asHistoryHandle({ internal })

internal.FireCallbacks = function (this, ...args: unknown[]): undefined {
  callbackObject.FireCallbacks(...args)
}
internal.RegisterCallback = function (this, ...args: unknown[]): undefined {
  callbackObject.RegisterCallback(...args)
}
internal.UnregisterCallback = function (this, ...args: unknown[]): undefined {
  callbackObject.UnregisterCallback(...args)
}
