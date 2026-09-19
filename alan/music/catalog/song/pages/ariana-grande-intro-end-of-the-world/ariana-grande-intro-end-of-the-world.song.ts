import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIntroEndOfTheWorld = {
  id: "019ea4e1-b1e6-7869-974b-149eed73683b",
  type: "page-type/song",
  slug: "ariana-grande-intro-end-of-the-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6b9833f7-cb71-43eb-b351-b08d85989a54",
      externalLink: "https://musicbrainz.org/work/6b9833f7-cb71-43eb-b351-b08d85989a54",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "intro (end of the world)",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
