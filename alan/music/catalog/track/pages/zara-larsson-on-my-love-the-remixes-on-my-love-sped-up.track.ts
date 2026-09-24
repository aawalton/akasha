import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnMyLoveTheRemixesOnMyLoveSpedUp = {
  id: "01a0aa7c-2ce8-7500-a1f8-f70a118b953f",
  type: "page-type/track",
  slug: "zara-larsson-on-my-love-the-remixes-on-my-love-sped-up",
  ownLength: 3.250783333333333,
  ownProgress: 3.250783333333333,
  partOfCollections: ["release/zara-larsson-on-my-love-the-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "On My Love - Sped Up",
  trackType: "version",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }, { artistName: "David Guetta" }],
  trackKey: "onmylovespedup|1Cs0zKBU1kc0i8ypK3B9ai,1Xylc3o4UrD53lo9CvFvVg|195047",
  song: "song/zara-larsson-on-my-love",
  carriedBy: [
    {
      release: "release/zara-larsson-on-my-love-the-remixes",
      discNumber: 1,
      position: 7,
      externalId: "7GhKL5nhxjtxJSZjtd886G",
      externalLink: "https://open.spotify.com/track/7GhKL5nhxjtxJSZjtd886G",
    },
  ],
} as const satisfies Track
