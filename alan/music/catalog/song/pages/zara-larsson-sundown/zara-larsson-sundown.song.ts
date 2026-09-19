import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSundown = {
  id: "019ea49e-f277-72b0-8d62-0d6500b4b3d8",
  type: "page-type/song",
  slug: "zara-larsson-sundown",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3bd14f41-6563-432a-ab89-d6e9be914c96",
      externalLink: "https://musicbrainz.org/work/3bd14f41-6563-432a-ab89-d6e9be914c96",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sundown",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
