import { GuildHistoryCacheCategory } from "../histoire-category-class/histoire-category-class.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

GuildHistoryCacheCategory.RefreshManagedRangeInfo = function (this) {
  const [oldestManagedEventIdInitial, oldestManagedEventTimeInitial] =
    this.GetOldestManagedEventInfo()
  let oldestManagedEventId = oldestManagedEventIdInitial
  let oldestManagedEventTime = oldestManagedEventTimeInitial
  const [newestManagedEventId] = this.GetNewestManagedEventInfo()
  if (oldestManagedEventId == null || newestManagedEventId == null) {
    return
  }

  const guildId = this.guildId
  const category = this.category
  const oldestIndex = GetNumGuildHistoryEvents(guildId, category)
  if (oldestIndex <= 0) {
    logger.Warn("No events cached for guild %d category %d", guildId, category)
    this.Reset()
    return
  }

  const oldestCachedEventId = GetGuildHistoryEventId(guildId, category, oldestIndex)
  if (newestManagedEventId < oldestCachedEventId) {
    logger.Warn("Managed range is outside cached range for guild %d category %d", guildId, category)
    this.Reset()
    return
  }

  if (oldestCachedEventId !== oldestManagedEventId) {
    ;[oldestManagedEventId, oldestManagedEventTime] = GetGuildHistoryEventBasicInfo(
      guildId,
      category,
      oldestIndex
    )
    logger.Info("Data was removed from managed range for guild %d category %d", guildId, category)
    this.SetOldestManagedEventInfo(oldestManagedEventId, oldestManagedEventTime)
  }

  const oldestRangeIndex = this.FindRangeIndexForEventId(oldestCachedEventId)
  const newestRangeIndex = this.FindRangeIndexForEventId(newestManagedEventId)
  if (
    oldestRangeIndex == null ||
    newestRangeIndex == null ||
    oldestRangeIndex !== newestRangeIndex
  ) {
    logger.Warn("Could not find managed range for guild %d category %d", guildId, category)
    this.Reset()
    return
  }

  this.CheckHasLinked()
}

GuildHistoryCacheCategory.SetNewestManagedEventInfo = function (this, eventId, eventTime) {
  if (eventId != null && eventId !== 0) {
    this.saveData.newestManagedEventId = eventId
    this.saveData.newestManagedEventTime = eventTime
  } else {
    this.saveData.newestManagedEventId = undefined
    this.saveData.newestManagedEventTime = undefined
  }
  this.progressDirty = true
}

GuildHistoryCacheCategory.SetOldestManagedEventInfo = function (this, eventId, eventTime) {
  if (eventId != null && eventId !== 0) {
    this.saveData.oldestManagedEventId = eventId
    this.saveData.oldestManagedEventTime = eventTime
  } else {
    this.saveData.oldestManagedEventId = undefined
    this.saveData.oldestManagedEventTime = undefined
    internal.FireCallbacks(internal.callback.MANAGED_RANGE_LOST, this.guildId, this.category)
  }
}

GuildHistoryCacheCategory.GetNewestManagedEventInfo = function (this) {
  const eventId = this.saveData.newestManagedEventId
  let eventTime = this.saveData.newestManagedEventTime
  if (eventId != null && eventId !== 0) {
    if (eventTime == null) {
      const index = GetGuildHistoryEventIndex(this.guildId, this.category, eventId)
      if (index != null) {
        eventTime = GetGuildHistoryEventTimestamp(this.guildId, this.category, index)
        logger.Warn("Recovered missing newestManagedEventTime", eventTime)
        this.saveData.newestManagedEventTime = eventTime
      }
    }
    return $multi(eventId, eventTime)
  }
  return $multi(undefined, undefined)
}

GuildHistoryCacheCategory.GetOldestManagedEventInfo = function (this) {
  const eventId = this.saveData.oldestManagedEventId
  let eventTime = this.saveData.oldestManagedEventTime
  if (eventId != null && eventId !== 0) {
    if (eventTime == null) {
      const index = GetGuildHistoryEventIndex(this.guildId, this.category, eventId)
      if (index != null) {
        eventTime = GetGuildHistoryEventTimestamp(this.guildId, this.category, index)
        logger.Warn("Recovered missing oldestManagedEventTime", eventTime)
        this.saveData.oldestManagedEventTime = eventTime
      }
    }
    return $multi(eventId, eventTime)
  }
  return $multi(undefined, undefined)
}
