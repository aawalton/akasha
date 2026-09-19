import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonDonT = {
  id: "019ea4ae-3614-7da7-b782-1a4bdb6962c3",
  type: "page-type/song",
  slug: "kelly-clarkson-don-t",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "51f62874-703d-31e3-8e59-2de0f5d4d692",
      externalLink: "https://musicbrainz.org/work/51f62874-703d-31e3-8e59-2de0f5d4d692",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don't",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
