import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereTurnAway = {
  id: "01a0abeb-4215-7b21-ab70-9e2d8337b3d6",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-turn-away",
  ownLength: 3.37,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1rRLh11nk5tkJ7QYLffIff",
      externalLink: "https://open.spotify.com/track/1rRLh11nk5tkJ7QYLffIff",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Turn Away",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "turnaway|0vn7UBvSQECKJm2817Yf1P|202200",
  song: "song/james-taylor-turn-away",
} as const satisfies Track
