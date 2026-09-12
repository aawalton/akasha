export interface PerfSlot {
  perf?: { loadTimeMs: number }
}

export interface CaptureDescriptor<T extends object> {
  readonly addonName: string
  readonly savedVariablesName: string
  readonly version: number | string
  readonly defaults: T
  readonly perf?: boolean
}

export const CAPTURE_ENVELOPE_DEFAULT_KEY = "Default"
export const CAPTURE_ENVELOPE_ACCOUNT_WIDE_KEY = "$AccountWide"
export const CAPTURE_ENVELOPE_ACCOUNT_PREFIX = "@"

export interface CaptureEnvelope<Payload> {
  Default?: Record<string, { $AccountWide?: Payload }>
}
