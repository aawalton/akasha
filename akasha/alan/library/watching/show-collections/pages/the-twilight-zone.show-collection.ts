import type { ShowCollection } from "../show-collection.page-type.ts"

export const theTwilightZone = {
  id: "01a06808-6a77-7014-962e-e0a278995da8",
  pageTypeSlug: "show-collection",
  slug: "the-twilight-zone",
  title: "The Twilight Zone",
  partOfSlugs: ["speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  lastSyncedAt: "2025-10-30",
} as const satisfies ShowCollection
