export interface ErrorEntry {
  traceback?: string | null
  message: string
  count: number
  firstSeenAt: number
  lastSeenAt: number
  account: string
  character: string
  world: string
  esoVersion: string
  apiVersion: number
  eventCode: number
  errorCode?: number
  attributedAddon?: string
  attributedBuildId?: string
  buildIds?: Record<string, string>
}

export interface ErrorsPayload {
  version?: number
  entries?: ErrorEntry[]
}
