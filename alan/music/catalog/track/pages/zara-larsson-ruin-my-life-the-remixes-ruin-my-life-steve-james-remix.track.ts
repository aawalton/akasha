import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonRuinMyLifeTheRemixesRuinMyLifeSteveJamesRemix = {
  id: "01a0aa7c-3f36-7aa5-9faf-bb6b9bd6f940",
  type: "page-type/track",
  slug: "zara-larsson-ruin-my-life-the-remixes-ruin-my-life-steve-james-remix",
  ownLength: 2.9516,
  ownProgress: 2.9516,
  partOfCollections: ["release/zara-larsson-ruin-my-life-the-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ruin My Life - Steve James Remix",
  trackType: "remix",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }, { artistName: "Steve James" }],
  trackKey: "ruinmylifestevejamesremix|1Xylc3o4UrD53lo9CvFvVg,2rYFy6vVM1YiECVIAHaJBY|177096",
  song: "song/zara-larsson-ruin-my-life",
  carriedBy: [
    {
      release: "release/zara-larsson-ruin-my-life-the-remixes",
      discNumber: 1,
      position: 1,
      externalId: "5iAXWxXrzbEYDSDOx67PG7",
      externalLink: "https://open.spotify.com/track/5iAXWxXrzbEYDSDOx67PG7",
    },
  ],
} as const satisfies Track
