import { GuildHistoryCacheCategory } from "../histoire-category-class/histoire-category-class.module.code.ts"
import {
  BASE_PRIORITY,
  NO_PROCESSOR_THRESHOLD,
  PROCESSOR_PRIORITY_BONUS,
} from "../histoire-category-thresholds/histoire-category-thresholds.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

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
