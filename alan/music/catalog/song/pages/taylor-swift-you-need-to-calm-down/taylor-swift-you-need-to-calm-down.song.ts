import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftYouNeedToCalmDown = {
  id: "019ea416-4811-70d3-88da-cd8a136d2ba5",
  type: "page-type/song",
  slug: "taylor-swift-you-need-to-calm-down",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "985d464d-9491-4e68-a573-df9b50a425ab",
      externalLink: "https://musicbrainz.org/work/985d464d-9491-4e68-a573-df9b50a425ab",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Need to Calm Down",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:24.209Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
