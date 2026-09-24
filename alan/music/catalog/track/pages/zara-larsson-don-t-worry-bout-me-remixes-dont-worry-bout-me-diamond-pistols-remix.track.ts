import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonDonTWorryBoutMeRemixesDontWorryBoutMeDiamondPistolsRemix = {
  id: "01a0aa7c-3e95-75ca-8d61-d621d3b5b462",
  type: "page-type/track",
  slug: "zara-larsson-don-t-worry-bout-me-remixes-dont-worry-bout-me-diamond-pistols-remix",
  ownLength: 4,
  ownProgress: 4,
  partOfCollections: ["release/zara-larsson-don-t-worry-bout-me-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Don't Worry Bout Me - Diamond Pistols Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }, { artistName: "Diamond Pistols" }],
  trackKey:
    "dontworryboutmediamondpistolsremix|1OzGBMZ8rp73R6DWx0IUr5,1Xylc3o4UrD53lo9CvFvVg|240000",
  song: "song/zara-larsson-don-t-worry-bout-me",
  carriedBy: [
    {
      release: "release/zara-larsson-don-t-worry-bout-me-remixes",
      discNumber: 1,
      position: 3,
      externalId: "0u3dPRxI7Brk5z1x7VNqB2",
      externalLink: "https://open.spotify.com/track/0u3dPRxI7Brk5z1x7VNqB2",
    },
  ],
} as const satisfies Track
