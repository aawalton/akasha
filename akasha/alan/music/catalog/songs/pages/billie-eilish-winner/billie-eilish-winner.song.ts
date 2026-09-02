import type { Song } from "../../song.page-type.ts"

export const billieEilishWinner = {
  id: "019ea4aa-fbf3-7009-82cb-0572f8eaa493",
  pageTypeSlug: "song",
  slug: "billie-eilish-winner",
  title: "Winner",
  artistSlug: "billie-eilish",
  externalId: "af40fe56-5e2f-4f7e-8b03-a1ca5528ba45",
  externalLink: "https://musicbrainz.org/work/af40fe56-5e2f-4f7e-8b03-a1ca5528ba45",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
