import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsImagineDragonsEpCoverUp = {
  id: "01a0c43f-e78d-7835-affe-d4ddb5f36c7c",
  type: "page-type/track",
  slug: "imagine-dragons-imagine-dragons-ep-cover-up",
  ownLength: 4.304633333333333,
  ownProgress: 4.304633333333333,
  partOfCollections: ["release/imagine-dragons-imagine-dragons-ep"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3C4FznGx0AkYW2xl15rKoQ",
      externalLink: "https://open.spotify.com/track/3C4FznGx0AkYW2xl15rKoQ",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Cover Up",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "coverup|53XhwfbYqKCa1cC15pYq2q|258278",
  song: "song/imagine-dragons-cover-up",
  carriedBy: [
    {
      release: "release/imagine-dragons-imagine-dragons-ep",
      discNumber: 1,
      position: 3,
      externalId: "3C4FznGx0AkYW2xl15rKoQ",
      externalLink: "https://open.spotify.com/track/3C4FznGx0AkYW2xl15rKoQ",
    },
  ],
} as const satisfies Track
