import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaNeverGonnaLeaveMe = {
  id: "019ea4c7-3f59-7224-ba56-668248f911be",
  type: "page-type/song",
  slug: "sia-never-gonna-leave-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "35df1771-fe4d-44e9-9580-dc970c6f1814",
      externalLink: "https://musicbrainz.org/work/35df1771-fe4d-44e9-9580-dc970c6f1814",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Never Gonna Leave Me",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:09:41.849Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
