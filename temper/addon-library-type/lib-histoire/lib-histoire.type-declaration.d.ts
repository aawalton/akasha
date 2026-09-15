interface GuildHistoryTraderEventInfo {
  sellerDisplayName: string
  buyerDisplayName: string
  quantity: number
  itemLink: string
  price: number
  tax: number
}

interface GuildHistoryEventRef {
  GetEventId: () => Id64
  GetEventType: () => number
  GetEventTimestampS: () => number
  GetEventInfo: () => GuildHistoryTraderEventInfo | undefined
}

interface GuildHistoryEventProcessor {
  SetEventCallback: (cb: (this: void, event: GuildHistoryEventRef) => void) => boolean
  SetStopOnLastCachedEvent: (stop: boolean) => boolean
  SetOnStopCallback: (cb: (this: void, reason: number) => void) => boolean
  StartStreaming: (afterEventId?: Id64, onRegisteredForFuture?: (this: void) => void) => boolean
  Stop: () => void
  IsRunning: () => boolean
}

interface LibHistoireApi {
  internal: Record<string, unknown>
  IsReady: () => boolean
  OnReady: (cb: (this: void, lib: LibHistoireApi) => void) => void
  CreateGuildHistoryProcessor: (
    guildId: number,
    category: number,
    addonName: string
  ) => GuildHistoryEventProcessor | undefined
  [key: string]: unknown
}

declare const LibHistoire: LibHistoireApi | undefined
