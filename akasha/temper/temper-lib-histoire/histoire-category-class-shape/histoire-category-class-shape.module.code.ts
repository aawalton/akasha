import type {
  CacheSaveData,
  CategoryDataRef,
  EventRef,
  HistoryAdapterRef,
  PerformanceTrackerRef,
  ProcessingRequestRef,
  ProcessorRef,
  ProgressBarRef,
  RangeTuple,
  RequestManagerRef,
  ServerRequestRef,
} from "../histoire-category-types/histoire-category-types.module.code.ts"

export interface GuildHistoryCacheCategoryInstance {
  adapter: HistoryAdapterRef
  requestManager: RequestManagerRef
  categoryData: CategoryDataRef
  guildId: number
  category: number
  guild?: number
  key: string
  saveData: CacheSaveData
  performanceTracker: PerformanceTrackerRef
  unprocessedEventsStartTime?: number
  rangeInfo: RangeTuple[]
  rangeInfoDirty: boolean
  progressDirty: boolean
  wasLinked: boolean
  processingQueue: ProcessingRequestRef[]
  processors: LuaTable<ProcessorRef, boolean>
  request?: ServerRequestRef
  processingTask?: AsyncTask
  processingRequest?: ProcessingRequestRef
  processingStartTime?: number
  processingEndTime?: number
  processingCurrentTime?: number
  numPendingEvents?: number
  progress?: number
  missingTime?: number

