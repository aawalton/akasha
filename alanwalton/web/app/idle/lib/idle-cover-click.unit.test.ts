import { afterEach, describe, expect, test } from "bun:test"
import type { PageDataJSON } from "@shared/pages-core/types"
import type { CoverClickContext } from "@shared/pages-ui/cover-click/cover-click-registry"
import {
  IDLE_LOCK_STATE_LOCKED,
  IDLE_LOCK_STATE_UNLOCKED,
  IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
} from "./idle-card-page-type"
import { maskLockedRosterCover, openRosterGalleryFromCover } from "./idle-cover-click"
import { closeRosterGallery, getRosterGallerySnapshot } from "./roster-gallery-store"

function coverCtx(data: PageDataJSON): CoverClickContext {
  return { pageId: "card-page-id", pageTypeSlug: IDLE_PERSONA_CARD_PAGE_TYPE_SLUG, data }
}

describe("cover-click handler — opens the gallery for the clicked girl (#13944)", () => {
  afterEach(() => {
    closeRosterGallery()
  })

  test("opens the roster gallery for an unlocked card's slug", () => {
    openRosterGalleryFromCover(coverCtx({ cardSlug: "nova", lockState: IDLE_LOCK_STATE_UNLOCKED }))
    expect(getRosterGallerySnapshot()).toBe("nova")
  })

  test("no-ops for a LOCKED card (gacha-masked — cover is not a picker)", () => {
    openRosterGalleryFromCover(coverCtx({ cardSlug: "nova", lockState: IDLE_LOCK_STATE_LOCKED }))
    expect(getRosterGallerySnapshot()).toBeNull()
  })

  test("no-ops (never throws) when the card carries no slug (boundary parse)", () => {
    openRosterGalleryFromCover(coverCtx({ lockState: IDLE_LOCK_STATE_UNLOCKED }))
    expect(getRosterGallerySnapshot()).toBeNull()
  })
})

describe("cover-mask resolver — locked cards render the neutral ⚿ placeholder (#14184)", () => {
  test("LOCKED card → the ⚿ mask glyph (the reward art never renders)", () => {
    expect(maskLockedRosterCover(coverCtx({ lockState: IDLE_LOCK_STATE_LOCKED }))).toBe("⚿")
  })

  test("UNLOCKED card → no mask (real cover renders)", () => {
    expect(maskLockedRosterCover(coverCtx({ lockState: IDLE_LOCK_STATE_UNLOCKED }))).toBeNull()
  })

  test("missing lockState → masked (fail-closed: never leak the reward)", () => {
    expect(maskLockedRosterCover(coverCtx({}))).toBe("⚿")
  })
})
