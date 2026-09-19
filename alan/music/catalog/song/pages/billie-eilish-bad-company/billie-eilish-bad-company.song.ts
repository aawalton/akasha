import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBadCompany = {
  id: "019ea4ab-14da-7a56-823e-5ffd4745fa80",
  type: "page-type/song",
  slug: "billie-eilish-bad-company",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b3252239-f7f3-4cfe-a4f3-e52fb646fbd2",
      externalLink: "https://musicbrainz.org/work/b3252239-f7f3-4cfe-a4f3-e52fb646fbd2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad Company",
  artist: "artist/billie-eilish",
  performed: true,
  written: "collab",
} as const satisfies Song
