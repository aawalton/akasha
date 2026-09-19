import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2022GenXSummer = {
  id: "01a0b4c6-c8fe-7510-b7a9-c5d0599d1019",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2022-gen-x-summer",
  ownLength: 2.9448,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-2022"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1PpvD7fqxr4iiT0qAsyDqR",
      externalLink: "https://open.spotify.com/track/1PpvD7fqxr4iiT0qAsyDqR",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Gen X Summer",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "genxsummer|6tITG4T8LpC0msapZ4wXGA|176688",
  song: "song/the-holderness-family-gen-x-summer",
} as const satisfies Track
