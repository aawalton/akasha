import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiIGuess = {
  id: "019f0e9e-2936-741e-b691-a25601a39ffc",
  type: "page-type/song",
  slug: "mitski-i-guess",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ff5b840-bb31-4ecc-bf63-0192b6cc58f3",
      externalLink: "https://musicbrainz.org/work/2ff5b840-bb31-4ecc-bf63-0192b6cc58f3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Guess",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
