import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraHalfTheWorldAway = {
  id: "019ea4a7-4c57-7cf0-b863-cc2d9b04ea46",
  type: "page-type/song",
  slug: "aurora-half-the-world-away",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e8f3e2c8-7ad3-48cf-9394-616d1aca0708",
      externalLink: "https://musicbrainz.org/work/e8f3e2c8-7ad3-48cf-9394-616d1aca0708",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Half the World Away",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:34:48.023Z",
  updatedAt: "2026-09-19T16:57:09.000Z",
} as const satisfies Song
