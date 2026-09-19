import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3Crush = {
  id: "01a0aa7c-297b-7989-90cb-a79db8dee5f7",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-crush",
  ownLength: 2.951966666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-3"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5qE28swK9ufll68IzqG1aY",
      externalLink: "https://open.spotify.com/track/5qE28swK9ufll68IzqG1aY",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Crush",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "crush|1Xylc3o4UrD53lo9CvFvVg|177118",
  song: "song/zara-larsson-crush",
} as const satisfies Track
