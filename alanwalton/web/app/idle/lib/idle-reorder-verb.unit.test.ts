import { afterEach, beforeEach, describe, expect, spyOn, test } from "bun:test"
import type { ReorderVerbContext } from "@shared/pages-ui/reorder-verbs/reorder-verb-registry"
import { normalizeGameState } from "./core/accrual"
import { type GameState } from "./core/types"
import { IDLE_PERSONA_CARD_PAGE_TYPE_SLUG } from "./idle-card-page-type"
import { idleGameStore } from "./idle-game-store"
import { IDLE_REORDER_VERB_ID } from "./idle-lineup-view-config"
import { reorderLineup } from "./idle-reorder-verb"
import { parseIdleSave } from "./idle-save"

function reorderCtx(fromIndex: number, toIndex: number): ReorderVerbContext {
  return {
    orderedIds: ["row-x", "row-y", "row-z"],
    fromIndex,
    toIndex,
    viewId: "lineup-view-id",
    pageTypeSlug: IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
  }
}

function stateWith(team: readonly string[]): GameState {
  return normalizeGameState(
    parseIdleSave({ resource: 0, lastTickAt: 0, teammates: [], activeTeam: [...team] })
  )
}

describe("reorderLineup — arrayMove on the store's live team, dispatch whole array", () => {
  let dispatchSpy: ReturnType<typeof spyOn>
  let snapSpy: ReturnType<typeof spyOn> | undefined
  beforeEach(() => {
    dispatchSpy = spyOn(idleGameStore, "dispatch").mockImplementation(() => {})
  })
  afterEach(() => {
    dispatchSpy.mockRestore()
    snapSpy?.mockRestore()
    snapSpy = undefined
  })

  function seed(state: GameState | null): undefined {
    snapSpy = spyOn(idleGameStore, "getSnapshot").mockReturnValue({
      status: "ready",
      state,
      error: null,
    })
  }

  test("move 0→2 → dispatch {type:team, members: reordered}", () => {
    seed(stateWith(["aura", "abby", "ali"]))
    reorderLineup(reorderCtx(0, 2))
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "team", members: ["abby", "ali", "aura"] })
  })

  test("uses the live team, IGNORING orderedIds (position-only move)", () => {
    seed(stateWith(["aura", "abby", "ali"]))
    reorderLineup(reorderCtx(2, 0))
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "team", members: ["ali", "aura", "abby"] })
  })

  test("no-op move (same index) → no dispatch", () => {
    seed(stateWith(["aura", "abby", "ali"]))
    reorderLineup(reorderCtx(1, 1))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("out-of-range index → no dispatch (reorderTeam returns identity)", () => {
    seed(stateWith(["aura", "abby"]))
    reorderLineup(reorderCtx(0, 5))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("no live state yet (null) → no dispatch", () => {
    seed(null)
    reorderLineup(reorderCtx(0, 1))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("the verb id the view config names matches this module's registration key", () => {
    expect(IDLE_REORDER_VERB_ID).toBe("idle-lineup-reorder")
  })
})
