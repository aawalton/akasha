import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEditionOctoberRoad = {
  id: "01a0abeb-37e8-7071-a552-628498979f03",
  type: "page-type/track",
  slug: "james-taylor-2-october-road-special-edition-october-road",
  ownLength: 3.9444333333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-october-road-special-edition"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0nILp5SpecXFvJQotZe48y",
      externalLink: "https://open.spotify.com/track/0nILp5SpecXFvJQotZe48y",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "October Road",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "octoberroad|0vn7UBvSQECKJm2817Yf1P|236666",
  song: "song/james-taylor-october-road",
} as const satisfies Track
