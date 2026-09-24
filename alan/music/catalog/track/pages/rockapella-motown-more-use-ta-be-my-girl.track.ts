import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMoreUseTaBeMyGirl = {
  id: "01a0d52b-52de-7437-8761-0b2849aef6b2",
  type: "page-type/track",
  slug: "rockapella-motown-more-use-ta-be-my-girl",
  ownLength: 1.4697833333333334,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Use Ta Be My Girl",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "usetabemygirl|1AFSUleuDTapVhm5zUf4ix|88187",
  song: "song/rockapella-use-ta-be-my-girl",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 9,
      externalId: "1kQNlkUsXh1iIdARBkC1pa",
      externalLink: "https://open.spotify.com/track/1kQNlkUsXh1iIdARBkC1pa",
    },
  ],
} as const satisfies Track
