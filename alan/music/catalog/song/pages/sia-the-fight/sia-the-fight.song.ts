import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTheFight = {
  id: "019ea4cb-d672-7d72-909a-8e9d12f3fbf9",
  type: "page-type/song",
  slug: "sia-the-fight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3c2eef0f-1016-49ca-ab54-ddb4ac282b86",
      externalLink: "https://musicbrainz.org/work/3c2eef0f-1016-49ca-ab54-ddb4ac282b86",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Fight",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
