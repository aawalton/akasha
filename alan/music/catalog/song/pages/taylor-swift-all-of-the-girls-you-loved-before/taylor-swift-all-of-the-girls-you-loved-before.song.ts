import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAllOfTheGirlsYouLovedBefore = {
  id: "019ea416-03eb-7d00-9f5f-e10a64b78e60",
  type: "page-type/song",
  slug: "taylor-swift-all-of-the-girls-you-loved-before",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2164ddf9-66cd-43f4-a5fc-1d541b3992fe",
      externalLink: "https://musicbrainz.org/work/2164ddf9-66cd-43f4-a5fc-1d541b3992fe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All of the Girls You Loved Before",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:06.763Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
