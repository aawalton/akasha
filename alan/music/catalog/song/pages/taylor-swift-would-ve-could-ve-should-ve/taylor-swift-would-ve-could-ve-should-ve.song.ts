import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWouldVeCouldVeShouldVe = {
  id: "019ea416-4a0e-765b-a282-841cd8c54ee7",
  type: "page-type/song",
  slug: "taylor-swift-would-ve-could-ve-should-ve",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b2bde956-a8b6-4667-888e-d5e0ac35b297",
      externalLink: "https://musicbrainz.org/work/b2bde956-a8b6-4667-888e-d5e0ac35b297",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Would’ve, Could’ve, Should’ve",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:24.718Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
