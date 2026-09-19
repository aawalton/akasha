import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonDonTWorryBoutMeRemixesDontWorryBoutMeDiamondPistolsRemix = {
  id: "01a0aa7c-3e95-75ca-8d61-d621d3b5b462",
  type: "page-type/track",
  slug: "zara-larsson-don-t-worry-bout-me-remixes-dont-worry-bout-me-diamond-pistols-remix",
  ownLength: 4,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-don-t-worry-bout-me-remixes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0u3dPRxI7Brk5z1x7VNqB2",
      externalLink: "https://open.spotify.com/track/0u3dPRxI7Brk5z1x7VNqB2",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Don't Worry Bout Me - Diamond Pistols Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "1OzGBMZ8rp73R6DWx0IUr5", artistName: "Diamond Pistols" },
  ],
  trackKey:
    "dontworryboutmediamondpistolsremix|1OzGBMZ8rp73R6DWx0IUr5,1Xylc3o4UrD53lo9CvFvVg|240000",
  song: "song/zara-larsson-don-t-worry-bout-me",
} as const satisfies Track
