import type { Song } from "../../song.page-type.ts"

export const billieEilishStrange = {
  id: "019ea4ab-27d8-79b5-825c-8ce3c1c0bbd7",
  pageTypeSlug: "song",
  slug: "billie-eilish-strange",
  title: "strange",
  artistSlug: "billie-eilish",
  externalId: "bc6128e3-03e5-4875-b077-032ef64b0136",
  externalLink: "https://musicbrainz.org/work/bc6128e3-03e5-4875-b077-032ef64b0136",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
