import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiTheRiver = {
  id: "01a0b637-f89d-757c-a1bf-56918f913974",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-the-river",
  ownLength: 3.6308833333333332,
  ownProgress: 3.6308833333333332,
  partOfCollections: [
    "release/aurora-a-different-kind-of-human-step-ii",
    "release/aurora-apple-tree-georgia-remix",
    "release/aurora-the-river-askjell-remix",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The River",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "theriver|1WgXqy2Dd70QQOU7Ay074N|217853",
  song: "song/aurora-the-river",
  carriedBy: [
    {
      release: "release/aurora-a-different-kind-of-human-step-ii",
      discNumber: 1,
      position: 1,
      externalId: "3ZsHvQod9SZINFwmrAeQtg",
      externalLink: "https://open.spotify.com/track/3ZsHvQod9SZINFwmrAeQtg",
    },
    {
      release: "release/aurora-apple-tree-georgia-remix",
      discNumber: 1,
      position: 3,
      externalId: "5AoPD50ECugPNfyDBPhF4M",
      externalLink: "https://open.spotify.com/track/5AoPD50ECugPNfyDBPhF4M",
    },
    {
      release: "release/aurora-the-river-askjell-remix",
      discNumber: 1,
      position: 2,
      externalId: "5UTa5NNuq3kyPz8BoTBJpt",
      externalLink: "https://open.spotify.com/track/5UTa5NNuq3kyPz8BoTBJpt",
    },
  ],
} as const satisfies Track
