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
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
