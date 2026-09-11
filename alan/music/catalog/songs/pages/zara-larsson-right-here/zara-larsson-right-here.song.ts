import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const zaraLarssonRightHere = {
  id: "019ea49f-3210-7f9d-a043-824c036e3348",
  type: "song",
  slug: "zara-larsson-right-here",
  title: "Right Here",
  artist: "zara-larsson",
  externalId: "4a61c66b-3c37-4153-bc52-3d7ce820989e",
  externalLink: "https://musicbrainz.org/work/4a61c66b-3c37-4153-bc52-3d7ce820989e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
