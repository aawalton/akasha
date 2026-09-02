import { GuildHistoryCacheCategory } from "../histoire-category-class/histoire-category-class.module.code.ts"
import type { ProcessingRequestRef } from "../histoire-category-types/histoire-category-types.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

function asNumber(value: unknown): number {
  return value as number
}

function asProcessingRequestRef(value: unknown): ProcessingRequestRef {
  return value as ProcessingRequestRef
}

GuildHistoryCacheCategory.GetIndexRangeForEventIdRange = function (this, startId, endId) {
  const startIndex = GetGuildHistoryEventIndex(this.guildId, this.category, startId)
  const endIndex = GetGuildHistoryEventIndex(this.guildId, this.category, endId)
  return $multi(startIndex, endIndex)
}

GuildHistoryCacheCategory.FindFirstAvailableEventIdForEventId = function (this, eventId) {
  const [oldestManagedEventId] = this.GetOldestManagedEventInfo()
  if (oldestManagedEventId == null) {
    logger.Verbose("No oldestManagedEventId found")
    return undefined
  } else if (eventId <= oldestManagedEventId) {
    logger.Verbose("Event is older than oldestManagedEventId")
    return oldestManagedEventId
  }

  const [newestManagedEventId] = this.GetNewestManagedEventInfo()
  if (newestManagedEventId == null || eventId > newestManagedEventId) {
    logger.Verbose("No newestManagedEventId found or event is newer than newestManagedEventId")
    return undefined
  } else if (eventId === newestManagedEventId) {
    logger.Verbose("Event is newestManagedEventId")
    return newestManagedEventId
  }

  const [newestIndex, oldestIndex] = this.GetManagedRangeIndices()
  if (newestIndex == null || oldestIndex == null) {
    logger.Verbose("No managed range found")
    return undefined
  }

  const [foundEventId] = this.SearchEventIdInInterval(eventId, newestIndex, oldestIndex)
  return foundEventId
}

GuildHistoryCacheCategory.GetManagedRangeIndices = function (this) {
  const [oldestManagedEventId] = this.GetOldestManagedEventInfo()
  if (oldestManagedEventId == null) {
    logger.Verbose("No oldestManagedEventId found")
    return $multi(undefined, undefined)
  }

  const guildId = this.guildId
  const category = this.category
  const rangeIndex = this.FindRangeIndexForEventId(oldestManagedEventId)
  if (rangeIndex == null) {
    logger.Verbose("No rangeIndex found for oldestManagedEventId", oldestManagedEventId)
    return $multi(undefined, undefined)
  }

  const [newestTime, oldestTime] = this.GetRangeInfo(rangeIndex)
  const [newestIndex, oldestIndex] = this.adapter.GetGuildHistoryEventIndicesForTimeRange(
    guildId,
    category,
    asNumber(newestTime),
    asNumber(oldestTime)
  )
  return $multi(newestIndex, oldestIndex)
}

GuildHistoryCacheCategory.SearchEventIdInInterval = function (
  this,
  eventId,
  firstIndex,
  lastIndex
) {
  if (firstIndex > lastIndex) {
    logger.Warn(
      "SearchEventIdInInterval - firstIndex is greater than lastIndex",
      firstIndex,
      lastIndex
    )
    const temp = firstIndex
    firstIndex = lastIndex
    lastIndex = temp
  }

  if (lastIndex - firstIndex < 2) {
    logger.Verbose("Abort SearchEventIdInInterval - not enough events")
    return $multi(undefined, undefined)
  }

  const firstEventId = this.GetEvent(firstIndex).GetEventId()
  const lastEventId = this.GetEvent(lastIndex).GetEventId()
  if (eventId < firstEventId || eventId > lastEventId) {
    logger.Warn(
      "Abort SearchEventIdInInterval - eventId is outside current range",
      eventId < firstEventId,
      eventId > lastEventId
    )
    return $multi(undefined, undefined)
  }

  const distanceFromFirst = (eventId - firstEventId) / (lastEventId - firstEventId)
  let index = firstIndex + math.floor(distanceFromFirst * (lastIndex - firstIndex))
  if (index === firstIndex || index === lastIndex) {
    index = firstIndex + math.floor(0.5 * (lastIndex - firstIndex))
    logger.Verbose("Use regular index", index)
  } else {
    logger.Verbose("Use approximated index", index)
  }

  const event = this.GetEvent(index)
  const foundEventId = event.GetEventId()

  if (eventId > foundEventId) {
    logger.Verbose("SearchEventIdInInterval - eventId is greater than foundEventId")
    return this.SearchEventIdInInterval(eventId, index, lastIndex)
  } else if (eventId < foundEventId) {
    logger.Verbose("SearchEventIdInInterval - eventId is smaller than foundEventId")
    return this.SearchEventIdInInterval(eventId, firstIndex, index)
  }

  logger.Verbose("SearchEventIdInInterval - eventId found")
  return $multi(foundEventId, index)
}

