import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBlazed = {
  id: "019ea4e3-04d6-76cc-87e7-89fba0351fb4",
  type: "page-type/song",
  slug: "ariana-grande-blazed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c3cbd845-79bc-444f-89be-21b0ccdf2ee6",
      externalLink: "https://musicbrainz.org/work/c3cbd845-79bc-444f-89be-21b0ccdf2ee6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "blazed",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
