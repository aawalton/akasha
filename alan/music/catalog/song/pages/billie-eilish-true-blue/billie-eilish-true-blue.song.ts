import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishTrueBlue = {
  id: "019ea4ac-2cf0-7a3c-9610-72d85d2bbb4b",
  type: "page-type/song",
  slug: "billie-eilish-true-blue",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f2acbf2a-dea7-4c2b-afa2-b4a1d284c511",
      externalLink: "https://musicbrainz.org/work/f2acbf2a-dea7-4c2b-afa2-b4a1d284c511",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "TRUE BLUE",
  artist: "artist/billie-eilish",
  performed: true,
  written: "collab",
} as const satisfies Song
