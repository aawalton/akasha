export type TriggerReturn = "NEW" | "OLD" | "NULL"

export type TriggerNew<T> = T

export type TriggerOld<T> = Readonly<T>

export interface TriggerProcCtx<T> {
  NEW: TriggerNew<T>
  readonly OLD: TriggerOld<T> | null
  readonly now: () => string
  readonly notify: (channel: string, payload: string) => undefined
  readonly currentSetting: (key: string, missingOk: boolean) => string | null
}
