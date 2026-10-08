import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioUnoptimistic = {
  id: "019ea4f9-014a-762b-843f-b71830ca13b1",
  type: "page-type/song",
  slug: "jessica-baio-unoptimistic",
  title: "unoptimistic",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b9c5e954-3c41-49d2-afbd-80510000e18a",
      externalLink: "https://musicbrainz.org/recording/b9c5e954-3c41-49d2-afbd-80510000e18a",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T02:04:02.762Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
