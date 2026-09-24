import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdEggInTheBackseatSpiderman = {
  id: "01a0d3ab-b4e3-743a-bd20-77611da14f8a",
  type: "page-type/track",
  slug: "em-beihold-egg-in-the-backseat-spiderman",
  ownLength: 3.0110166666666665,
  ownProgress: 0,
  partOfCollections: ["release/em-beihold-egg-in-the-backseat"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Spiderman",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" }],
  trackKey: "spiderman|7o2ZQYM7nTsaVdkXY38UAA|180661",
  song: "song/em-beihold-spiderman",
  carriedBy: [
    {
      release: "release/em-beihold-egg-in-the-backseat",
      discNumber: 1,
      position: 7,
      externalId: "3VafE9FVyKetfsS5tfhRs7",
      externalLink: "https://open.spotify.com/track/3VafE9FVyKetfsS5tfhRs7",
    },
  ],
} as const satisfies Track
