import type { Song } from "../../song.page-type.ts"

export const mitskiIGuess = {
  id: "019f0e9e-2936-741e-b691-a25601a39ffc",
  pageTypeSlug: "song",
  slug: "mitski-i-guess",
  title: "I Guess",
  artistSlug: "mitski",
  externalId: "2ff5b840-bb31-4ecc-bf63-0192b6cc58f3",
  externalLink: "https://musicbrainz.org/work/2ff5b840-bb31-4ecc-bf63-0192b6cc58f3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
