import { useSyncExternalStore } from "react"
import type { ActionIntent } from "../idle-actions/idle-actions.module.code.ts"
import { idleGameStore } from "../idle-game-store/idle-game-store.module.code.ts"

export type ActionError = { readonly key: string; readonly reason: string }

export type IdleActions = {
  readonly error: ActionError | null
  readonly dispatch: (intent: ActionIntent) => void
  readonly train: (slug: string) => void
  readonly selectImage: (slug: string, image: string) => void
  readonly setTeam: (members: readonly string[]) => void
  readonly ascend: (boon?: string) => void
  readonly specialize: (slug: string) => void
  readonly unspecialize: (slug: string) => void
  readonly perk: (slug: string) => void
  readonly apotheosis: () => void
}

function dispatch(intent: ActionIntent): undefined {
  idleGameStore.dispatch(intent)
}
function train(slug: string): undefined {
  idleGameStore.dispatch({ type: "train", slug })
}
function selectImage(slug: string, image: string): undefined {
  idleGameStore.dispatch({ type: "selectImage", slug, image })
}
function setTeam(members: readonly string[]): undefined {
  idleGameStore.dispatch({ type: "team", members: [...members] })
}
function ascend(boon?: string): undefined {
  idleGameStore.dispatch(boon === undefined ? { type: "ascend" } : { type: "ascend", boon })
}
function specialize(slug: string): undefined {
  idleGameStore.dispatch({ type: "specialize", slug })
}
function unspecialize(slug: string): undefined {
  idleGameStore.dispatch({ type: "unspecialize", slug })
}
function perk(slug: string): undefined {
  idleGameStore.dispatch({ type: "perk", slug })
}
function apotheosis(): undefined {
  idleGameStore.dispatch({ type: "apotheosis" })
}

export function useIdleActions(): IdleActions {
  const snap = useSyncExternalStore(
    idleGameStore.subscribe,
    idleGameStore.getSnapshot,
    idleGameStore.getSnapshot
  )
  return {
    error: snap.error,
    dispatch,
    train,
    selectImage,
    setTeam,
    ascend,
    specialize,
    unspecialize,
    perk,
    apotheosis,
  }
}
