import {
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_ERROR,
  LOG_LEVEL_INFO,
  LOG_LEVEL_VERBOSE,
  LOG_LEVEL_WARNING,
} from "../debug-logger-constants/debug-logger-constants.module.code.ts"
import { INTERNAL } from "../debug-logger-state/debug-logger-state.module.code.ts"
import type {
  LoggerClass,
  LoggerInstance,
} from "../debug-logger-types/debug-logger-types.module.code.ts"

const SUB_LOGGER_TAG_TEMPLATE = "%s/%s"

const Logger = ZO_Object.Subclass<LoggerClass>()

Logger.New = function (this: LoggerClass, tag: string): LoggerInstance {
  const obj = ZO_Object.New<LoggerInstance>(this)
  obj.Initialize(tag)
  return obj
}

Logger.Initialize = function (this: LoggerInstance, tag: string): undefined {
  if (!(type(tag) === "string" && tag !== "")) {
    error("Invalid tag for logger")
  }
  INTERNAL.logPerformance("logger", tag)
  this.enabled = true
  this.tag = tag
  this.originalTag = tag
  this.minLevelOverride = undefined
  this.logTracesOverride = undefined
}

Logger.Create = function (this: LoggerInstance, tag: string): LoggerInstance {
  return Logger.New(string.format(SUB_LOGGER_TAG_TEMPLATE, this.originalTag, tag))
}

Logger.SetSubTag = function (this: LoggerInstance, tag?: string): undefined {
  if (tag === undefined || tag === "") {
    this.tag = this.originalTag
  } else {
    this.tag = string.format(SUB_LOGGER_TAG_TEMPLATE, this.originalTag, tag)
  }
}

Logger.SetEnabled = function (this: LoggerInstance, enabled: boolean): undefined {
  this.enabled = enabled
}

Logger.SetMinLevelOverride = function (this: LoggerInstance, level?: string): undefined {
  this.minLevelOverride = level
}

Logger.SetLogTracesOverride = function (this: LoggerInstance, enabled?: boolean): undefined {
  this.logTracesOverride = enabled
}

Logger.Log = function (this: LoggerInstance, level: string, ...args: unknown[]): undefined {
  if (!this.enabled) return
  INTERNAL.Log(level, this, ...args)
}

Logger.Verbose = function (this: LoggerInstance, ...args: unknown[]): undefined {
  if (!this.enabled) return
  INTERNAL.Log(LOG_LEVEL_VERBOSE, this, ...args)
}

Logger.Debug = function (this: LoggerInstance, ...args: unknown[]): undefined {
  if (!this.enabled) return
  INTERNAL.Log(LOG_LEVEL_DEBUG, this, ...args)
}

Logger.Info = function (this: LoggerInstance, ...args: unknown[]): undefined {
  if (!this.enabled) return
  INTERNAL.Log(LOG_LEVEL_INFO, this, ...args)
}

Logger.Warn = function (this: LoggerInstance, ...args: unknown[]): undefined {
  if (!this.enabled) return
  INTERNAL.Log(LOG_LEVEL_WARNING, this, ...args)
}

Logger.Error = function (this: LoggerInstance, ...args: unknown[]): undefined {
  if (!this.enabled) return
  INTERNAL.Log(LOG_LEVEL_ERROR, this, ...args)
}

export function initLogger(): undefined {
  INTERNAL.class.Logger = Logger
}
