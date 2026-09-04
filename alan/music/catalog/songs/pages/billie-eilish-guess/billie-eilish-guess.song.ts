import type { Song } from "../../song.page-type.ts"

export const billieEilishGuess = {
  id: "019ea4aa-aa04-76cd-bc24-324e09a28711",
  pageTypeSlug: "song",
  slug: "billie-eilish-guess",
  title: "Guess",
  artistSlug: "billie-eilish",
  externalId: "959b1e8f-62ab-428c-abcc-88f14a28e508",
  externalLink: "https://musicbrainz.org/work/959b1e8f-62ab-428c-abcc-88f14a28e508",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
