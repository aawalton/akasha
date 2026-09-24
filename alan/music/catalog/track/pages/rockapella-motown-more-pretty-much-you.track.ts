import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMorePrettyMuchYou = {
  id: "01a0d52b-52de-7305-be48-3877a977d311",
  type: "page-type/track",
  slug: "rockapella-motown-more-pretty-much-you",
  ownLength: 3.467433333333333,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Pretty Much You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "prettymuchyou|1AFSUleuDTapVhm5zUf4ix|208046",
  song: "song/rockapella-pretty-much-you",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 6,
      externalId: "6GcvDqNTAIy0L6JMPRVxek",
      externalLink: "https://open.spotify.com/track/6GcvDqNTAIy0L6JMPRVxek",
    },
  ],
} as const satisfies Track
