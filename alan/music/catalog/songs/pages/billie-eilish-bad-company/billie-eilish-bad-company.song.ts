import type { Song } from "../../song.page-type.ts"

export const billieEilishBadCompany = {
  id: "019ea4ab-14da-7a56-823e-5ffd4745fa80",
  pageTypeSlug: "song",
  slug: "billie-eilish-bad-company",
  title: "Bad Company",
  artistSlug: "billie-eilish",
  externalId: "b3252239-f7f3-4cfe-a4f3-e52fb646fbd2",
  externalLink: "https://musicbrainz.org/work/b3252239-f7f3-4cfe-a4f3-e52fb646fbd2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
