import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSilentNight = {
  id: "01a0b720-0cbf-74cc-a1e0-7b6c212def7b",
  type: "page-type/song",
  slug: "celtic-woman-silent-night",
  partOfCollections: [
    "artist/kelly-clarkson",
    "artist/paul-cardall",
    "artist/taylor-swift",
    "artist/the-piano-guys",
    "artist/zara-larsson",
  ],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "590e5567-c188-31f0-b7a8-a94e7e51c7b3",
      externalLink: "https://musicbrainz.org/work/590e5567-c188-31f0-b7a8-a94e7e51c7b3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Silent Night",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
