import { GuildHistoryCacheCategory } from "../histoire-category-class/histoire-category-class.module.code.ts"
import type { EventRef } from "../histoire-category-types/histoire-category-types.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

function asAsyncTask(value: unknown): AsyncTask {
  return value as AsyncTask
}

function asEventRef(value: unknown): EventRef {
  return value as EventRef
}

function asNumber(value: unknown): number {
  return value as number
}

GuildHistoryCacheCategory.OnCategoryUpdated = function (this, flags) {
  this.rangeInfoDirty = true

  internal.FireCallbacks(internal.callback.CATEGORY_DATA_UPDATED, this, flags)
  this.RestartProcessingTask()
  if (this.ContinueExistingRequest()) {
    return
  }
  if (!this.IsAutoRequesting()) {
    logger.Debug("Skip processing for inactive category", this.key)
    return
  }

  this.progressDirty = true
  let isNewManagedRange = false
  const guildId = this.guildId
  const category = this.category
  let [oldestManagedEventId] = this.GetOldestManagedEventInfo()
  let [newestManagedEventId] = this.GetNewestManagedEventInfo()

  if (oldestManagedEventId == null || newestManagedEventId == null) {
    if (oldestManagedEventId !== newestManagedEventId) {
      logger.Warn("Invalid save data state for guild %d category %d", guildId, category)
      this.Reset()
    } else {
      logger.Info("No managed range stored for guild %d category %d", guildId, category)
    }

    const index = GetOldestGuildHistoryEventIndexForUpToDateEventsWithoutGaps(guildId, category)
    if (index != null) {
      const eventId = GetGuildHistoryEventId(guildId, category, index)
      newestManagedEventId = eventId
      oldestManagedEventId = eventId
      isNewManagedRange = true
    } else {
      logger.Warn("Could not find any unlinked events for", this.key)
    }
  }

  this.ProcessNextRequest()
  if (newestManagedEventId != null && oldestManagedEventId != null) {
    this.StartProcessingEvents(newestManagedEventId, oldestManagedEventId, isNewManagedRange)
  }
}

GuildHistoryCacheCategory.Reset = function (this) {
  logger.Info("Resetting cache for guild %d category %d", this.guildId, this.category)
  if (this.request != null) {
    this.DestroyRequest()
  }

  if (this.processingTask != null) {
    this.processingTask.Cancel()
    this.processingTask = undefined
  }

  if (this.processingRequest != null) {
    this.processingRequest.StopProcessing()
    this.processingRequest = undefined
  }

  this.saveData.initialRequestTime = undefined
  this.saveData.lastLinkedTime = undefined

  this.rangeInfoDirty = true
  this.progressDirty = true
  this.wasLinked = false

  this.SetNewestManagedEventInfo()
  this.SetOldestManagedEventInfo()

  for (const [processor] of pairs(this.processors)) {
    processor.StopInternal(internal.STOP_REASON_MANAGED_RANGE_LOST)
  }

  zo_callLater(() => {
    this.OnCategoryUpdated()
  }, 0)
}

GuildHistoryCacheCategory.QueueProcessingRequest = function (this, request) {
  this.processingQueue[this.processingQueue.length] = request
  zo_callLater(() => {
    this.ProcessNextRequest()
  }, 0)
}

GuildHistoryCacheCategory.RemoveProcessingRequest = function (this, request) {
  if (request == null) {
    return
  }

  if (this.processingRequest === request) {
    this.processingRequest.StopProcessing()
    this.processingRequest = undefined
  }

  for (let i = 1; i <= this.processingQueue.length; i = i + 1) {
    if (this.processingQueue[i - 1] === request) {
      this.processingQueue.splice(i - 1, 1)
      this.ProcessNextRequest()
      return
    }
  }
}

GuildHistoryCacheCategory.ProcessNextRequest = function (this) {
  if (this.IsProcessing()) {
    return
  }
  const request = this.processingQueue[0]
  if (request != null) {
    this.processingRequest = request
    request.StartProcessing()
  }
}

