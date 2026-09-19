import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMyHair = {
  id: "019ea4e8-5407-7732-8c21-71d2559cce42",
  type: "page-type/song",
  slug: "ariana-grande-my-hair",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f323d6ff-af12-473c-b5a4-fedac89e2549",
      externalLink: "https://musicbrainz.org/work/f323d6ff-af12-473c-b5a4-fedac89e2549",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "my hair",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
