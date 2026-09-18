import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyTheGreatestHitsVolOneChristmasJammies = {
  id: "01a0b4c6-d1d3-76b0-980e-da3cd829576c",
  type: "page-type/track",
  slug: "the-holderness-family-the-greatest-hits-vol-one-christmas-jammies",
  ownLength: 3.367183333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-the-greatest-hits-vol-one"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ME26Zye2lrCm6GS6Ji3l9",
      externalLink: "https://open.spotify.com/track/3ME26Zye2lrCm6GS6Ji3l9",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Christmas Jammies",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "christmasjammies|6tITG4T8LpC0msapZ4wXGA|202031",
} as const satisfies Track
