import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayFixYou = {
  id: "01a0ba5d-461d-70c6-b1a9-cc5cc5f0e218",
  type: "page-type/song",
  slug: "coldplay-fix-you",
  partOfCollections: ["artist/kelly-clarkson"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c309eb61-2852-35e5-841b-151d4cf5807e",
      externalLink: "https://musicbrainz.org/work/c309eb61-2852-35e5-841b-151d4cf5807e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fix You",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
