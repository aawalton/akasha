import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChristmastryIWontGiveUp = {
  id: "01a0a5ae-cedc-78fe-a98f-8615a2ed4d2d",
  type: "track",
  slug: "kelly-clarkson-christmastry-i-wont-give-up",
  ownLength: 3.482683333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-christmastry"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5zI4wtvGuWxsMHNlMKu0aq",
      externalLink: "https://open.spotify.com/track/5zI4wtvGuWxsMHNlMKu0aq",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "i won’t give up",
} as const satisfies Track
