import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsEyesClosedEyesClosed = {
  id: "01a0c43f-d949-711b-973b-7cbaab6f3764",
  type: "page-type/track",
  slug: "imagine-dragons-eyes-closed-eyes-closed",
  ownLength: 3.3335,
  ownProgress: 3.3335,
  partOfCollections: ["release/imagine-dragons-eyes-closed"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4o120XeV8els1S5bu7mzBX",
      externalLink: "https://open.spotify.com/track/4o120XeV8els1S5bu7mzBX",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Eyes Closed",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "eyesclosed|53XhwfbYqKCa1cC15pYq2q|200010",
  song: "song/imagine-dragons-eyes-closed",
  carriedBy: [
    {
      release: "release/imagine-dragons-eyes-closed",
      discNumber: 1,
      position: 1,
      externalId: "4o120XeV8els1S5bu7mzBX",
      externalLink: "https://open.spotify.com/track/4o120XeV8els1S5bu7mzBX",
    },
  ],
} as const satisfies Track
