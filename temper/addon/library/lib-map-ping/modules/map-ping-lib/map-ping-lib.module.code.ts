import {
  CALLBACK,
  LIB_IDENTIFIER,
  MAP_PING_STATE,
} from "akasha/temper/addon/library/lib-map-ping/modules/map-ping-constants/map-ping-constants.module.code.ts"
import type {
  InternalState,
  Lib,
} from "akasha/temper/addon/library/lib-map-ping/modules/map-ping-types/map-ping-types.module.code.ts"
import { createLogger } from "akasha/temper/addon/log/modules/library-logger/library-logger.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

let NEXT_NAMESPACE_ID = 1

function registerForEvent<T extends unknown[] = unknown[]>(
  this: void,
  event: number,
  callback: (eventCode: number, ...args: T) => void
): string {
  const namespace = LIB_IDENTIFIER + tostring(NEXT_NAMESPACE_ID)
  EVENT_MANAGER.RegisterForEvent<T>(namespace, event, callback)
  NEXT_NAMESPACE_ID = NEXT_NAMESPACE_ID + 1
  return namespace
}

function unregisterForEvent(this: void, namespace: string, event: number): boolean {
  return EVENT_MANAGER.UnregisterForEvent(namespace, event)
}

function registerForUpdate(this: void, interval: number, callback: (this: void) => void): string {
  const namespace = LIB_IDENTIFIER + tostring(NEXT_NAMESPACE_ID)
  EVENT_MANAGER.RegisterForUpdate(namespace, interval, callback)
  NEXT_NAMESPACE_ID = NEXT_NAMESPACE_ID + 1
  return namespace
}

function unregisterForUpdate(this: void, namespace: string): boolean {
  return EVENT_MANAGER.UnregisterForUpdate(namespace)
}

export const INTERNAL: InternalState = {
  callbackObject: ZO_CallbackObject.New(),
  callback: CALLBACK,
  MapPingState: MAP_PING_STATE,
  logger: createLogger(LIB_IDENTIFIER),
  RegisterForEvent: registerForEvent,
  UnregisterForEvent: unregisterForEvent,
  RegisterForUpdate: registerForUpdate,
  UnregisterForUpdate: unregisterForUpdate,
  FireCallbacks(this: InternalState, eventName: string, ...args: unknown[]): undefined {
    this.callbackObject.FireCallbacks(eventName, ...args)
  },
  RegisterCallback(
    this: InternalState,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ): undefined {
    this.callbackObject.RegisterCallback(eventName, callback)
  },
  UnregisterCallback(
    this: InternalState,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ): undefined {
    this.callbackObject.UnregisterCallback(eventName, callback)
  },
}

export const LIB: Lib = {
  internal: INTERNAL,
  MapPingState: MAP_PING_STATE,
  callback: CALLBACK,
} as Lib
