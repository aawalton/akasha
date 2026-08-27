import { afterEach, beforeEach, describe, expect, spyOn, test } from "bun:test"
import type { PageDataJSON } from "@shared/pages-core/types"
import type { ActionVerbContext } from "@shared/pages-ui/action-verbs/action-verb-registry"
import {
  IDLE_LOCK_STATE_LOCKED,
  IDLE_LOCK_STATE_UNLOCKED,
  IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
  IDLE_TRAIN10_VERB_ID,
} from "./idle-card-page-type"
import { idleGameStore } from "./idle-game-store"
import { train10FromCard, train10Presentation } from "./idle-train10-verb"

function ctx(data: PageDataJSON): ActionVerbContext {
  return {
    pageId: "card-page-id",
    pageTypeSlug: IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
    data,
    verbId: IDLE_TRAIN10_VERB_ID,
    config: { verbId: IDLE_TRAIN10_VERB_ID },
  }
}

describe("idle train10 verb — boundary parse + lock gate + store dispatch", () => {
  let dispatchSpy: ReturnType<typeof spyOn>
  beforeEach(() => {
    dispatchSpy = spyOn(idleGameStore, "dispatch").mockImplementation(() => {})
  })
  afterEach(() => {
    dispatchSpy.mockRestore()
  })

  test("unlocked card → dispatches {type:train10, slug}", () => {
    train10FromCard(ctx({ cardSlug: "nova", lockState: IDLE_LOCK_STATE_UNLOCKED }))
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "train10", slug: "nova" })
  })

  test("locked card → no dispatch (courtesy pre-gate; the store would reject it anyway)", () => {
    train10FromCard(ctx({ cardSlug: "nova", lockState: IDLE_LOCK_STATE_LOCKED }))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("missing slug → no dispatch (boundary parse, never throws)", () => {
    train10FromCard(ctx({ lockState: IDLE_LOCK_STATE_UNLOCKED }))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("the handler returns synchronously (fire-and-forget, not a promise)", () => {
    const result = train10FromCard(ctx({ cardSlug: "nova", lockState: IDLE_LOCK_STATE_UNLOCKED }))
    expect(result).toBeUndefined()
  })
})

describe("train10Presentation — pure per-card overlay (output depends only on ctx.data)", () => {
  const row = (
    over: { train10Cost?: number; train10Affordable?: boolean; lockState?: string } = {}
  ): PageDataJSON => ({
    train10Cost: 1000,
    train10Affordable: true,
    lockState: IDLE_LOCK_STATE_UNLOCKED,
    ...over,
  })

  test("reads the cumulative cost → +10 cost-bearing label (fmt parity)", () => {
    expect(train10Presentation(ctx(row({ train10Cost: 100 }))).label).toBe("+10 (100)")
    expect(train10Presentation(ctx(row({ train10Cost: 10_000 }))).label).toBe("+10 (10.0K)")
  })

  test("affordable + unlocked → enabled (disabled false)", () => {
    expect(train10Presentation(ctx(row({ train10Affordable: true }))).disabled).toBe(false)
  })

  test("unaffordable → disabled (the all-or-nothing signal)", () => {
    expect(train10Presentation(ctx(row({ train10Affordable: false }))).disabled).toBe(true)
  })

  test("locked → disabled even when the (irrelevant) cost is 'affordable'", () => {
    const p = train10Presentation(
      ctx(row({ lockState: IDLE_LOCK_STATE_LOCKED, train10Affordable: true }))
    )
    expect(p.disabled).toBe(true)
  })

  test("malformed data (missing the live flag) → no overlay; the static label stands", () => {
    expect(
      train10Presentation(ctx({ train10Cost: 100, lockState: IDLE_LOCK_STATE_UNLOCKED }))
    ).toEqual({})
  })
})
