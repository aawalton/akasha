import type { TriggerProcCtx } from "@shared/proc-compiler/trigger-ctx"

export type QueryFn = (sql: string, params?: readonly unknown[]) => Promise<unknown>

export function createTriggerCtx<T>(opts: {
  NEW: T
  OLD?: Readonly<T> | null
  query: QueryFn
  settings?: Readonly<Record<string, string>>
}): TriggerProcCtx<T> & { flushNotifies: () => Promise<void> } {
  const pending: Promise<unknown>[] = []
  const settings = opts.settings ?? {}
  const ctx: TriggerProcCtx<T> & { flushNotifies: () => Promise<void> } = {
    NEW: opts.NEW,
    OLD: opts.OLD ?? null,
    now: (): string => new Date().toISOString(),
    notify: (channel: string, payload: string): undefined => {
      pending.push(opts.query(`SELECT pg_notify($1, $2)`, [channel, payload]))
    },
    currentSetting: (key: string, missingOk: boolean): string | null => {
      const value = settings[key]
      if (value !== undefined) return value
      if (missingOk) return null
      throw new Error(`current_setting: unrecognized configuration parameter "${key}"`)
    },
    flushNotifies: async (): Promise<void> => {
      const all = pending.splice(0, pending.length)
      await Promise.all(all)
    },
  }
  return ctx
}
