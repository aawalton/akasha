import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12MyLife = {
  id: "01a0c43f-c266-7d92-8bbd-2bcde7f6d690",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-my-life",
  ownLength: 3.7418666666666667,
  ownProgress: 3.7418666666666667,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0E0kxko3i9b5JxxMoGH3At",
      externalLink: "https://open.spotify.com/track/0E0kxko3i9b5JxxMoGH3At",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "My Life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "mylife|53XhwfbYqKCa1cC15pYq2q|224512",
  song: "song/imagine-dragons-my-life",
  carriedBy: [
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 1,
      position: 2,
      externalId: "0E0kxko3i9b5JxxMoGH3At",
      externalLink: "https://open.spotify.com/track/0E0kxko3i9b5JxxMoGH3At",
    },
  ],
} as const satisfies Track
