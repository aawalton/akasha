import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12TakeItEasy = {
  id: "01a0c43f-c5d6-74ce-8dd9-d0e475a099c1",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-take-it-easy",
  ownLength: 2.6378333333333335,
  ownProgress: 2.6378333333333335,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2"],
  position: 8,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Y2Iom5hrfZyhBRGqcrJdc",
      externalLink: "https://open.spotify.com/track/6Y2Iom5hrfZyhBRGqcrJdc",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Take It Easy",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "takeiteasy|53XhwfbYqKCa1cC15pYq2q|158270",
  song: "song/imagine-dragons-take-it-easy",
} as const satisfies Track
