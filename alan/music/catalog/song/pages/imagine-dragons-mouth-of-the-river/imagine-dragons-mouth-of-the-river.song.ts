import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsMouthOfTheRiver = {
  id: "019ea499-c596-71db-979f-aad57c30d3b6",
  type: "page-type/song",
  slug: "imagine-dragons-mouth-of-the-river",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a0e5a264-4fe2-473e-be00-b092cc178da6",
      externalLink: "https://musicbrainz.org/work/a0e5a264-4fe2-473e-be00-b092cc178da6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mouth of the River",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
