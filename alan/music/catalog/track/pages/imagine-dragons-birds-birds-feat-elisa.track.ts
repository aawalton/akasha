import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsBirdsBirdsFeatElisa = {
  id: "01a0c43f-dbec-70bd-852d-cdc0cfc09337",
  type: "page-type/track",
  slug: "imagine-dragons-birds-birds-feat-elisa",
  ownLength: 3.657233333333333,
  ownProgress: 3.657233333333333,
  partOfCollections: ["release/imagine-dragons-birds"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2uZVfvOK7MTjBTRICYmpso",
      externalLink: "https://open.spotify.com/track/2uZVfvOK7MTjBTRICYmpso",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Birds (feat. Elisa)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" },
    { externalId: "2ARH58Hit3yC6ziGdhma23", artistName: "Elisa" },
  ],
  trackKey: "birdsfeatelisa|2ARH58Hit3yC6ziGdhma23,53XhwfbYqKCa1cC15pYq2q|219434",
  song: "song/imagine-dragons-birds",
} as const satisfies Track
