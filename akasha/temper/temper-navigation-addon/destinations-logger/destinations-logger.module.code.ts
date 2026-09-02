import { ADDON_NAME } from "../destinations-names/destinations-names.module.code.ts"

export let showLog = true

export const logger = LibDebugLogger !== undefined ? LibDebugLogger.Create(ADDON_NAME) : undefined

const hasViewer = DebugLogViewer !== undefined

function createLog(logType: string, logContent: string): undefined {
  if (!hasViewer && logType === "Info") {
    CHAT_ROUTER.AddSystemMessage(logContent)
    return
  }
  if (!showLog) return
  if (logger !== undefined && logType === "Debug") {
    logger.Debug(logContent)
  }
  if (logger !== undefined && logType === "Info") {
    logger.Info(logContent)
  }
  if (logger !== undefined && logType === "Verbose") {
    logger.Verbose(logContent)
  }
  if (logger !== undefined && logType === "Warn") {
    logger.Warn(logContent)
  }
}

function emitMessage(logType: string, text: string): undefined {
  if (text === "") {
    text = "[Empty String]"
  }
  createLog(logType, text)
}

function isTable(value: unknown): value is Record<string | number, unknown> {
  return type(value) === "table"
}

function emitTable(
  logType: string,
  t: Record<string | number, unknown>,
  indent?: string,
  tableHistory?: Set<unknown>
): undefined {
  const effectiveIndent = indent ?? "."
  const history = tableHistory ?? new Set<unknown>()

  for (const [k, v] of pairs(t)) {
    const vType = type(v)

    emitMessage(logType, `${effectiveIndent}(${vType}): ${tostring(k)} = ${tostring(v)}`)

    if (isTable(v)) {
      if (history.has(v)) {
        emitMessage(logType, `${effectiveIndent}Avoiding cycle on table...`)
      } else {
        history.add(v)
        emitTable(logType, v, `${effectiveIndent}  `, history)
      }
    }
  }
}

export function dm(logType: string, ...args: unknown[]): undefined {
  for (const value of args) {
    if (isTable(value)) {
      emitTable(logType, value)
    } else {
      emitMessage(logType, tostring(value))
    }
  }
}
