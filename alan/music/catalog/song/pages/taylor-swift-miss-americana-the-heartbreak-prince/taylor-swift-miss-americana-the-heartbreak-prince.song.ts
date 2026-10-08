import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMissAmericanaTheHeartbreakPrince = {
  id: "019ea416-3284-7cd7-886e-e16e91e0d981",
  type: "page-type/song",
  slug: "taylor-swift-miss-americana-the-heartbreak-prince",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4729c835-34b6-457f-a0fa-909b277db116",
      externalLink: "https://musicbrainz.org/work/4729c835-34b6-457f-a0fa-909b277db116",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Miss Americana & the Heartbreak Prince",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:18.692Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
