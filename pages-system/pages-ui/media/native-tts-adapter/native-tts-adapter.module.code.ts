export type NativeTtsEvent =
  | { readonly type: "progress"; readonly positionFraction: number; readonly playedSeconds: number }
  | { readonly type: "waiting" }
  | { readonly type: "playing" }
  | { readonly type: "ended" }
  | { readonly type: "error"; readonly message: string }
  | { readonly type: "downloadProgress"; readonly received: number; readonly total: number }

export interface NativeTtsAdapter {
  readonly prepare: () => Promise<void>
  readonly startChapter: (opts: {
    readonly chapterId: string
    readonly text: string
    readonly startFraction?: number
    readonly rate?: number
  }) => Promise<void>
  readonly pause: () => Promise<void>
  readonly resume: () => Promise<void>
  readonly stop: () => Promise<void>
  readonly seek: (fraction: number) => Promise<void>
  readonly setRate: (rate: number) => Promise<void>
  readonly subscribe: (listener: (event: NativeTtsEvent) => void) => () => void
}
