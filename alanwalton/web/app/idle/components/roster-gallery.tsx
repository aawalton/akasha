import { Dialog, DialogBody, DialogContent, DialogTitle } from "@shared/design-primitives/components/dialog"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { DegradingImage } from "@shared/pages-ui/components/degrading-image"
import { useEffect, useSyncExternalStore } from "react"
import { ErrorMessage } from "~/idle/components/error-message"
import { BASE_IMAGE_ID } from "../lib/core/constants"
import { formatShortNumber as fmt } from "@shared/pages-core/property-types/number"
import {
  ensureCatalogLoaded,
  getCatalogSnapshot,
  subscribeCatalog,
} from "~/idle/lib/idle-catalog-store"
import { idleGameStore } from "~/idle/lib/idle-game-store"
import { portraitSrc } from "~/idle/lib/portrait"
import {
  closeRosterGallery,
  getRosterGallerySnapshot,
  subscribeRosterGallery,
} from "~/idle/lib/roster-gallery-store"
import {
  deriveCollectionCounts,
  deriveRosterView,
  deriveVariantIds,
  type GirlCardVM,
  hasBaseCover,
} from "~/idle/lib/roster-view"
import { type IdleActions, useIdleActions } from "~/idle/lib/use-idle-actions"

function imageSrc(id: string): string {
  return `/api/image/${id}`
}

type GalleryActions = Pick<IdleActions, "selectImage" | "error">

export function GalleryGrid({
  card,
  actions,
  onClose,
}: {
  card: GirlCardVM
  actions: GalleryActions
  onClose: () => void
}) {
  const surface = useSurface()
  const owned = new Set(card.images)
  const variantIds = deriveVariantIds(card)
  const hasBase = hasBaseCover(card)
  const { collected: collectedCount, total: totalCount } = deriveCollectionCounts(card)
  const selectError =
    actions.error?.key === `selectImage:${card.slug}` ? actions.error.reason : null
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono font-semibold text-primary">{card.name}</span>
          <span className="font-mono text-tertiary text-xs tabular-nums">
            {`${fmt(collectedCount)} / ${fmt(totalCount)} collected`}
          </span>
        </div>
        <button
          type="button"
          aria-label="Close gallery"
          onClick={onClose}
          className="font-mono text-secondary text-sm hover:text-primary"
        >
          ✕
        </button>
      </div>
      <ErrorMessage reason={selectError} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-3">
        {hasBase ? (
          <button
            type="button"
            aria-label={card.frontImageId === null ? "Current base cover" : "Reset to base cover"}
            onClick={() => actions.selectImage(card.slug, BASE_IMAGE_ID)}
            className={cn(
              surfaceClass(surface + 1),
              "relative aspect-[4/5] overflow-hidden rounded-lg p-0 transition hover:brightness-110",
              card.frontImageId === null && "ring-2 ring-accent"
            )}
          >
            <DegradingImage
              src={portraitSrc(card.portrait)}
              alt=""
              className="h-full w-full object-cover"
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-mono text-tertiary text-xl">?</span>
                </div>
              }
            />
            <span
              className={cn(
                "absolute bottom-1 left-1 font-mono font-semibold text-xs",
                card.frontImageId === null ? "text-accent" : "text-secondary"
              )}
            >
              {card.frontImageId === null ? "★ base" : "base"}
            </span>
          </button>
        ) : null}
        {variantIds.map((id) =>
          owned.has(id) ? (
            <button
              key={id}
              type="button"
              aria-label={id === card.frontImageId ? "Current front image" : "Set as card front"}
              onClick={() => actions.selectImage(card.slug, id)}
              className={cn(
                surfaceClass(surface + 1),
                "relative aspect-[4/5] overflow-hidden rounded-lg p-0 transition hover:brightness-110",
                id === card.frontImageId && "ring-2 ring-accent"
              )}
            >
              <DegradingImage
                src={imageSrc(id)}
                alt=""
                className="h-full w-full object-cover"
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-mono text-tertiary text-xl">?</span>
                  </div>
                }
              />
              {id === card.frontImageId ? (
                <span className="absolute bottom-1 left-1 font-mono font-semibold text-accent text-xs">
                  ★ front
                </span>
              ) : null}
            </button>
          ) : (
            <div
              key={id}
              role="img"
              aria-label="Undrawn — locked"
              className={cn(
                surfaceClass(surface + 1),
                "flex aspect-[4/5] items-center justify-center rounded-lg opacity-40 saturate-50"
              )}
            >
              <span className="font-mono text-tertiary text-xl">?</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export function RosterGalleryModal({ slug, onClose }: { slug: string; onClose: () => void }) {
  const snap = useSyncExternalStore(
    idleGameStore.subscribe,
    idleGameStore.getSnapshot,
    idleGameStore.getSnapshot
  )
  const catalog = useSyncExternalStore(subscribeCatalog, getCatalogSnapshot, getCatalogSnapshot)
  const actions = useIdleActions()

  useEffect(() => {
    ensureCatalogLoaded()
  }, [])

  const state = snap.state
  const card =
    state !== null
      ? (deriveRosterView(state, catalog, 0).find((c) => c.slug === slug) ?? null)
      : null

  return (
    <Dialog
      open
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogTitle className="sr-only">{`${card?.name ?? "Roster"} gallery`}</DialogTitle>
        <DialogBody>
          {card !== null ? (
            <GalleryGrid card={card} actions={actions} onClose={onClose} />
          ) : (
            <p className="font-mono text-sm text-tertiary">Loading…</p>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export function RosterGalleryHost() {
  const slug = useSyncExternalStore(subscribeRosterGallery, getRosterGallerySnapshot, () => null)
  if (slug === null) return null
  return <RosterGalleryModal slug={slug} onClose={closeRosterGallery} />
}
