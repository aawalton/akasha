import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonStickWithYou = {
  id: "019ea49e-5cf2-77cf-ab7c-ea0832150251",
  type: "page-type/song",
  slug: "zara-larsson-stick-with-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "20c73f08-9838-4dcb-bdd4-7783eeb8bc8c",
      externalLink: "https://musicbrainz.org/work/20c73f08-9838-4dcb-bdd4-7783eeb8bc8c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stick With You",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
