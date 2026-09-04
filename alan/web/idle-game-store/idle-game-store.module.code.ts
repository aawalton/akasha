import { bankAccrual, normalizeGameState, withLatches } from "@akasha/idle-system/accrual"
import { parseIdleSave } from "@akasha/idle-system/save"
import type { GameState } from "@akasha/idle-system/state"
import { apiFetch } from "../api-fetch/api-fetch.module.code.ts"
import { type ActionIntent, actionKey } from "../idle-actions/idle-actions.module.code.ts"
import { commitIntent } from "../idle-apply/idle-apply.module.code.ts"

export type IdleStatus = "loading" | "signin" | "nosave" | "ready"
export type IdleActionError = { readonly key: string; readonly reason: string }

export type IdleBootKind = "ready" | "nosave" | "signin"

export type IdleGameSnapshot = {
  readonly status: IdleStatus
  readonly state: GameState | null
  readonly error: IdleActionError | null
}

export type IdleGameStore = {
  readonly subscribe: (listener: () => void) => () => void
  readonly getSnapshot: () => IdleGameSnapshot
  readonly dispatch: (intent: ActionIntent) => void
  readonly load: (rawSave: unknown, kind: IdleBootKind) => void
  readonly adoptServerSave: (rawSave: unknown) => void
  readonly flushPersist: () => Promise<void>
}

export type IdleFetch = (input: string, init?: RequestInit) => Promise<Response>

export type IdleGameStoreDeps = {
  readonly fetch?: IdleFetch
  readonly now?: () => number
  readonly persistDebounceMs?: number
}

const DEFAULT_PERSIST_DEBOUNCE_MS = 3000

export function createIdleGameStore(deps: IdleGameStoreDeps = {}): IdleGameStore {
  const doFetch: IdleFetch = deps.fetch ?? apiFetch
  const now = deps.now ?? (() => Date.now())
  const persistDebounceMs = deps.persistDebounceMs ?? DEFAULT_PERSIST_DEBOUNCE_MS

  let state: GameState | null = null
  let status: IdleStatus = "loading"
  let error: IdleActionError | null = null
  let snapshot: IdleGameSnapshot = { status, state: null, error: null }
  const listeners = new Set<() => void>()
  let persistTimer: ReturnType<typeof setTimeout> | null = null

  function recompute(): undefined {
    snapshot = { status, state, error }
    for (const listener of listeners) listener()
  }

  async function doPersist(): Promise<void> {
    if (state === null) return
    try {
      await doFetch("/api/save", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(state),
      })
    } catch {}
  }

  function schedulePersist(): undefined {
    if (persistTimer !== null) clearTimeout(persistTimer)
    persistTimer = setTimeout(() => {
      persistTimer = null
      void doPersist()
    }, persistDebounceMs)
  }

  return {
    subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    getSnapshot() {
      return snapshot
    },
    dispatch(intent) {
      if (state === null) return
      const { state: next, outcome } = commitIntent(state, intent, now())
      if (outcome.applied) {
        state = next
        error = null
        schedulePersist()
      } else {
        error = { key: actionKey(intent), reason: outcome.reason ?? "rejected" }
      }
      recompute()
    },
    load(rawSave, kind) {
      if (status === "ready") return
      if (kind === "ready") {
        state = withLatches(bankAccrual(normalizeGameState(parseIdleSave(rawSave)), now()))
        status = "ready"
        error = null
      } else {
        status = kind
      }
      recompute()
    },
    adoptServerSave(rawSave) {
      state = withLatches(bankAccrual(normalizeGameState(parseIdleSave(rawSave)), now()))
      status = "ready"
      error = null
      recompute()
    },
    async flushPersist() {
      if (persistTimer !== null) {
        clearTimeout(persistTimer)
        persistTimer = null
      }
      await doPersist()
    },
  }
}

export const idleGameStore = createIdleGameStore()
