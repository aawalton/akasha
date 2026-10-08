import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftICanTStopLovingYouThoughITry = {
  id: "019ea416-185a-7361-908f-8b3ef0e3a85b",
  type: "page-type/song",
  slug: "taylor-swift-i-can-t-stop-loving-you-though-i-try",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0618244a-f23c-47b0-b72a-e23f0d339645",
      externalLink: "https://musicbrainz.org/work/0618244a-f23c-47b0-b72a-e23f0d339645",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Can’t Stop Loving You (Though I Try)",
  artist: "artist/taylor-swift",
  performed: true,
  createdAt: "2026-06-07T21:56:11.994Z",
  updatedAt: "2026-09-19T16:55:02.000Z",
} as const satisfies Song
