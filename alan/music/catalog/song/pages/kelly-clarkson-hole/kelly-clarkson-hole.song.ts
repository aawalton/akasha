import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonHole = {
  id: "019ea4ae-8d53-76c5-bf20-b1116582679e",
  type: "song",
  slug: "kelly-clarkson-hole",
  title: "Hole",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "601683a9-62f1-44d5-9923-36964b4fdd3d",
      externalLink: "https://musicbrainz.org/work/601683a9-62f1-44d5-9923-36964b4fdd3d",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
