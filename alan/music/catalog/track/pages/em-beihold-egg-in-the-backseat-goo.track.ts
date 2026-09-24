import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdEggInTheBackseatGoo = {
  id: "01a0d3ab-b3ed-7aac-9de2-af2d4400ee3b",
  type: "page-type/track",
  slug: "em-beihold-egg-in-the-backseat-goo",
  ownLength: 2.93885,
  ownProgress: 0,
  partOfCollections: ["release/em-beihold-egg-in-the-backseat"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Goo",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" }],
  trackKey: "goo|7o2ZQYM7nTsaVdkXY38UAA|176331",
  song: "song/em-beihold-goo",
  carriedBy: [
    {
      release: "release/em-beihold-egg-in-the-backseat",
      discNumber: 1,
      position: 1,
      externalId: "386y7lYyXr0sni9FuQNH50",
      externalLink: "https://open.spotify.com/track/386y7lYyXr0sni9FuQNH50",
    },
  ],
} as const satisfies Track
