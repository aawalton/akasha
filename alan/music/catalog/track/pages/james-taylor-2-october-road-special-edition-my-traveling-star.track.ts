import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEditionMyTravelingStar = {
  id: "01a0abeb-3895-7abb-80ce-d85755fa618f",
  type: "page-type/track",
  slug: "james-taylor-2-october-road-special-edition-my-traveling-star",
  ownLength: 3.8866666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-october-road-special-edition"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4WFC5oosVJnVD0hgfx4cM9",
      externalLink: "https://open.spotify.com/track/4WFC5oosVJnVD0hgfx4cM9",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "My Traveling Star",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "mytravelingstar|0vn7UBvSQECKJm2817Yf1P|233200",
  song: "song/james-taylor-my-traveling-star",
} as const satisfies Track
