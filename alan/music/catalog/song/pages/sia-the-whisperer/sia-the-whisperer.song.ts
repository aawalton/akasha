import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTheWhisperer = {
  id: "019ea4cb-b2a8-765c-b772-14bcb8ce0d5c",
  type: "page-type/song",
  slug: "sia-the-whisperer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "374ab399-004a-41e1-8d00-502b1f60fab9",
      externalLink: "https://musicbrainz.org/work/374ab399-004a-41e1-8d00-502b1f60fab9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Whisperer",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:14:33.512Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
