import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneAllByMyself = {
  id: "01a0b4c6-cc36-70cb-999f-917ce7b92e50",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-all-by-myself",
  ownLength: 2.4751,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1zU5doSrryv6IDoQn61AiK",
      externalLink: "https://open.spotify.com/track/1zU5doSrryv6IDoQn61AiK",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "All by Myself",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "allbymyself|6tITG4T8LpC0msapZ4wXGA|148506",
} as const satisfies Track
