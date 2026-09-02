import type { GuildHistoryCacheCategoryInstance } from "../histoire-category-class-shape/histoire-category-class-shape.module.code.ts"

export interface CacheSaveData {
  newestManagedEventTime?: number
  newestManagedEventId?: number
  oldestManagedEventTime?: number
  oldestManagedEventId?: number
  initialRequestTime?: number
  lastProcessorRegisteredTime?: number
  lastLinkedTime?: number
  requestMode?: string
  [key: string]: unknown
}

export type RangeTuple = [number, number, number, number]

export interface HistoryAdapterRef {
  GetOrCreateCacheSaveData: (this: HistoryAdapterRef, key: string) => CacheSaveData
  GetGuildHistoryEventIndicesForTimeRange: (
    this: HistoryAdapterRef,
    guildId: number,
    category: number,
    newestTime: number,
    oldestTime: number
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  GetGuildHistoryCacheMaxTime: (this: HistoryAdapterRef, category: number) => number
  GetGuildHistoryServerMaxTime: (this: HistoryAdapterRef, category: number) => number
}

export interface RequestManagerRef {
  QueueRequest: (this: RequestManagerRef, request: ServerRequestRef) => void
  RemoveRequest: (this: RequestManagerRef, request: ServerRequestRef) => void
}

export interface ServerRequestRef {
  IsInitialRequest: (this: ServerRequestRef) => boolean
  ShouldContinue: (this: ServerRequestRef) => boolean
  IsComplete: (this: ServerRequestRef) => boolean
  IsValid: (this: ServerRequestRef) => boolean
  IsRequestQueued: (this: ServerRequestRef) => boolean
  Destroy: (this: ServerRequestRef) => boolean
  GetOldestTime: (this: ServerRequestRef) => number | undefined
  GetNewestTime: (this: ServerRequestRef) => number | undefined
  GetDebugInfo: (this: ServerRequestRef) => unknown
}

export interface ServerRequestClassRef {
  New: (
    this: ServerRequestClassRef,
    cache: GuildHistoryCacheCategoryInstance,
    newestTime?: number,
    oldestTime?: number
  ) => ServerRequestRef
}

export interface ProcessingRequestRef {
  StartProcessing: (this: ProcessingRequestRef) => void
  StopProcessing: (this: ProcessingRequestRef) => void
  GetDebugInfo: (this: ProcessingRequestRef) => unknown
}

export interface ProcessorRef {
  GetAddonName?: (this: ProcessorRef) => string
  StopInternal: (this: ProcessorRef, reason: string) => void
}

export interface PerformanceTrackerRef {
  Reset: (this: PerformanceTrackerRef) => void
  Increment: (this: PerformanceTrackerRef) => void
  GetProcessingSpeedAndEstimatedTimeLeft: (
    this: PerformanceTrackerRef,
    count: number
  ) => LuaMultiReturn<[number, number]>
}

export interface PerformanceTrackerClassRef {
  New: (this: PerformanceTrackerClassRef) => PerformanceTrackerRef
}

export interface EventRef {
  GetEventId: (this: EventRef) => number
  GetEventTimestampS: (this: EventRef) => number
}

export interface CategoryDataRef {
  GetGuildData: (this: CategoryDataRef) => GuildDataRef
  GetEventCategory: (this: CategoryDataRef) => number
  GetEventsInTimeRange: (
    this: CategoryDataRef,
    newestTime: number,
    oldestTime: number
  ) => EventRef[]
  GetNumEvents: (this: CategoryDataRef) => number
  GetEvent: (this: CategoryDataRef, index: number) => EventRef
  GetOldestEventForUpToDateEventsWithoutGaps: (this: CategoryDataRef) => EventRef | undefined
}

export interface GuildDataRef {
  GetId: (this: GuildDataRef) => number
}

export interface ProgressBarRef {
  Update: (this: ProgressBarRef, cache: GuildHistoryCacheCategoryInstance) => void
}
