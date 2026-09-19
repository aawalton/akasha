import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNoTearsLeftToCry = {
  id: "019ea4e7-1343-708d-86a9-5be750f40d8f",
  type: "page-type/song",
  slug: "ariana-grande-no-tears-left-to-cry",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a9f8136b-aa0e-429f-8c75-e1543864ba51",
      externalLink: "https://musicbrainz.org/work/a9f8136b-aa0e-429f-8c75-e1543864ba51",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "no tears left to cry",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
