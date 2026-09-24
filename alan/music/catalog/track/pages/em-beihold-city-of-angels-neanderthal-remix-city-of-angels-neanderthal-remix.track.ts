import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdCityOfAngelsNeanderthalRemixCityOfAngelsNeanderthalRemix = {
  id: "01a0d3ab-b1bd-7620-87f5-7cfde5a85634",
  type: "page-type/track",
  slug: "em-beihold-city-of-angels-neanderthal-remix-city-of-angels-neanderthal-remix",
  ownLength: 3.5,
  ownProgress: 0,
  partOfCollections: ["release/em-beihold-city-of-angels-neanderthal-remix"],
  status: "not-started",
  unit: "unit/minutes",
  title: "City of Angels - Neanderthal Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" },
    { externalId: "7AV66Eu1XevhHitr3MEama", artistName: "Neanderthal" },
  ],
  trackKey: "cityofangelsneanderthalremix|7AV66Eu1XevhHitr3MEama,7o2ZQYM7nTsaVdkXY38UAA|210000",
  song: "song/em-beihold-city-of-angels",
  carriedBy: [
    {
      release: "release/em-beihold-city-of-angels-neanderthal-remix",
      discNumber: 1,
      position: 1,
      externalId: "7hGhJluAPDd6HMy80D62vN",
      externalLink: "https://open.spotify.com/track/7hGhJluAPDd6HMy80D62vN",
    },
  ],
} as const satisfies Track