  Initialize: (
    this: GuildHistoryCacheCategoryInstance,
    adapter: HistoryAdapterRef,
    requestManager: RequestManagerRef,
    categoryData: CategoryDataRef
  ) => void
  RefreshManagedRangeInfo: (this: GuildHistoryCacheCategoryInstance) => void
  RegisterProcessor: (this: GuildHistoryCacheCategoryInstance, processor: ProcessorRef) => void
  UnregisterProcessor: (this: GuildHistoryCacheCategoryInstance, processor: ProcessorRef) => void
  GetProcessorInfo: (
    this: GuildHistoryCacheCategoryInstance
  ) => LuaMultiReturn<[string[], number, number | undefined]>
  GetRequestPriority: (this: GuildHistoryCacheCategoryInstance) => number
  GetRequestMode: (this: GuildHistoryCacheCategoryInstance) => string
  SetRequestMode: (this: GuildHistoryCacheCategoryInstance, mode: string) => void
  IsAutoRequesting: (this: GuildHistoryCacheCategoryInstance) => boolean
  SetNewestManagedEventInfo: (
    this: GuildHistoryCacheCategoryInstance,
    eventId?: number,
    eventTime?: number
  ) => void
  SetOldestManagedEventInfo: (
    this: GuildHistoryCacheCategoryInstance,
    eventId?: number,
    eventTime?: number
  ) => void
  GetNewestManagedEventInfo: (
    this: GuildHistoryCacheCategoryInstance
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  GetOldestManagedEventInfo: (
    this: GuildHistoryCacheCategoryInstance
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  GetKey: (this: GuildHistoryCacheCategoryInstance) => string
  GetGuildId: (this: GuildHistoryCacheCategoryInstance) => number
  GetCategory: (this: GuildHistoryCacheCategoryInstance) => number
  IsFor: (this: GuildHistoryCacheCategoryInstance, guildId: number, category: number) => boolean
  IsProcessing: (this: GuildHistoryCacheCategoryInstance) => boolean
  IsAggregated: (this: GuildHistoryCacheCategoryInstance) => boolean

  ShouldSendInitialRequest: (
    this: GuildHistoryCacheCategoryInstance,
    oldestManagedEventId?: number
  ) => boolean
  RequestMissingData: (this: GuildHistoryCacheCategoryInstance) => void
  QueueInitialRequest: (this: GuildHistoryCacheCategoryInstance) => void
  ContinueExistingRequest: (this: GuildHistoryCacheCategoryInstance) => boolean
  HasPendingRequest: (this: GuildHistoryCacheCategoryInstance) => boolean
  VerifyRequest: (this: GuildHistoryCacheCategoryInstance) => void
  CreateRequest: (
    this: GuildHistoryCacheCategoryInstance,
    newestTime?: number,
    oldestTime?: number
  ) => ServerRequestRef
  DestroyRequest: (this: GuildHistoryCacheCategoryInstance, request?: ServerRequestRef) => void
  OptimizeRequestTimeRange: (
    this: GuildHistoryCacheCategoryInstance,
    oldestManagedEventTime?: number,
    newestManagedEventTime?: number,
    oldestGaplessEventTime?: number
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  GetRequestTimeRange: (
    this: GuildHistoryCacheCategoryInstance
  ) => LuaMultiReturn<[number | undefined, number | undefined]>

  OnCategoryUpdated: (this: GuildHistoryCacheCategoryInstance, flags?: unknown) => void
  Reset: (this: GuildHistoryCacheCategoryInstance) => void
  QueueProcessingRequest: (
    this: GuildHistoryCacheCategoryInstance,
    request: ProcessingRequestRef
  ) => void
  RemoveProcessingRequest: (
    this: GuildHistoryCacheCategoryInstance,
    request?: ProcessingRequestRef
  ) => void
  ProcessNextRequest: (this: GuildHistoryCacheCategoryInstance) => void
  StartProcessingEvents: (
    this: GuildHistoryCacheCategoryInstance,
    newestManagedEventId?: number,
    oldestManagedEventId?: number,
    isNewManagedRange?: boolean
  ) => void
  RestartProcessingTask: (this: GuildHistoryCacheCategoryInstance) => void
  InitializePendingEventMetrics: (
    this: GuildHistoryCacheCategoryInstance,
    numPendingEvents: number
  ) => void
  ResetPendingEventMetrics: (this: GuildHistoryCacheCategoryInstance) => void
  IncrementPendingEventMetrics: (this: GuildHistoryCacheCategoryInstance) => void
  GetPendingEventMetrics: (
    this: GuildHistoryCacheCategoryInstance
  ) => LuaMultiReturn<[number, number, number]>
  UpdateProgressBar: (this: GuildHistoryCacheCategoryInstance, bar: ProgressBarRef) => void
  GetProgress: (
    this: GuildHistoryCacheCategoryInstance
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  GetProcessingTimeRange: (
    this: GuildHistoryCacheCategoryInstance
  ) => LuaMultiReturn<[number | undefined, number | undefined, number | undefined]>

  HasLinked: (this: GuildHistoryCacheCategoryInstance) => boolean
  CheckHasLinked: (this: GuildHistoryCacheCategoryInstance) => void
  GetLastLinkedTime: (this: GuildHistoryCacheCategoryInstance) => number
  IsManagedRangeConnectedToPresent: (this: GuildHistoryCacheCategoryInstance) => boolean
  GetNumLoadedManagedEvents: (this: GuildHistoryCacheCategoryInstance) => number
  GetNumUnlinkedEvents: (this: GuildHistoryCacheCategoryInstance) => number
  GetOldestUnlinkedEventTime: (this: GuildHistoryCacheCategoryInstance) => number | undefined
  GetOldestUnlinkedEventIndex: (this: GuildHistoryCacheCategoryInstance) => number | undefined
  HasCachedEvents: (this: GuildHistoryCacheCategoryInstance) => boolean
  GetEvent: (this: GuildHistoryCacheCategoryInstance, i: number) => EventRef
  GetEventById: (this: GuildHistoryCacheCategoryInstance, eventId?: number) => EventRef | undefined
  GetOldestCachedEvent: (this: GuildHistoryCacheCategoryInstance) => EventRef | undefined
  GetLocalCacheTimeLimit: (this: GuildHistoryCacheCategoryInstance) => number
  GetCacheStartTime: (this: GuildHistoryCacheCategoryInstance) => number
  GetUnprocessedEventsStartTime: (this: GuildHistoryCacheCategoryInstance) => number | undefined
  GetGaplessRangeStartTime: (this: GuildHistoryCacheCategoryInstance) => number | undefined
  UpdateRangeInfo: (this: GuildHistoryCacheCategoryInstance) => void
  GetNumRanges: (this: GuildHistoryCacheCategoryInstance) => number
  GetRangeInfo: (
    this: GuildHistoryCacheCategoryInstance,
    index: number
  ) => LuaMultiReturn<
    [number | undefined, number | undefined, number | undefined, number | undefined]
  >
  FindRangeIndexForEventId: (
    this: GuildHistoryCacheCategoryInstance,
    eventId?: number
  ) => number | undefined
  GetIndexRangeForEventIdRange: (
    this: GuildHistoryCacheCategoryInstance,
    startId: number,
    endId: number
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  FindFirstAvailableEventIdForEventId: (
    this: GuildHistoryCacheCategoryInstance,
    eventId: number
  ) => number | undefined
  GetManagedRangeIndices: (
    this: GuildHistoryCacheCategoryInstance
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  SearchEventIdInInterval: (
    this: GuildHistoryCacheCategoryInstance,
    eventId: number,
    firstIndex: number,
    lastIndex: number
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  FindLastAvailableEventIdForEventId: (
    this: GuildHistoryCacheCategoryInstance,
    eventId: number
  ) => number | undefined
  FindFirstAvailableEventIdForEventTime: (
    this: GuildHistoryCacheCategoryInstance,
    eventTime: number
  ) => number | undefined
  FindLastAvailableEventIdForEventTime: (
    this: GuildHistoryCacheCategoryInstance,
    eventTime: number
  ) => number | undefined
  Clear: (this: GuildHistoryCacheCategoryInstance) => unknown
  GetDebugInfo: (this: GuildHistoryCacheCategoryInstance) => LuaTable<string, unknown>
}

export interface GuildHistoryCacheCategoryClass extends GuildHistoryCacheCategoryInstance {
  New: (
    this: GuildHistoryCacheCategoryClass,
    adapter: HistoryAdapterRef,
    requestManager: RequestManagerRef,
    categoryData: CategoryDataRef
  ) => GuildHistoryCacheCategoryInstance
}
