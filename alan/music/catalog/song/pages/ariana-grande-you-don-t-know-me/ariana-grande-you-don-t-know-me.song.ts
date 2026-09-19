import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeYouDonTKnowMe = {
  id: "019ea4e7-cba1-7351-8928-3856884317c8",
  type: "page-type/song",
  slug: "ariana-grande-you-don-t-know-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dbc17b1b-4524-4b33-9453-d25940c6a658",
      externalLink: "https://musicbrainz.org/work/dbc17b1b-4524-4b33-9453-d25940c6a658",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Don't Know Me",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
