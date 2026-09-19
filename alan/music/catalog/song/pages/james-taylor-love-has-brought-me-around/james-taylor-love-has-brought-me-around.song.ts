import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLoveHasBroughtMeAround = {
  id: "01a0b72f-35cf-7081-b56d-50616563f02f",
  type: "page-type/song",
  slug: "james-taylor-love-has-brought-me-around",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ea8ca6b-62fe-40a9-9cca-712d1a60c0ae",
      externalLink: "https://musicbrainz.org/work/3ea8ca6b-62fe-40a9-9cca-712d1a60c0ae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love Has Brought Me Around",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
