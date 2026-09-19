import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanGreenTheWholeYearRound = {
  id: "01a0b720-09d9-7c71-84d2-ba260b727dfa",
  type: "page-type/song",
  slug: "celtic-woman-green-the-whole-year-round",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2bffe55e-40a1-4bb3-839e-17384cb5e330",
      externalLink: "https://musicbrainz.org/work/2bffe55e-40a1-4bb3-839e-17384cb5e330",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Green the Whole Year Round",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
