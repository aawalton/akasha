import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonLikeItIs = {
  id: "019ea4a0-17f8-75bb-bdbd-5bf1187b115d",
  type: "page-type/song",
  slug: "zara-larsson-like-it-is",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79ccdc85-594d-488d-84e6-655580a0335f",
      externalLink: "https://musicbrainz.org/work/79ccdc85-594d-488d-84e6-655580a0335f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Like It Is",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
