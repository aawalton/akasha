import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftAsTearsGoBy = {
  id: "019ea416-1713-796c-8812-9fc30bd876b3",
  type: "song",
  slug: "taylor-swift-as-tears-go-by",
  title: "As Tears Go By",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e04355f6-8117-3cf0-bf03-0ec22384f4c0",
      externalLink: "https://musicbrainz.org/work/e04355f6-8117-3cf0-bf03-0ec22384f4c0",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
