import { isTable } from "akasha/temper/narrow/is-table/is-table.module.code.ts"

type MetatableView = { __index?: Record<string | number, unknown> } | undefined

export type LogType = "Debug" | "Info" | "Verbose" | "Warn"

export type AddonLog = {
  readonly logger: DebugLogger | undefined
  readonly dm: (this: void, logType: LogType, ...args: unknown[]) => undefined
}

function asMetatableView(value: unknown): MetatableView {
  return value as MetatableView
}

function containsPlaceholders(str: unknown): boolean {
  if (typeof str !== "string") return false
  const [startPos] = string.find(str, "<<%d+>>")
  return startPos !== undefined
}

export function createAddonLog(
  this: void,
  addonName: string,
  showLog: (this: void) => boolean
): AddonLog {
  const logger = LibDebugLogger !== undefined ? LibDebugLogger.Create(addonName) : undefined
  const hasViewer = DebugLogViewer !== undefined

  function createLog(logType: LogType, logContent: string): undefined {
    if (!hasViewer && logType === "Info") {
      CHAT_ROUTER.AddSystemMessage(logContent)
      return
    }
    if (logger !== undefined && logType === "Info") {
      logger.Info(logContent)
    }
    if (!showLog() || logger === undefined) return
    if (logType === "Debug") {
      logger.Debug(logContent)
    }
    if (logType === "Verbose") {
      logger.Verbose(logContent)
    }
    if (logType === "Warn") {
      logger.Warn(logContent)
    }
  }

  function emitMessage(logType: LogType, text: string): undefined {
    createLog(logType, text === "" ? "[Empty String]" : text)
  }

  function emitUserdata(logType: LogType, udata: unknown): undefined {
    const functionLimit = 5
    const totalLimit = 10
    let functionCount = 0
    let entryCount = 0

    emitMessage(logType, `Userdata: ${tostring(udata)}`)

    const meta = asMetatableView(getmetatable(udata))
    if (meta === undefined || meta.__index === undefined) {
      emitMessage(logType, "  (No detailed metadata available)")
      return
    }
    for (const [k, v] of pairs(meta.__index)) {
      if (type(v) === "function") {
        if (functionCount < functionLimit) {
          emitMessage(logType, `  Function: ${tostring(k)}`)
          functionCount += 1
          entryCount += 1
        }
      } else {
        emitMessage(logType, `  ${tostring(k)}: ${tostring(v)}`)
        entryCount += 1
      }
      if (entryCount >= totalLimit) {
        emitMessage(logType, "  ... (output truncated due to limit)")
        break
      }
    }
  }

  function emitTable(
    logType: LogType,
    t: Record<string | number, unknown> | undefined,
    indent: string,
    history: LuaSet<object>
  ): undefined {
    if (t === undefined) {
      emitMessage(logType, `${indent}[Nil Table]`)
      return
    }
    const [firstKey] = next(t)
    if (firstKey === undefined) {
      emitMessage(logType, `${indent}[Empty Table]`)
      return
    }
    for (const [k, v] of pairs(t)) {
      emitMessage(logType, `${indent}(${type(v)}): ${tostring(k)} = ${tostring(v)}`)
      if (!isTable(v)) continue
      if (history.has(v)) {
        emitMessage(logType, `${indent}Avoiding cycle on table...`)
        continue
      }
      history.add(v)
      emitTable(logType, v, `${indent}  `, history)
    }
  }

  function emitValue(logType: LogType, value: unknown): undefined {
    if (type(value) === "userdata") {
      emitUserdata(logType, value)
    } else if (isTable(value)) {
      emitTable(logType, value, ".", new LuaSet<object>())
    } else {
      emitMessage(logType, tostring(value))
    }
  }

  function dm(this: void, logType: LogType, ...args: unknown[]): undefined {
    if (!showLog() && logType !== "Info") return
    const firstArg = args[0]
    if (typeof firstArg === "string" && containsPlaceholders(firstArg)) {
      const remaining = args.slice(1)
      emitMessage(logType, ZO_CachedStrFormat(firstArg, ...remaining))
      return
    }
    for (const value of args) {
      emitValue(logType, value)
    }
  }

  return { logger, dm }
}
