import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12Tied = {
  id: "01a0c43f-c6af-7459-8f00-df340a59f9bd",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-tied",
  ownLength: 4.0301,
  ownProgress: 4.0301,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2"],
  position: 14,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "35CZvVV7UzYgydaVpNW4Kp",
      externalLink: "https://open.spotify.com/track/35CZvVV7UzYgydaVpNW4Kp",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Tied",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "tied|53XhwfbYqKCa1cC15pYq2q|241806",
  song: "song/imagine-dragons-tied",
  carriedBy: [
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 2,
      position: 14,
      externalId: "35CZvVV7UzYgydaVpNW4Kp",
      externalLink: "https://open.spotify.com/track/35CZvVV7UzYgydaVpNW4Kp",
    },
  ],
} as const satisfies Track
