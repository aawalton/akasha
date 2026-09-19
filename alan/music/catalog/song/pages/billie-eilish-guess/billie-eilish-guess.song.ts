import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishGuess = {
  id: "019ea4aa-aa04-76cd-bc24-324e09a28711",
  type: "page-type/song",
  slug: "billie-eilish-guess",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "959b1e8f-62ab-428c-abcc-88f14a28e508",
      externalLink: "https://musicbrainz.org/work/959b1e8f-62ab-428c-abcc-88f14a28e508",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Guess",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
