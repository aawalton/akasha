import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftYouBelongWithMe = {
  id: "019ea416-456d-79b3-9f81-296b185f8212",
  type: "page-type/song",
  slug: "taylor-swift-you-belong-with-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4f0b6123-2bbd-3672-a928-b1949a42654d",
      externalLink: "https://musicbrainz.org/work/4f0b6123-2bbd-3672-a928-b1949a42654d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Belong with Me",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:23.533Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
