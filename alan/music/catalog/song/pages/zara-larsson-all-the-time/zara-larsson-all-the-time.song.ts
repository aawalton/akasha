import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonAllTheTime = {
  id: "019ea49f-b2da-7176-bf61-5676f012edfd",
  type: "page-type/song",
  slug: "zara-larsson-all-the-time",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5caf5786-f6a5-4c02-969e-819a1f878e54",
      externalLink: "https://musicbrainz.org/work/5caf5786-f6a5-4c02-969e-819a1f878e54",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All the Time",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
