import type { Song } from "../../song.page-type.ts"

export const billieEilishLimbo = {
  id: "019ea4ab-a01d-7b2b-aff4-0830ce94195e",
  pageTypeSlug: "song",
  slug: "billie-eilish-limbo",
  title: "Limbo",
  artistSlug: "billie-eilish",
  externalId: "da723e82-4050-4c35-be55-5ad2f1626ed2",
  externalLink: "https://musicbrainz.org/work/da723e82-4050-4c35-be55-5ad2f1626ed2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