GuildHistoryCacheCategory.StartProcessingEvents = function (
  this,
  newestManagedEventId,
  oldestManagedEventId,
  isNewManagedRange
) {
  if (this.IsProcessing() || !this.IsAutoRequesting()) {
    return
  }

  const guildId = this.guildId
  const category = this.category
  logger.Info("Start processing events for guild %d category %d", guildId, category)
  const rangeIndex = this.FindRangeIndexForEventId(newestManagedEventId)
  if (rangeIndex == null || oldestManagedEventId == null) {
    logger.Warn("Could not find managed range for guild %d category %d", guildId, category)
    this.RequestMissingData()
    return
  }

  const [newestTime, oldestTime, newestEventId, oldestEventId] = this.GetRangeInfo(rangeIndex)
  let unlinkedEvents: EventRef[] = []
  let missedEvents: EventRef[] = []
  const categoryData = this.categoryData

  if (
    isNewManagedRange === true ||
    (newestManagedEventId != null && newestEventId != null && newestManagedEventId < newestEventId)
  ) {
    let newestManagedEventTime: number | undefined
    if (isNewManagedRange === true) {
      const index = GetGuildHistoryEventIndex(guildId, category, asNumber(newestManagedEventId))
      newestManagedEventTime = GetGuildHistoryEventTimestamp(guildId, category, asNumber(index))
    } else {
      ;[, newestManagedEventTime] = this.GetNewestManagedEventInfo()
    }
    logger.Debug("Found events newer than the managed range", this.key)
    unlinkedEvents = categoryData.GetEventsInTimeRange(
      asNumber(newestTime),
      asNumber(newestManagedEventTime)
    )
  }

  if (oldestEventId != null && asNumber(oldestManagedEventId) > oldestEventId) {
    const [, oldestManagedEventTime] = this.GetOldestManagedEventInfo()
    logger.Debug("Found events older than the managed range", this.key)
    missedEvents = categoryData.GetEventsInTimeRange(
      asNumber(oldestManagedEventTime),
      asNumber(oldestTime)
    )
  }

  const numUnlinkedEvents = unlinkedEvents.length
  const numMissedEvents = missedEvents.length
  logger.Info(
    "Found %d unlinked events and %d missed events for %s",
    numUnlinkedEvents,
    numMissedEvents,
    this.key
  )

  if (numUnlinkedEvents > 0 || numMissedEvents > 0) {
    const task = asAsyncTask(internal.CreateAsyncTask())
    this.processingTask = task

    this.InitializePendingEventMetrics(numUnlinkedEvents + numMissedEvents)
    if (numUnlinkedEvents > 0) {
      this.processingStartTime = asEventRef(
        unlinkedEvents[numUnlinkedEvents - 1]
      ).GetEventTimestampS()
      this.processingEndTime = asEventRef(unlinkedEvents[0]).GetEventTimestampS()
      logger.Debug(
        "set processing time range",
        guildId,
        category,
        this.processingStartTime,
        this.processingEndTime
      )
      internal.FireCallbacks(
        internal.callback.PROCESS_LINKED_EVENTS_STARTED,
        guildId,
        category,
        numUnlinkedEvents
      )
    }

    let previousTime = asNumber(oldestTime)
    let shouldSetOldestEventInfo = isNewManagedRange === true
    let skipped = 0
    task
      .For(numUnlinkedEvents, 1, -1)
      .Do((i: number) => {
        this.progressDirty = true
        this.IncrementPendingEventMetrics()
        const event = asEventRef(unlinkedEvents[i - 1])
        const eventId = event.GetEventId()
        if (
          (isNewManagedRange === true && eventId < asNumber(newestManagedEventId)) ||
          (isNewManagedRange !== true && eventId <= asNumber(newestManagedEventId))
        ) {
          skipped = skipped + 1
        } else {
          const eventTime = event.GetEventTimestampS()
          if (eventTime < asNumber(oldestTime)) {
            logger.Warn("Event time is outside the expected range (%d < %d)", eventTime, oldestTime)
            this.RestartProcessingTask()
            return
          } else if (eventTime < previousTime) {
            logger.Warn("Event time is out of order (%d < %d)", eventTime, previousTime)
            this.RestartProcessingTask()
            return
          }

          if (shouldSetOldestEventInfo) {
            this.SetOldestManagedEventInfo(eventId, eventTime)
            shouldSetOldestEventInfo = false
          }
          this.SetNewestManagedEventInfo(eventId, eventTime)
          internal.FireCallbacks(internal.callback.PROCESS_LINKED_EVENT, guildId, category, event)
          this.processingCurrentTime = eventTime
          previousTime = eventTime
        }
      })
      .Then((): undefined => {
        this.progressDirty = true
        logger.Debug("Finished processing unlinked events", guildId, category)
        if (skipped > 0) {
          logger.Debug("Skipped", skipped, "already processed unlinked events")
        }
        skipped = 0
        if (isNewManagedRange === true) {
          internal.FireCallbacks(internal.callback.MANAGED_RANGE_FOUND, guildId, category)
        }
        this.CheckHasLinked()
        internal.FireCallbacks(internal.callback.PROCESS_LINKED_EVENTS_FINISHED, guildId, category)

        this.processingCurrentTime = undefined
        if (numMissedEvents > 0) {
          this.processingStartTime = asEventRef(
            missedEvents[numMissedEvents - 1]
          ).GetEventTimestampS()
          this.processingEndTime = asEventRef(missedEvents[0]).GetEventTimestampS()
          logger.Debug(
            "set processing time range",
            guildId,
            category,
            this.processingStartTime,
            this.processingEndTime
          )
          internal.FireCallbacks(
            internal.callback.PROCESS_MISSED_EVENTS_STARTED,
            guildId,
            category,
            numMissedEvents
          )
        } else {
          this.processingStartTime = undefined
          this.processingEndTime = undefined
        }
        previousTime = asNumber(newestTime)
      })
      .For(1, numMissedEvents)
      .Do((i: number) => {
        this.progressDirty = true
        this.IncrementPendingEventMetrics()
        const event = asEventRef(missedEvents[i - 1])
        const eventId = event.GetEventId()
        if (eventId >= asNumber(oldestManagedEventId)) {
          skipped = skipped + 1
        } else {
          const eventTime = event.GetEventTimestampS()
          if (eventTime < asNumber(oldestTime)) {
            logger.Warn("Event time is outside the expected range (%d < %d)", eventTime, oldestTime)
            this.RestartProcessingTask()
            return
          } else if (eventTime > previousTime) {
            logger.Warn("Event time is out of order (%d > %d)", eventTime, previousTime)
            this.RestartProcessingTask()
            return
          }

          this.SetOldestManagedEventInfo(eventId, eventTime)
          internal.FireCallbacks(internal.callback.PROCESS_MISSED_EVENT, guildId, category, event)
          this.processingCurrentTime = -eventTime
          previousTime = eventTime
        }
      })
      .Then((): undefined => {
        this.progressDirty = true
        this.ResetPendingEventMetrics()
        this.processingTask = undefined
        this.processingStartTime = undefined
        this.processingEndTime = undefined
        this.processingCurrentTime = undefined
        logger.Debug("Finished processing missed events", guildId, category)
        if (skipped > 0) {
          logger.Debug("Skipped", skipped, "already processed missed events")
        }
        internal.FireCallbacks(internal.callback.PROCESS_MISSED_EVENTS_FINISHED, guildId, category)
        this.ProcessNextRequest()
      })
  } else {
    this.CheckHasLinked()
  }
}

