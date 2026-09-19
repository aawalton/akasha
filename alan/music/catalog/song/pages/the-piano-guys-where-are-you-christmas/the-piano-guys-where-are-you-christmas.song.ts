import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWhereAreYouChristmas = {
  id: "01a0b71e-9985-7c63-9ffe-4acd1f1d53d3",
  type: "page-type/song",
  slug: "the-piano-guys-where-are-you-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "300244eb-c9d4-46f3-a0e8-11b87b2d50b4",
      externalLink: "https://musicbrainz.org/work/300244eb-c9d4-46f3-a0e8-11b87b2d50b4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Where Are You Christmas?",
  artist: "artist/the-piano-guys",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
