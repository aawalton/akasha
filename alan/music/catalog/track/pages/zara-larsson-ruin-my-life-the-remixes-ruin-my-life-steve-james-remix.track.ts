import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonRuinMyLifeTheRemixesRuinMyLifeSteveJamesRemix = {
  id: "01a0aa7c-3f36-7aa5-9faf-bb6b9bd6f940",
  type: "page-type/track",
  slug: "zara-larsson-ruin-my-life-the-remixes-ruin-my-life-steve-james-remix",
  ownLength: 2.9516,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-ruin-my-life-the-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5iAXWxXrzbEYDSDOx67PG7",
      externalLink: "https://open.spotify.com/track/5iAXWxXrzbEYDSDOx67PG7",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ruin My Life - Steve James Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "2rYFy6vVM1YiECVIAHaJBY", artistName: "Steve James" },
  ],
  trackKey: "ruinmylifestevejamesremix|1Xylc3o4UrD53lo9CvFvVg,2rYFy6vVM1YiECVIAHaJBY|177096",
  song: "song/zara-larsson-ruin-my-life",
} as const satisfies Track
