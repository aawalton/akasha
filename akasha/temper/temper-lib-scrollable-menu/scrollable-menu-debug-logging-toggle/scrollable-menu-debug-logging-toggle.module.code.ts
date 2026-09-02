import { asLibDebugLoggerInstance } from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastThisVoidArgsUnknownUndefined } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { dlog } from "../scrollable-menu-debug-logger/scrollable-menu-debug-logger.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const tos = tostring

const libDebug = lib.Debug

let libDebugMut = lib.Debug

function initDebugLogging(this: void): boolean {
  if (lib.Debug === undefined) {
    return false
  }
  libDebugMut = lib.Debug
  if (libDebugMut.LoadLogger === undefined) {
    return false
  }
  libDebugMut.LoadLogger()
  return true
}

function debugLoggingToggle(this: void, debugType: string): undefined {
  if (!initDebugLogging()) {
    return
  }

  if (debugType === "debug") {
    lib.Debug.doDebug = !lib.Debug.doDebug
    libDebugMut = lib.Debug
    if (libDebugMut.logger !== undefined) {
      asLibDebugLoggerInstance(libDebugMut.logger).SetEnabled(libDebugMut.doDebug)
    }
    if (libDebugMut.doDebug) {
      dlog(libDebugMut.LSM_LOGTYPE_DEBUG, 176, tos(libDebugMut.doDebug ? "ON" : "OFF"))
    }
  } else if (debugType === "debugVerbose") {
    lib.Debug.doVerboseDebug = !lib.Debug.doVerboseDebug
    libDebugMut = lib.Debug
    if (
      libDebugMut.logger !== undefined &&
      asLibDebugLoggerInstance(libDebugMut.logger).verbose !== undefined
    ) {
      asLibDebugLoggerInstance(libDebugMut.logger).verbose.SetEnabled(libDebugMut.doVerboseDebug)
      if (libDebugMut.doDebug) {
        dlog(
          libDebugMut.LSM_LOGTYPE_DEBUG,
          177,
          tos(libDebugMut.doVerboseDebug ? "ON" : "OFF"),
          tos(libDebugMut.doDebug ? "ON" : "OFF")
        )
      }
    }
  }
}
libDebug.debugLoggingToggle = asLsmCastThisVoidArgsUnknownUndefined(debugLoggingToggle)
