import { afterEach, beforeEach, describe, expect, spyOn, test } from "bun:test"
import type { PageDataJSON } from "@shared/pages-core/types"
import type { ActionVerbContext } from "@shared/pages-ui/action-verbs/action-verb-registry"
import {
  IDLE_LOCK_STATE_LOCKED,
  IDLE_LOCK_STATE_UNLOCKED,
  IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
  IDLE_TRAIN_VERB_ID,
} from "./idle-card-page-type"
import { idleGameStore } from "./idle-game-store"
import { trainFromCard, trainPresentation } from "./idle-train-verb"

function trainCtx(data: PageDataJSON): ActionVerbContext {
  return {
    pageId: "card-page-id",
    pageTypeSlug: IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
    data,
    verbId: IDLE_TRAIN_VERB_ID,
    config: { verbId: IDLE_TRAIN_VERB_ID },
  }
}

describe("idle train verb — boundary parse + lock gate + store dispatch", () => {
  let dispatchSpy: ReturnType<typeof spyOn>
  beforeEach(() => {
    dispatchSpy = spyOn(idleGameStore, "dispatch").mockImplementation(() => {})
  })
  afterEach(() => {
    dispatchSpy.mockRestore()
  })

  test("unlocked card → dispatches {type:train, slug}", () => {
    trainFromCard(trainCtx({ cardSlug: "nova", lockState: IDLE_LOCK_STATE_UNLOCKED }))
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "train", slug: "nova" })
  })

  test("locked card → no dispatch (the client store would reject it anyway)", () => {
    trainFromCard(trainCtx({ cardSlug: "nova", lockState: IDLE_LOCK_STATE_LOCKED }))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("missing slug → no dispatch (boundary parse, never throws)", () => {
    trainFromCard(trainCtx({ lockState: IDLE_LOCK_STATE_UNLOCKED }))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("the handler returns synchronously (fire-and-forget, not a promise)", () => {
    const result = trainFromCard(
      trainCtx({ cardSlug: "nova", lockState: IDLE_LOCK_STATE_UNLOCKED })
    )
    expect(result).toBeUndefined()
  })
})

describe("trainPresentation — pure per-card overlay (output depends only on ctx.data)", () => {
  test("reads the projected trainCost → cost-bearing label", () => {
    expect(trainPresentation(trainCtx({ trainCost: 100 }))).toEqual({ label: "Train (100)" })
  })

  test("short 3-sig-fig cost label above 1e3 (fmt parity with draw)", () => {
    expect(trainPresentation(trainCtx({ trainCost: 10_000 })).label).toBe("Train (10.0K)")
  })

  test("no affordability disabled — the card row carries no spendable resource", () => {
    expect(trainPresentation(trainCtx({ trainCost: 100 }))).not.toHaveProperty("disabled")
  })

  test("malformed data (no trainCost) → no overlay (never throws; the static label stands)", () => {
    expect(trainPresentation(trainCtx({ lockState: IDLE_LOCK_STATE_UNLOCKED }))).toEqual({})
  })
})
