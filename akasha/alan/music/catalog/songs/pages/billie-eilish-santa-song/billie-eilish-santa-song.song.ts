import type { Song } from "../../song.page-type.ts"

export const billieEilishSantaSong = {
  id: "019ea4a8-d814-7524-8b67-4740fd938be5",
  pageTypeSlug: "song",
  slug: "billie-eilish-santa-song",
  title: "Santa Song",
  artistSlug: "billie-eilish",
  externalId: "2fa3279e-1235-4e1b-8ec3-71f978c3852f",
  externalLink: "https://musicbrainz.org/work/2fa3279e-1235-4e1b-8ec3-71f978c3852f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
} as const satisfies Song
