import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorIsntItNiceToBeHomeAgain = {
  id: "01a0b72f-3402-724d-92b6-a241454997aa",
  type: "page-type/song",
  slug: "james-taylor-isnt-it-nice-to-be-home-again",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27025bef-e722-430e-a94a-8cc3ad26e6ef",
      externalLink: "https://musicbrainz.org/work/27025bef-e722-430e-a94a-8cc3ad26e6ef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Isn’t It Nice to Be Home Again",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
