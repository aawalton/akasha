import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayParadise = {
  id: "01a0ba5d-4df5-7f99-920c-8052dda745d4",
  type: "page-type/song",
  slug: "coldplay-paradise",
  partOfCollections: ["artist/the-piano-guys"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2eb7563d-7c24-41df-810f-0223a746beef",
      externalLink: "https://musicbrainz.org/work/2eb7563d-7c24-41df-810f-0223a746beef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Paradise",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
