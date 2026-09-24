import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEden1987 = {
  id: "01a0b4c8-4c77-70ed-bef0-596ef4fc238b",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-1987",
  ownLength: 5.37555,
  ownProgress: 5.37555,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "1987",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "1987|7FQRbf8gbKw8KZQZAJWxH2|322533",
  song: "song/paul-cardall-1987",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 24,
      externalId: "4fBovRr0EbQiKDrxGdoUhU",
      externalLink: "https://open.spotify.com/track/4fBovRr0EbQiKDrxGdoUhU",
    },
  ],
} as const satisfies Track
