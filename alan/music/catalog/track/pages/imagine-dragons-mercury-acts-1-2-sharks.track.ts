import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12Sharks = {
  id: "01a0c43f-c4f7-7de2-be62-b292ded7a951",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-sharks",
  ownLength: 3.1813833333333332,
  ownProgress: 3.1813833333333332,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7sA2SKTo1QbTSSYn5YvJC4",
      externalLink: "https://open.spotify.com/track/7sA2SKTo1QbTSSYn5YvJC4",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Sharks",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "sharks|53XhwfbYqKCa1cC15pYq2q|190883",
  song: "song/imagine-dragons-sharks",
  carriedBy: [
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 2,
      position: 3,
      externalId: "7sA2SKTo1QbTSSYn5YvJC4",
      externalLink: "https://open.spotify.com/track/7sA2SKTo1QbTSSYn5YvJC4",
    },
  ],
} as const satisfies Track
