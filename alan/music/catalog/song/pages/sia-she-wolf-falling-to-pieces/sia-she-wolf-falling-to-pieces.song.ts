import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSheWolfFallingToPieces = {
  id: "019ea4ce-a41a-702e-93dc-4908cc77ac39",
  type: "page-type/song",
  slug: "sia-she-wolf-falling-to-pieces",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f93e93f2-14d4-4724-86f1-494ffc061b8a",
      externalLink: "https://musicbrainz.org/work/f93e93f2-14d4-4724-86f1-494ffc061b8a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "She Wolf (Falling to Pieces)",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
