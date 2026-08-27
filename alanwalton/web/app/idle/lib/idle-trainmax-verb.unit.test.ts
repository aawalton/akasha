import { afterEach, beforeEach, describe, expect, spyOn, test } from "bun:test"
import type { PageDataJSON } from "@shared/pages-core/types"
import type { ActionVerbContext } from "@shared/pages-ui/action-verbs/action-verb-registry"
import {
  IDLE_LOCK_STATE_LOCKED,
  IDLE_LOCK_STATE_UNLOCKED,
  IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
  IDLE_TRAINMAX_VERB_ID,
} from "./idle-card-page-type"
import { idleGameStore } from "./idle-game-store"
import { trainMaxFromCard, trainMaxPresentation } from "./idle-trainmax-verb"

function ctx(data: PageDataJSON): ActionVerbContext {
  return {
    pageId: "card-page-id",
    pageTypeSlug: IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
    data,
    verbId: IDLE_TRAINMAX_VERB_ID,
    config: { verbId: IDLE_TRAINMAX_VERB_ID },
  }
}

describe("idle trainMax verb — boundary parse + lock gate + store dispatch", () => {
  let dispatchSpy: ReturnType<typeof spyOn>
  beforeEach(() => {
    dispatchSpy = spyOn(idleGameStore, "dispatch").mockImplementation(() => {})
  })
  afterEach(() => {
    dispatchSpy.mockRestore()
  })

  test("unlocked card → dispatches {type:trainMax, slug}", () => {
    trainMaxFromCard(ctx({ cardSlug: "nova", lockState: IDLE_LOCK_STATE_UNLOCKED }))
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "trainMax", slug: "nova" })
  })

  test("locked card → no dispatch (courtesy pre-gate; the store would reject it anyway)", () => {
    trainMaxFromCard(ctx({ cardSlug: "nova", lockState: IDLE_LOCK_STATE_LOCKED }))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("missing slug → no dispatch (boundary parse, never throws)", () => {
    trainMaxFromCard(ctx({ lockState: IDLE_LOCK_STATE_UNLOCKED }))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("the handler returns synchronously (fire-and-forget, not a promise)", () => {
    const result = trainMaxFromCard(ctx({ cardSlug: "nova", lockState: IDLE_LOCK_STATE_UNLOCKED }))
    expect(result).toBeUndefined()
  })
})

describe("trainMaxPresentation — pure per-card overlay (output depends only on ctx.data)", () => {
  const row = (
    over: { trainMaxCount?: number; trainMaxCost?: number; lockState?: string } = {}
  ): PageDataJSON => ({
    trainMaxCount: 3,
    trainMaxCost: 1000,
    lockState: IDLE_LOCK_STATE_UNLOCKED,
    ...over,
  })

  test("reads the live count + cost → Max <count> (<cost>) label (fmt parity)", () => {
    expect(trainMaxPresentation(ctx(row({ trainMaxCount: 3, trainMaxCost: 100 }))).label).toBe(
      "Max 3 (100)"
    )
    expect(trainMaxPresentation(ctx(row({ trainMaxCount: 42, trainMaxCost: 10_000 }))).label).toBe(
      "Max 42 (10.0K)"
    )
  })

  test("affordable (count > 0) + unlocked → enabled (disabled false)", () => {
    expect(trainMaxPresentation(ctx(row({ trainMaxCount: 5 }))).disabled).toBe(false)
  })

  test("zero affordable (count 0) → disabled, and the label falls back to bare 'Max'", () => {
    const p = trainMaxPresentation(ctx(row({ trainMaxCount: 0, trainMaxCost: 0 })))
    expect(p.disabled).toBe(true)
    expect(p.label).toBe("Max")
  })

  test("locked → disabled even when the (irrelevant) count is positive", () => {
    const p = trainMaxPresentation(
      ctx(row({ lockState: IDLE_LOCK_STATE_LOCKED, trainMaxCount: 5 }))
    )
    expect(p.disabled).toBe(true)
  })

  test("malformed data (missing the live count) → no overlay; the static label stands", () => {
    expect(
      trainMaxPresentation(ctx({ trainMaxCost: 100, lockState: IDLE_LOCK_STATE_UNLOCKED }))
    ).toEqual({})
  })
})
