import { internal } from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-state/sales-history-state.module.code.ts"
import { GuildHistoryStatusWindow } from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-status-window/sales-history-status-window.module.code.ts"
import { asWindowHistoryCacheRef } from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-status-window-shared/sales-history-status-window-shared.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"

const logger = internal.logger

type DebugKey = string | number
type DebugTable = LuaTable<DebugKey, unknown>

function asString(value: unknown): string {
  return value as string
}
function asDebugTable(value: unknown): DebugTable {
  return value as DebugTable
}

function toJson(value: unknown, level: number): string {
  const output: string[] = []
  const indent = string.rep("    ", level)

  if (type(value) === "table") {
    const tbl = asDebugTable(value)
    const keys: DebugKey[] = []
    for (const [k] of pairs(tbl)) {
      keys[keys.length] = k
    }
    table.sort(keys)

    const fields: string[] = []
    for (let i = 0; i < keys.length; i = i + 1) {
      const k = keys[i]
      if (k == null) {
        continue
      }
      fields[fields.length] = indent + '    "' + tostring(k) + '": ' + toJson(tbl.get(k), level + 1)
    }

    if (fields.length === 0) {
      output[output.length] = "{}"
    } else {
      output[output.length] = "{"
      output[output.length] = table.concat(fields, ",\n")
      output[output.length] = indent + "}"
    }
  } else if (type(value) === "string") {
    output[output.length] = '"' + asString(value) + '"'
  } else {
    output[output.length] = tostring(value)
  }

  return table.concat(output, "\n")
}

GuildHistoryStatusWindow.ShowDebugInfo = function (this) {
  const debugInfo = asWindowHistoryCacheRef(internal.historyCache).GetDebugInfo()
  debugInfo.set("zoomMode", this.GetZoomMode())
  debugInfo.set("created", GetTimeStamp())
  debugInfo.set("systemDisabled", internal.IsGuildHistorySystemDisabled())
  const debugInfoText = toJson(debugInfo, 0)
  logger.Info(debugInfoText)

  ZO_ERROR_FRAME.suppressErrorDialog = false
  ZO_ERROR_FRAME.HideAllErrors()
  ZO_ERROR_FRAME.OnUIError(debugInfoText)
  ZO_ERROR_FRAME.titleControl.SetText("Temper Sales Guild History Debug Info")
  ZO_ERROR_FRAME.suppressKeybind.SetHidden(true)
  ZO_ERROR_FRAME.copyErrorCodeButton.SetHidden(true)
  ZO_ERROR_FRAME.copyKeybind.SetHidden(false)

  DumpGuildHistoryChunkInformation(undefined)
}
