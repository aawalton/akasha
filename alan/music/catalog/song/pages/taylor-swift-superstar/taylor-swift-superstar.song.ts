import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSuperstar = {
  id: "019ea416-3486-7055-bba2-b8a0e132c088",
  type: "song",
  slug: "taylor-swift-superstar",
  title: "SuperStar",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5917a7e3-a22b-4d25-b3ef-ff1f47e47f93",
      externalLink: "https://musicbrainz.org/work/5917a7e3-a22b-4d25-b3ef-ff1f47e47f93",
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
