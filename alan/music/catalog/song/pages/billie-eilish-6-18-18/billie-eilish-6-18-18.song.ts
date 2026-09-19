import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilish61818 = {
  id: "019ea4ac-34d0-7af2-97be-1a9484f2219c",
  type: "page-type/song",
  slug: "billie-eilish-6-18-18",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f6ab7b1d-7ff7-4ff8-bfe4-5cae250ca675",
      externalLink: "https://musicbrainz.org/work/f6ab7b1d-7ff7-4ff8-bfe4-5cae250ca675",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "6.18.18",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  written: "solo",
} as const satisfies Song
