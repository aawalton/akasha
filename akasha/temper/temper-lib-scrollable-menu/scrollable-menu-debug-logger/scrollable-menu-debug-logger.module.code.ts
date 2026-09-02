import {
  asLibDebugLoggerGlobal,
  asLibDebugLoggerInstance,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastThisVoidArgsUnknownUndefined } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asString } from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"
import { DEBUG_LOG_MESSAGE_PATTERNS } from "../scrollable-menu-debug-log-message-patterns/scrollable-menu-debug-log-message-patterns.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const MAJOR = lib.name

let LDL: LibDebugLoggerGlobal = asLibDebugLoggerGlobal(LibDebugLogger)

const sfor = string.format

const libDebug = lib.Debug

let logger: LibDebugLoggerInstance | undefined
const debugPrefix = lib.Debug.prefix

const LSM_LOGTYPE_DEBUG = libDebug.LSM_LOGTYPE_DEBUG
const LSM_LOGTYPE_VERBOSE = libDebug.LSM_LOGTYPE_VERBOSE
const LSM_LOGTYPE_DEBUG_CALLBACK = libDebug.LSM_LOGTYPE_DEBUG_CALLBACK
const LSM_LOGTYPE_INFO = libDebug.LSM_LOGTYPE_INFO
const LSM_LOGTYPE_ERROR = libDebug.LSM_LOGTYPE_ERROR

const LOGGER_TYPE_TO_NAME = libDebug.loggerTypeToName

function loadLogger(this: void): undefined {
  LDL = LDL ?? asLibDebugLoggerGlobal(LibDebugLogger)
  if (lib.logger === undefined && LDL !== undefined) {
    logger = LDL(MAJOR)
    logger.SetEnabled(true)
    logger.Debug("Library loaded")
    logger.verbose = logger.Create("Verbose")
    logger.verbose.SetEnabled(false)

    logger.callbacksFired = logger.Create("Callbacks")

    lib.Debug.logger = logger
  }
}
libDebug.LoadLogger = loadLogger

loadLogger()

export function dlog(
  this: void,
  debugType: number | undefined,
  textId: number | undefined,
  ...args: unknown[]
): undefined {
  if (lib.doDebug === undefined || lib.doDebug === false || textId === undefined) {
    return
  }
  debugType = debugType ?? LSM_LOGTYPE_DEBUG

  let debugText: string | undefined = DEBUG_LOG_MESSAGE_PATTERNS[textId]
  const [packedArgs] = select(1, args)
  if (args[0] !== undefined && packedArgs !== undefined) {
    debugText = sfor(asString(debugText), ...args)
  }
  if (debugText === undefined || debugText === "") {
    return
  }

  if (LDL !== undefined) {
    if (debugType === LSM_LOGTYPE_DEBUG_CALLBACK) {
      asLibDebugLoggerInstance(logger).callbacksFired.Debug(debugText)
    } else if (debugType === LSM_LOGTYPE_DEBUG) {
      asLibDebugLoggerInstance(logger).Debug(debugText)
    } else if (debugType === LSM_LOGTYPE_VERBOSE) {
      if (lib.doVerboseDebug === true) {
        const loggerVerbose = asLibDebugLoggerInstance(logger).verbose
        if (loggerVerbose !== undefined && loggerVerbose.isEnabled === true) {
          loggerVerbose.Verbose(debugText)
        }
      }
    } else if (debugType === LSM_LOGTYPE_INFO) {
      asLibDebugLoggerInstance(logger).Info(debugText)
    } else if (debugType === LSM_LOGTYPE_ERROR) {
      asLibDebugLoggerInstance(logger).Error(debugText)
    }
  } else {
    if (debugType !== LSM_LOGTYPE_VERBOSE) {
      const debugTypePrefix = LOGGER_TYPE_TO_NAME[debugType] ?? ""
      d(debugPrefix + debugTypePrefix + debugText)
    }
  }
}
libDebug.DebugLog = asLsmCastThisVoidArgsUnknownUndefined(dlog)
