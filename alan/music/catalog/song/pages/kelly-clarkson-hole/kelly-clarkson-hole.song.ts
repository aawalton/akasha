import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonHole = {
  id: "019ea4ae-8d53-76c5-bf20-b1116582679e",
  type: "page-type/song",
  slug: "kelly-clarkson-hole",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "601683a9-62f1-44d5-9923-36964b4fdd3d",
      externalLink: "https://musicbrainz.org/work/601683a9-62f1-44d5-9923-36964b4fdd3d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hole",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:42:43.411Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
