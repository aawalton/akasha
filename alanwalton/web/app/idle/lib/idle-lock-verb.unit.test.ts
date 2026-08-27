import { afterEach, beforeEach, describe, expect, spyOn, test } from "bun:test"
import type { PageDataJSON } from "@shared/pages-core/types"
import type { ActionVerbContext } from "@shared/pages-ui/action-verbs/action-verb-registry"
import { IDLE_LOCK_VERB_ID, IDLE_PERSONA_CARD_PAGE_TYPE_SLUG } from "./idle-card-page-type"
import { idleGameStore } from "./idle-game-store"
import { lockFromCard, lockPresentation } from "./idle-lock-verb"

function lockCtx(data: PageDataJSON): ActionVerbContext {
  return {
    pageId: "card-page-id",
    pageTypeSlug: IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
    data,
    verbId: IDLE_LOCK_VERB_ID,
    config: { verbId: IDLE_LOCK_VERB_ID },
  }
}

describe("lockPresentation — pure per-row overlay (output depends only on ctx.data)", () => {
  test("eligible + unlocked → enabled, Lock/lock", () => {
    expect(
      lockPresentation(lockCtx({ cardSlug: "nova", lockEligible: true, specializeLocked: false }))
    ).toEqual({ disabled: false, label: "Lock", icon: "lock" })
  })

  test("eligible + locked → enabled, Unlock/lock-open (label + icon toggle)", () => {
    expect(
      lockPresentation(lockCtx({ cardSlug: "nova", lockEligible: true, specializeLocked: true }))
    ).toEqual({ disabled: false, label: "Unlock", icon: "lock-open" })
  })

  test("ineligible → disabled (add-only: the overlay can never force-enable)", () => {
    const pres = lockPresentation(
      lockCtx({ cardSlug: "nova", lockEligible: false, specializeLocked: false })
    )
    expect(pres.disabled).toBe(true)
    expect(pres.label).toBe("Lock")
  })

  test("malformed data → safe disabled default (never throws)", () => {
    const pres = lockPresentation(lockCtx({ stars: 3 }))
    expect(pres.disabled).toBe(true)
    expect(pres.label).toBe("Lock")
    expect(pres.icon).toBe("lock")
  })
})

describe("lockFromCard — dispatches specialize/unspecialize by the current latch", () => {
  let dispatchSpy: ReturnType<typeof spyOn>
  beforeEach(() => {
    dispatchSpy = spyOn(idleGameStore, "dispatch").mockImplementation(() => {})
  })
  afterEach(() => {
    dispatchSpy.mockRestore()
  })

  test("eligible + unlocked → dispatch {type:specialize, slug}", () => {
    lockFromCard(lockCtx({ cardSlug: "nova", lockEligible: true, specializeLocked: false }))
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "specialize", slug: "nova" })
  })

  test("eligible + locked → dispatch {type:unspecialize, slug}", () => {
    lockFromCard(lockCtx({ cardSlug: "nova", lockEligible: true, specializeLocked: true }))
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "unspecialize", slug: "nova" })
  })

  test("ineligible card → no dispatch (the client store's commitIntent would reject it anyway)", () => {
    lockFromCard(lockCtx({ cardSlug: "nova", lockEligible: false, specializeLocked: false }))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  test("missing slug → no dispatch (boundary parse, never throws)", () => {
    lockFromCard(lockCtx({ lockEligible: true, specializeLocked: false }))
    expect(dispatchSpy).not.toHaveBeenCalled()
  })
})
