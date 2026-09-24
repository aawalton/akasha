import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/temper-core/temper-errors/modules/errors-addon-limits/errors-addon-limits.module.code.ts"
import { captureError } from "akasha/temper/addon/pages/temper-core/temper-errors/modules/errors-addon-record/errors-addon-record.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const PRE_INIT_LUA_ERROR_NS = `${ADDON_NAME}_PreInitLuaError`
const LIVE_LUA_ERROR_NS = `${ADDON_NAME}_LuaError`

interface BufferedRaw {
  eventCode: number
  errorString: unknown
  errorCode?: number
}

const BUFFERED: BufferedRaw[] = []

function bufferOne(
  this: void,
  eventCode: number,
  errorString: string,
  errorCode: number
): undefined {
  BUFFERED[BUFFERED.length] = { eventCode, errorString, errorCode }
}

function captureOne(
  this: void,
  eventCode: number,
  errorString: string,
  errorCode: number
): undefined {
  pcall(captureError, eventCode, errorString, errorCode)
}

export function registerPreInitHooks(): undefined {
  EVENT_MANAGER.RegisterForEvent(PRE_INIT_LUA_ERROR_NS, EVENT_LUA_ERROR, bufferOne)
}

export function unregisterPreInitHooks(): undefined {
  EVENT_MANAGER.UnregisterForEvent(PRE_INIT_LUA_ERROR_NS, EVENT_LUA_ERROR)
}

export function flushBuffered(): undefined {
  for (const one of BUFFERED) {
    pcall(captureError, one.eventCode, one.errorString, one.errorCode)
  }
  BUFFERED.splice(0, BUFFERED.length)
}

export function registerErrorHooks(): undefined {
  EVENT_MANAGER.RegisterForEvent(LIVE_LUA_ERROR_NS, EVENT_LUA_ERROR, captureOne)
}
