import {
  IDLE_LOCK_STATE_UNLOCKED,
  IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
  ROSTER_GALLERY_CAPABILITY,
} from "akasha/alan/web/idle-card-page-type/idle-card-page-type.module.code.ts"
import { openRosterGallery } from "akasha/alan/web/roster-gallery-store/roster-gallery-store.module.code.ts"
import {
  type CoverClickContext,
  registerCoverClickHandler,
} from "akasha/pages/ui/cover-click/cover-click-registry/cover-click-registry.module.code.ts"
import { registerCoverMask } from "akasha/pages/ui/cover-click/cover-mask-registry/cover-mask-registry.module.code.ts"
import { z } from "zod"

const coverCardSchema = z.object({ cardSlug: z.string().min(1), lockState: z.string() }).partial()

function openRosterGalleryFromCover(ctx: CoverClickContext): undefined {
  const parsed = coverCardSchema.safeParse(ctx.data)
  if (!parsed.success) return
  const { cardSlug, lockState } = parsed.data
  if (cardSlug === undefined || lockState !== IDLE_LOCK_STATE_UNLOCKED) return
  openRosterGallery(cardSlug)
}

registerCoverClickHandler(ROSTER_GALLERY_CAPABILITY, openRosterGalleryFromCover)

function maskLockedRosterCover(ctx: CoverClickContext): string | null {
  const parsed = coverCardSchema.safeParse(ctx.data)
  if (!parsed.success) return "⚿"
  return parsed.data.lockState === IDLE_LOCK_STATE_UNLOCKED ? null : "⚿"
}

registerCoverMask(IDLE_PERSONA_CARD_PAGE_TYPE_SLUG, maskLockedRosterCover)