GuildHistoryCacheCategory.FindLastAvailableEventIdForEventId = function (this, eventId) {
  const [oldestManagedEventId] = this.GetOldestManagedEventInfo()
  if (oldestManagedEventId == null || eventId < oldestManagedEventId) {
    logger.Verbose("No oldestManagedEventId found or event is older than oldestManagedEventId")
    return undefined
  } else if (eventId === oldestManagedEventId) {
    logger.Verbose("Event is oldestManagedEventId")
    return oldestManagedEventId
  }

  const [newestManagedEventId] = this.GetNewestManagedEventInfo()
  if (newestManagedEventId == null) {
    logger.Verbose("No newestManagedEventId found")
    return undefined
  } else if (eventId > newestManagedEventId) {
    logger.Verbose("Event is newer than newestManagedEventId")
    return newestManagedEventId
  }

  const [newestIndex, oldestIndex] = this.GetManagedRangeIndices()
  if (newestIndex == null || oldestIndex == null) {
    logger.Verbose("No managed range found")
    return undefined
  }

  const [foundEventId] = this.SearchEventIdInInterval(eventId, newestIndex, oldestIndex)
  return foundEventId
}

GuildHistoryCacheCategory.FindFirstAvailableEventIdForEventTime = function (this, eventTime) {
  const [oldestId, oldestTime] = this.GetOldestManagedEventInfo()
  if (oldestId == null) {
    logger.Verbose("No oldestId found")
    return undefined
  } else if (eventTime <= asNumber(oldestTime)) {
    logger.Verbose("Event is older than oldestTime")
    return oldestId
  }

  const [newestId, newestTime] = this.GetNewestManagedEventInfo()
  if (newestId == null) {
    logger.Verbose("No newestId found")
    return undefined
  } else if (eventTime > asNumber(newestTime)) {
    logger.Verbose("Event is newer than newestTime")
    return newestId
  }

  const guildId = this.guildId
  const category = this.category
  const [, oldestIndex] = this.adapter.GetGuildHistoryEventIndicesForTimeRange(
    guildId,
    category,
    asNumber(newestTime),
    eventTime
  )
  if (oldestIndex != null) {
    const [basicId, basicTime, basicRedacted, basicType] = GetGuildHistoryEventBasicInfo(
      guildId,
      category,
      oldestIndex
    )
    logger.Verbose("Found oldestIndex", oldestIndex, basicId, basicTime, basicRedacted, basicType)
    return GetGuildHistoryEventId(guildId, category, oldestIndex)
  }

  logger.Verbose("No oldestIndex found")
  return undefined
}

