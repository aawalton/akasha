import { GuildHistoryCacheCategory } from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-category-class/sales-history-category-class.module.code.ts"
import {
  BASE_PRIORITY,
  NO_PROCESSOR_THRESHOLD,
  PROCESSOR_PRIORITY_BONUS,
} from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-category-thresholds/sales-history-category-thresholds.module.code.ts"
import { internal } from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-state/sales-history-state.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const logger = internal.logger

GuildHistoryCacheCategory.GetRequestPriority = function (this) {
  const priority = BASE_PRIORITY[this.category] ?? 0
  const processorBonus = PROCESSOR_PRIORITY_BONUS * NonContiguousCount(this.processors)
  return priority + processorBonus
}

GuildHistoryCacheCategory.GetRequestMode = function (this) {
  return this.saveData.requestMode ?? internal.REQUEST_MODE_AUTO
}

GuildHistoryCacheCategory.SetRequestMode = function (this, mode) {
  logger.Info("Set request mode for guild %d category %d to %s", this.guildId, this.category, mode)
  this.saveData.requestMode = mode
  internal.FireCallbacks(internal.callback.REQUEST_MODE_CHANGED, this.guildId, this.category, mode)
}

GuildHistoryCacheCategory.IsAutoRequesting = function (this) {
  const mode = this.GetRequestMode()
  if (mode === internal.REQUEST_MODE_ON) {
    return true
  } else if (mode === internal.REQUEST_MODE_OFF) {
    return false
  } else {
    const lastProcessorTime = this.saveData.lastProcessorRegisteredTime ?? 0
    return GetTimeStamp() - lastProcessorTime < NO_PROCESSOR_THRESHOLD
  }
}
