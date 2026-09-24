import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMorningBillenTedRemixMorningBillenTedRemix = {
  id: "01a0aa7c-3cca-7da1-8efa-598eb02812d3",
  type: "page-type/track",
  slug: "zara-larsson-morning-billen-ted-remix-morning-billen-ted-remix",
  ownLength: 2.4484,
  ownProgress: 2.4484,
  partOfCollections: [
    "release/zara-larsson-morning-billen-ted-remix",
    "release/zara-larsson-poster-girl-summer-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Morning - Billen Ted Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }, { artistName: "Billen Ted" }],
  trackKey: "morningbillentedremix|1Xylc3o4UrD53lo9CvFvVg,5PoZtBo8xZKqPWlZrIDq82|146904",
  song: "song/zara-larsson-morning",
  carriedBy: [
    {
      release: "release/zara-larsson-morning-billen-ted-remix",
      discNumber: 1,
      position: 1,
      externalId: "64qOMCzbwD6yrgBYBPJMA3",
      externalLink: "https://open.spotify.com/track/64qOMCzbwD6yrgBYBPJMA3",
    },
    {
      release: "release/zara-larsson-poster-girl-summer-edition",
      discNumber: 1,
      position: 19,
      externalId: "3AOJ294HBNncEDSIAsvwAF",
      externalLink: "https://open.spotify.com/track/3AOJ294HBNncEDSIAsvwAF",
    },
  ],
} as const satisfies Track
