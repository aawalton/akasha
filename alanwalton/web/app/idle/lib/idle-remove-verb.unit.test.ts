import { afterEach, beforeEach, describe, expect, spyOn, test } from "bun:test"
import type { PageDataJSON } from "@shared/pages-core/types"
import type { ActionVerbContext } from "@shared/pages-ui/action-verbs/action-verb-registry"
import { normalizeGameState } from "./core/accrual"
import { type GameState } from "./core/types"
import { IDLE_PERSONA_CARD_PAGE_TYPE_SLUG, IDLE_REMOVE_VERB_ID } from "./idle-card-page-type"
import { idleGameStore } from "./idle-game-store"
import { removeFromCard } from "./idle-remove-verb"
import { parseIdleSave } from "./idle-save"

function removeCtx(data: PageDataJSON): ActionVerbContext {
  return {
    pageId: "card-page-id",
    pageTypeSlug: IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
    data,
    verbId: IDLE_REMOVE_VERB_ID,
    config: { verbId: IDLE_REMOVE_VERB_ID },
  }
}

function stateWith(team: readonly string[]): GameState {
  return normalizeGameState(
    parseIdleSave({ resource: 0, lastTickAt: 0, teammates: [], activeTeam: [...team] })
  )
}

describe("removeFromCard — drops this card and dispatches the whole team", () => {
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

  test("seated card → dispatch {type:team, members: team minus slug}", () => {
    seed(stateWith(["aura", "abby", "ali"]))
    removeFromCard(removeCtx({ cardSlug: "abby" }))
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "team", members: ["aura", "ali"] })
  })

  test("card not on the team → no dispatch (no-op removal)", () => {
    seed(stateWith(["aura", "ali"]))
    removeFromCard(removeCtx({ cardSlug: "abby" }))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("missing slug → no dispatch (boundary parse, never throws)", () => {
    seed(stateWith(["aura", "abby"]))
    removeFromCard(removeCtx({ stars: 3 }))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("no live state yet (null) → no dispatch", () => {
    seed(null)
    removeFromCard(removeCtx({ cardSlug: "abby" }))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })
})
