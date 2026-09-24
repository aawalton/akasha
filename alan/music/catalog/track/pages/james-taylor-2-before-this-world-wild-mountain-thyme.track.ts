import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2BeforeThisWorldWildMountainThyme = {
  id: "01a0abeb-30f1-7ac2-bb4d-8bc30acca85c",
  type: "page-type/track",
  slug: "james-taylor-2-before-this-world-wild-mountain-thyme",
  ownLength: 2.9486666666666665,
  ownProgress: 2.9486666666666665,
  partOfCollections: ["release/james-taylor-2-before-this-world"],
  status: "completed",
  unit: "unit/minutes",
  title: "Wild Mountain Thyme",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "wildmountainthyme|0vn7UBvSQECKJm2817Yf1P|176920",
  song: "song/james-taylor-wild-mountain-thyme",
  carriedBy: [
    {
      release: "release/james-taylor-2-before-this-world",
      discNumber: 1,
      position: 10,
      externalId: "16WXV9PnrHQQInXfVmbJhI",
      externalLink: "https://open.spotify.com/track/16WXV9PnrHQQInXfVmbJhI",
    },
  ],
} as const satisfies Track
