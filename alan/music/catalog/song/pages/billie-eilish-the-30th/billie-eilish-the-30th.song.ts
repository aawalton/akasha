import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishThe30th = {
  id: "019ea4a9-a317-7266-b910-47ce6080ec29",
  type: "page-type/song",
  slug: "billie-eilish-the-30th",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5f6dfe98-2c2c-41dc-b54b-677740858c3e",
      externalLink: "https://musicbrainz.org/work/5f6dfe98-2c2c-41dc-b54b-677740858c3e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The 30th",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
