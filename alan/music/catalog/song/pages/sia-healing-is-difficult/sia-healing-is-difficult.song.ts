import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHealingIsDifficult = {
  id: "019ea4c8-c291-7f7e-ae81-2ebf8ac8ca1d",
  type: "page-type/song",
  slug: "sia-healing-is-difficult",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "80c0dee1-33b6-426e-ad96-8391a96aab38",
      externalLink: "https://musicbrainz.org/work/80c0dee1-33b6-426e-ad96-8391a96aab38",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Healing Is Difficult",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
