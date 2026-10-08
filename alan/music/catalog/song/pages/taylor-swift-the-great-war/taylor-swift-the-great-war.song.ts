import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheGreatWar = {
  id: "019ea416-41ed-75ef-9fef-6f616649f07a",
  type: "page-type/song",
  slug: "taylor-swift-the-great-war",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f56d39d0-de1f-42d7-8d18-bdc26962c141",
      externalLink: "https://musicbrainz.org/work/f56d39d0-de1f-42d7-8d18-bdc26962c141",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Great War",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:22.637Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
