import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheFrozenMan = {
  id: "01a0b72f-56ef-7a84-94d4-872d8e8de1d9",
  type: "page-type/song",
  slug: "james-taylor-the-frozen-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d57ab452-4c7c-32bd-841c-de8e105b08d6",
      externalLink: "https://musicbrainz.org/work/d57ab452-4c7c-32bd-841c-de8e105b08d6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Frozen Man",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