GuildHistoryCacheCategory.RestartProcessingTask = function (this) {
  if (this.processingTask != null) {
    logger.Info("Restart processing events for guild %d category %d", this.guildId, this.category)
    this.processingTask.Cancel()
    this.processingTask = undefined
    const [newestManagedEventId] = this.GetNewestManagedEventInfo()
    const [oldestManagedEventId] = this.GetOldestManagedEventInfo()
    this.StartProcessingEvents(newestManagedEventId, oldestManagedEventId)
  }
}

GuildHistoryCacheCategory.InitializePendingEventMetrics = function (this, numPendingEvents) {
  this.numPendingEvents = numPendingEvents
  this.performanceTracker.Reset()
}

GuildHistoryCacheCategory.ResetPendingEventMetrics = function (this) {
  this.numPendingEvents = undefined
  this.performanceTracker.Reset()
}

GuildHistoryCacheCategory.IncrementPendingEventMetrics = function (this) {
  this.numPendingEvents = asNumber(this.numPendingEvents) - 1
  this.performanceTracker.Increment()
}

GuildHistoryCacheCategory.GetPendingEventMetrics = function (this) {
  if (this.numPendingEvents == null || !this.IsProcessing()) {
    return $multi(0, -1, -1)
  }

  const count = this.numPendingEvents
  const [speed, timeLeft] = this.performanceTracker.GetProcessingSpeedAndEstimatedTimeLeft(count)
  return $multi(count, speed, timeLeft)
}

GuildHistoryCacheCategory.UpdateProgressBar = function (this, bar) {
  bar.Update(this)
}

GuildHistoryCacheCategory.GetProcessingTimeRange = function (this) {
  return $multi(this.processingStartTime, this.processingEndTime, this.processingCurrentTime)
}

GuildHistoryCacheCategory.GetProgress = function (this) {
  if (this.progressDirty) {
    if (this.HasLinked() && !this.IsProcessing() && !this.HasPendingRequest()) {
      this.progress = 1
      this.missingTime = 0
    } else {
      const [, newestEventTime] = this.GetNewestManagedEventInfo()
      if (newestEventTime != null) {
        const now = GetTimeStamp()
        const events = this.categoryData.GetEventsInTimeRange(now, newestEventTime + 1)
        if (events.length > 0) {
          this.missingTime = asEventRef(events[0]).GetEventTimestampS() - newestEventTime
          this.progress = 1 - this.missingTime / (now - newestEventTime)
        } else {
          this.progress = 0
          this.missingTime = -1
        }
      } else {
        this.progress = 0
        this.missingTime = -1
      }
    }
    this.progressDirty = false
  }
  return $multi(this.progress, this.missingTime)
}