GuildHistoryCacheCategory.FindLastAvailableEventIdForEventTime = function (this, eventTime) {
  const [newestId, newestTime] = this.GetNewestManagedEventInfo()
  if (newestId == null) {
    logger.Verbose("No newestId found")
    return undefined
  } else if (eventTime > asNumber(newestTime)) {
    logger.Verbose("Event is newer than newestTime")
    return newestId
  }

  const [oldestId, oldestTime] = this.GetOldestManagedEventInfo()
  if (oldestId == null) {
    logger.Verbose("No oldestId found")
    return undefined
  } else if (eventTime <= asNumber(oldestTime)) {
    logger.Verbose("Event is older than oldestTime")
    return oldestId
  }

  const guildId = this.guildId
  const category = this.category
  const [newestIndex] = this.adapter.GetGuildHistoryEventIndicesForTimeRange(
    guildId,
    category,
    eventTime,
    asNumber(oldestTime)
  )
  if (newestIndex != null) {
    const [basicId, basicTime, basicRedacted, basicType] = GetGuildHistoryEventBasicInfo(
      guildId,
      category,
      newestIndex
    )
    logger.Verbose("Found newestIndex", newestIndex, basicId, basicTime, basicRedacted, basicType)
    return GetGuildHistoryEventId(guildId, category, newestIndex)
  }

  logger.Verbose("No newestIndex found")
  return undefined
}

GuildHistoryCacheCategory.Clear = function (this) {
  logger.Warn("Clearing cache for guild %d category %d", this.guildId, this.category)
  const result = ClearGuildHistoryCache(this.guildId, this.category, asNumber(undefined))
  logger.Info("Cache clear result:", result)
  return result
}

