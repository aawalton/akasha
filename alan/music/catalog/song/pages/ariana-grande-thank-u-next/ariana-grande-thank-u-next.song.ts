import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeThankUNext = {
  id: "019ea4e4-4ba1-7888-9567-c070178feef8",
  type: "page-type/song",
  slug: "ariana-grande-thank-u-next",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "21ad6b3f-69f6-4ae1-af2d-5ec99372d169",
      externalLink: "https://musicbrainz.org/work/21ad6b3f-69f6-4ae1-af2d-5ec99372d169",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "thank u, next",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
