import {
  type CoverClickContext,
  registerCoverClickHandler,
} from "@akasha/pages-ui/cover-click/cover-click-registry"
import { registerCoverMask } from "@akasha/pages-ui/cover-click/cover-mask-registry"
import { z } from "zod"
import {
  IDLE_LOCK_STATE_UNLOCKED,
  IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
  ROSTER_GALLERY_CAPABILITY,
} from "../idle-card-page-type/idle-card-page-type.module.code.ts"
import { openRosterGallery } from "../roster-gallery-store/roster-gallery-store.module.code.ts"

const coverCardSchema = z.object({ cardSlug: z.string().min(1), lockState: z.string() }).partial()

export function openRosterGalleryFromCover(ctx: CoverClickContext): undefined {
  const parsed = coverCardSchema.safeParse(ctx.data)
  if (!parsed.success) return
  const { cardSlug, lockState } = parsed.data
  if (cardSlug === undefined || lockState !== IDLE_LOCK_STATE_UNLOCKED) return
  openRosterGallery(cardSlug)
}

registerCoverClickHandler(ROSTER_GALLERY_CAPABILITY, openRosterGalleryFromCover)

export function maskLockedRosterCover(ctx: CoverClickContext): string | null {
  const parsed = coverCardSchema.safeParse(ctx.data)
  if (!parsed.success) return "⚿"
  return parsed.data.lockState === IDLE_LOCK_STATE_UNLOCKED ? null : "⚿"
}

registerCoverMask(IDLE_PERSONA_CARD_PAGE_TYPE_SLUG, maskLockedRosterCover)
