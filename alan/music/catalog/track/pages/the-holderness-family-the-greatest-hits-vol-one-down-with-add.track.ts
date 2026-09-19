import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyTheGreatestHitsVolOneDownWithAdd = {
  id: "01a0b4c6-d2ed-7947-ab29-2c71adf73637",
  type: "page-type/track",
  slug: "the-holderness-family-the-greatest-hits-vol-one-down-with-add",
  ownLength: 2.0340666666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-the-greatest-hits-vol-one"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0fN9TWewZky5ktlcfYooUi",
      externalLink: "https://open.spotify.com/track/0fN9TWewZky5ktlcfYooUi",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Down With ADD",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "downwithadd|6tITG4T8LpC0msapZ4wXGA|122044",
  song: "song/the-holderness-family-down-with-add",
} as const satisfies Track
