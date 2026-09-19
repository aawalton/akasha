import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneYouDidntBelieveHer = {
  id: "01a0b4c6-cb35-7df3-b1de-3e8626a43c3c",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-you-didnt-believe-her",
  ownLength: 2.6248666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "36SWHaN7gFP9BJlyWA7wGz",
      externalLink: "https://open.spotify.com/track/36SWHaN7gFP9BJlyWA7wGz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "You Didn't Believe Her",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "youdidntbelieveher|6tITG4T8LpC0msapZ4wXGA|157492",
  song: "song/the-holderness-family-you-didnt-believe-her",
} as const satisfies Track
