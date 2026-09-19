import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnMyLoveTheRemixesOnMyLoveFeatDavidGuettaNiklasDeeRemix = {
  id: "01a0aa7c-2c5e-7e15-a009-759024c81792",
  type: "page-type/track",
  slug: "zara-larsson-on-my-love-the-remixes-on-my-love-feat-david-guetta-niklas-dee-remix",
  ownLength: 2.86895,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-on-my-love-the-remixes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "02RcqmX7SdaSfFGx60yzjq",
      externalLink: "https://open.spotify.com/track/02RcqmX7SdaSfFGx60yzjq",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "On My Love (feat. David Guetta) - Niklas Dee Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "1ZPGzmbFTn8GRjqTqnLiFE", artistName: "Niklas Dee" },
    { externalId: "1Cs0zKBU1kc0i8ypK3B9ai", artistName: "David Guetta" },
  ],
  trackKey:
    "onmylovefeatdavidguettaniklasdeeremix|1Cs0zKBU1kc0i8ypK3B9ai,1Xylc3o4UrD53lo9CvFvVg,1ZPGzmbFTn8GRjqTqnLiFE|172137",
  song: "song/zara-larsson-on-my-love",
} as const satisfies Track
