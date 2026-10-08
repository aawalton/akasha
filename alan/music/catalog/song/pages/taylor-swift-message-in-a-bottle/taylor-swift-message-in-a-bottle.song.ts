import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMessageInABottle = {
  id: "019ea416-1ab8-7193-adee-760f43754a0f",
  type: "page-type/song",
  slug: "taylor-swift-message-in-a-bottle",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1945ae41-efeb-4569-b8e2-e4fd5cf7812f",
      externalLink: "https://musicbrainz.org/work/1945ae41-efeb-4569-b8e2-e4fd5cf7812f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Message in a Bottle",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:12.600Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