GuildHistoryCacheCategory.GetDebugInfo = function (this) {
  const guildId = this.guildId
  const category = this.category
  const debugInfo = new LuaTable<string, unknown>()
  debugInfo.set("key", this.key)

  debugInfo.set("saveData", this.saveData)
  debugInfo.set("requestMode", this.GetRequestMode())
  debugInfo.set("isAutoRequesting", this.IsAutoRequesting())
  debugInfo.set("hasLinked", this.HasLinked())
  debugInfo.set("isManagedRangeConnectedToPresent", this.IsManagedRangeConnectedToPresent())
  debugInfo.set("isProcessing", this.IsProcessing())
  debugInfo.set("unprocessedEventsStartTime", this.GetUnprocessedEventsStartTime())
  debugInfo.set("numCachedEvents", this.categoryData.GetNumEvents())
  debugInfo.set("numLoadedManagedEvents", this.GetNumLoadedManagedEvents())
  debugInfo.set("numUnlinkedEvents", this.GetNumUnlinkedEvents())

  const [oldestManagedEventId, oldestManagedEventTime] = this.GetOldestManagedEventInfo()
  const oldestManagedEventIndex = GetGuildHistoryEventIndex(
    guildId,
    category,
    asNumber(oldestManagedEventId)
  )
  const oldestManagedEvent = new LuaTable<string, unknown>()
  oldestManagedEvent.set("id", oldestManagedEventId)
  oldestManagedEvent.set("time", oldestManagedEventTime)
  oldestManagedEvent.set("index", oldestManagedEventIndex)
  debugInfo.set("oldestManagedEvent", oldestManagedEvent)

  const [newestManagedEventId, newestManagedEventTime] = this.GetNewestManagedEventInfo()
  const newestManagedEventIndex = GetGuildHistoryEventIndex(
    guildId,
    category,
    asNumber(newestManagedEventId)
  )
  const newestManagedEvent = new LuaTable<string, unknown>()
  newestManagedEvent.set("id", newestManagedEventId)
  newestManagedEvent.set("time", newestManagedEventTime)
  newestManagedEvent.set("index", newestManagedEventIndex)
  debugInfo.set("newestManagedEvent", newestManagedEvent)

  const oldestGaplessEventIndex = GetOldestGuildHistoryEventIndexForUpToDateEventsWithoutGaps(
    guildId,
    category
  )
  if (oldestGaplessEventIndex != null) {
    const [oldestGaplessEventTime, oldestGaplessEventId] = GetGuildHistoryEventBasicInfo(
      guildId,
      category,
      oldestGaplessEventIndex
    )
    const oldestGaplessEvent = new LuaTable<string, unknown>()
    oldestGaplessEvent.set("id", oldestGaplessEventId)
    oldestGaplessEvent.set("time", oldestGaplessEventTime)
    oldestGaplessEvent.set("index", oldestGaplessEventIndex)
    debugInfo.set("oldestGaplessEvent", oldestGaplessEvent)
  } else {
    debugInfo.set("oldestGaplessEvent", false)
  }

  const numRanges = this.GetNumRanges()
  debugInfo.set("numRanges", numRanges)
  const ranges = new LuaTable<number, unknown>()
  for (let i = 1; i <= numRanges; i = i + 1) {
    const [newestTime, oldestTime, newestEventId, oldestEventId] = this.GetRangeInfo(i)
    const newestIndex = GetGuildHistoryEventIndex(guildId, category, asNumber(newestEventId))
    const oldestIndex = GetGuildHistoryEventIndex(guildId, category, asNumber(oldestEventId))
    const rangeEntry = new LuaTable<string, unknown>()
    rangeEntry.set("numEvents", asNumber(oldestIndex) - asNumber(newestIndex) + 1)
    const oldestEvent = new LuaTable<string, unknown>()
    oldestEvent.set("id", oldestEventId)
    oldestEvent.set("time", oldestTime)
    oldestEvent.set("index", oldestIndex)
    rangeEntry.set("oldestEvent", oldestEvent)
    const newestEvent = new LuaTable<string, unknown>()
    newestEvent.set("id", newestEventId)
    newestEvent.set("time", newestTime)
    newestEvent.set("index", newestIndex)
    rangeEntry.set("newestEvent", newestEvent)
    ranges.set(i, rangeEntry)
  }
  debugInfo.set("ranges", ranges)

  const numRawRanges = GetNumGuildHistoryEventRanges(guildId, category)
  debugInfo.set("numRawRanges", numRawRanges)
  const rawRanges = new LuaTable<number, unknown>()
  for (let i = 1; i <= numRawRanges; i = i + 1) {
    const [newestTime, oldestTime, newestEventId, oldestEventId] = GetGuildHistoryEventRangeInfo(
      guildId,
      category,
      i
    )
    const newestIndex = GetGuildHistoryEventIndex(guildId, category, newestEventId)
    const oldestIndex = GetGuildHistoryEventIndex(guildId, category, oldestEventId)

    const rawEntry = new LuaTable<string, unknown>()
    rawEntry.set(
      "numEvents",
      oldestIndex != null && newestIndex != null ? oldestIndex - newestIndex + 1 : -1
    )
    const oldestEvent = new LuaTable<string, unknown>()
    oldestEvent.set("id", oldestEventId)
    oldestEvent.set("time", oldestTime)
    oldestEvent.set("index", oldestIndex)
    rawEntry.set("oldestEvent", oldestEvent)
    const newestEvent = new LuaTable<string, unknown>()
    newestEvent.set("id", newestEventId)
    newestEvent.set("time", newestTime)
    newestEvent.set("index", newestIndex)
    rawEntry.set("newestEvent", newestEvent)
    rawRanges.set(i, rawEntry)
  }
  debugInfo.set("rawRanges", rawRanges)

  if (this.request != null) {
    debugInfo.set("request", this.request.GetDebugInfo())
  }

  const [processingStartTime, processingEndTime, processingCurrentTime] =
    this.GetProcessingTimeRange()
  const processing = new LuaTable<string, unknown>()
  processing.set("isProcessing", this.IsProcessing())
  processing.set("startTime", processingStartTime)
  processing.set("currentTime", processingCurrentTime)
  processing.set("endTime", processingEndTime)
  debugInfo.set("processing", processing)

  const processingQueue = new LuaTable<number, unknown>()
  for (let i = 1; i <= this.processingQueue.length; i = i + 1) {
    const queued = asProcessingRequestRef(this.processingQueue[i - 1])
    processingQueue.set(i, queued.GetDebugInfo())
  }
  debugInfo.set("processingQueue", processingQueue)

  return debugInfo
}
