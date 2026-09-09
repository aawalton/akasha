interface LibMapPingState {
  readonly NOT_SET: number
  readonly NOT_SET_PENDING: number
  readonly SET_PENDING: number
  readonly SET: number
}

interface LibMapPingCallbacks {
  readonly BEFORE_PING_ADDED: string
  readonly AFTER_PING_ADDED: string
  readonly BEFORE_PING_REMOVED: string
  readonly AFTER_PING_REMOVED: string
}

interface LibMapPing2 {
  readonly MapPingState: LibMapPingState
  readonly callback: LibMapPingCallbacks

  SetMapPing: (
    this: LibMapPing2,
    pingType: number | false,
    mapTypeOrWorldX: number,
    xOrWorldY: number,
    yOrWorldZ: number
  ) => boolean | undefined
  RemoveMapPing: (this: LibMapPing2, pingType: number) => void
  GetMapPing: (
    this: LibMapPing2,
    pingType: number,
    pingTag?: string
  ) => LuaMultiReturn<[number, number]>
  GetRawMapPing: (
    this: LibMapPing2,
    pingType: number,
    pingTag?: string
  ) => LuaMultiReturn<[number, number]>
  GetMapPingState: (this: LibMapPing2, pingType: number, pingTag?: string) => number
  HasMapPing: (this: LibMapPing2, pingType: number, pingTag?: string) => boolean
  RefreshMapPin: (this: LibMapPing2, pingType: number, pingTag?: string) => boolean
  IsPositionOnMap: (this: LibMapPing2, x: number, y: number) => boolean
  MutePing: (this: LibMapPing2, pingType: number, pingTag?: string) => void
  UnmutePing: (this: LibMapPing2, pingType: number, pingTag?: string) => void
  IsPingMuted: (this: LibMapPing2, pingType: number, pingTag?: string) => boolean | undefined
  SuppressPing: (this: LibMapPing2, pingType: number, pingTag?: string) => void
  UnsuppressPing: (this: LibMapPing2, pingType: number, pingTag?: string) => void
  IsPingSuppressed: (this: LibMapPing2, pingType: number, pingTag?: string) => boolean
  RegisterCallback: (
    this: LibMapPing2,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
  UnregisterCallback: (
    this: LibMapPing2,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
}

interface LibMapPing {
  readonly MAP_PING_NOT_SET: number
  readonly MAP_PING_NOT_SET_PENDING: number
  readonly MAP_PING_SET_PENDING: number
  readonly MAP_PING_SET: number

  SetMapPing: (this: LibMapPing, pingType: number, mapType: number, x: number, y: number) => unknown
  RemoveMapPing: (this: LibMapPing, pingType: number) => void
  GetMapPing: (
    this: LibMapPing,
    pingType: number,
    pingTag?: string
  ) => LuaMultiReturn<[number, number]>
  GetMapPingState: (this: LibMapPing, pingType: number, pingTag?: string) => number
  HasMapPing: (this: LibMapPing, pingType: number, pingTag?: string) => boolean
  RefreshMapPin: (this: LibMapPing, pingType: number, pingTag?: string) => boolean
  IsPositionOnMap: (this: LibMapPing, x: number, y: number) => boolean
  MutePing: (this: LibMapPing, pingType: number, pingTag?: string) => void
  UnmutePing: (this: LibMapPing, pingType: number, pingTag?: string) => void
  IsPingMuted: (this: LibMapPing, pingType: number, pingTag?: string) => boolean | undefined
  SuppressPing: (this: LibMapPing, pingType: number, pingTag?: string) => void
  UnsuppressPing: (this: LibMapPing, pingType: number, pingTag?: string) => void
  IsPingSuppressed: (this: LibMapPing, pingType: number, pingTag?: string) => boolean
  RegisterCallback: (
    this: LibMapPing,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
  UnregisterCallback: (
    this: LibMapPing,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
}

declare const LibMapPing2: LibMapPing2
declare const LibMapPing: LibMapPing
