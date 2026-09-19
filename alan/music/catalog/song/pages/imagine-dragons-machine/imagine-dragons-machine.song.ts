import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsMachine = {
  id: "019ea49a-0127-7f20-8d66-ea0869e6ce3c",
  type: "page-type/song",
  slug: "imagine-dragons-machine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af45bef6-85bf-4a41-b169-a8a1fc6dcaf5",
      externalLink: "https://musicbrainz.org/work/af45bef6-85bf-4a41-b169-a8a1fc6dcaf5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Machine",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
