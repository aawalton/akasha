import "../debug-logger-declarations/debug-logger-declarations.module.code.ts"
import "../debug-logger-saved-variables/debug-logger-saved-variables.module.code.ts"

import { INTERNAL, lib } from "../debug-logger-state/debug-logger-state.module.code.ts"
import type { Settings } from "../debug-logger-types/debug-logger-types.module.code.ts"

const TAG_TEMPLATE = "[%s] %s"

let chat: LibChatMessageInstance | undefined
function getChatProxy(): LibChatMessageInstance {
  const held = chat
  if (held !== undefined) return held
  const made: LibChatMessageInstance =
    LibChatMessage !== undefined
      ? LibChatMessage(lib.id, "LDL")
      : {
          Print(message: string): undefined {
            CHAT_ROUTER.AddSystemMessage(string.format(TAG_TEMPLATE, lib.id, message))
          },
          Printf(formatter: string, ...args: unknown[]): undefined {
            const taggedFormatter = string.format(TAG_TEMPLATE, lib.id, formatter)
            CHAT_ROUTER.AddSystemMessage(string.format(taggedFormatter, ...args))
          },
        }
  chat = made
  return made
}

function handleSlashCommand(this: void, params: string): undefined {
  const proxy = getChatProxy()
  let handled = false
  let [command, arg] = zo_strsplit(" ", params)
  command = string.lower(command as string)
  arg = string.lower(arg as string)

  if (command === "stack") {
    if (arg === "on") {
      lib.SetTraceLoggingEnabled(true)
      proxy.Print("Enabled stack trace logging")
    } else if (arg === "off") {
      lib.SetTraceLoggingEnabled(false)
      proxy.Print("Disabled stack trace logging")
    } else {
      const enabled = lib.IsTraceLoggingEnabled()
      proxy.Printf("Stack trace logging is currently %s", enabled ? "enabled" : "disabled")
    }
    handled = true
  } else if (command === "level") {
    const level = INTERNAL.STR_TO_LOG_LEVEL[arg]
    if (level !== undefined) {
      lib.SetMinLogLevel(level)
      proxy.Printf("Set log level to %s", INTERNAL.LOG_LEVEL_TO_STRING[level])
    } else {
      const currentLevel = lib.GetMinLogLevel()
      proxy.Printf("Log level is currently set to %s", INTERNAL.LOG_LEVEL_TO_STRING[currentLevel])
    }
    handled = true
  } else if (command === "clear") {
    lib.ClearLog()
    proxy.Print("log was emptied")
    handled = true
  }

  if (!handled) {
    const out: string[] = []
    out[out.length] = "/debuglogger <command> [argument]"
    out[out.length] =
      "<stack>|u100%:0: :|u[on/off]|u270%:0:       :|uEnables or disables trace logging"
    out[out.length] =
      "<level>|u120%:0: :|u[v/d/i/w/e]|u180%:0:    :|uSets the minimum level for logging"
    out[out.length] = "<clear>|u600%:0:                            :|uDeletes all log entries"
    out[out.length] = "Example: /debuglogger stack on"
    proxy.Print(table.concat(out, "\n"))
  }
}

function doInitializeSettings(this: typeof INTERNAL): Settings {
  if (INTERNAL.ignoreSavedVars !== true) {
    if (LibDebugLoggerSettings !== undefined) {
      const tempSettings = INTERNAL.settings
      INTERNAL.settings = LibDebugLoggerSettings

      for (const [key, value] of pairs(tempSettings)) {
        if (INTERNAL.settings[key] === undefined) {
          INTERNAL.settings[key] = value
        }
      }

      for (const [key] of pairs(INTERNAL.settings)) {
        if (tempSettings[key] === undefined) {
          INTERNAL.settings[key] = undefined
        }
      }

      INTERNAL.settings.version = tempSettings.version
    } else {
      LibDebugLoggerSettings = INTERNAL.settings
    }

    if (LibDebugLoggerSettings !== undefined && LibDebugLoggerSettings.version < 2) {
      LibDebugLoggerSettings.version = 2
    }
  }

  SLASH_COMMANDS["/debuglogger"] = handleSlashCommand

  return INTERNAL.settings
}

export function initSettings(): undefined {
  INTERNAL.InitializeSettings = doInitializeSettings
}
