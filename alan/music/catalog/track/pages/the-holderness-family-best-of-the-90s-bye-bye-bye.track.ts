import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sByeByeBye = {
  id: "01a0b4c6-d0c3-7c9c-bbe6-865e0434d573",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-bye-bye-bye",
  ownLength: 2.4106666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5DdkU39g2myZPnRPz86H65",
      externalLink: "https://open.spotify.com/track/5DdkU39g2myZPnRPz86H65",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Bye Bye Bye",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "byebyebye|6tITG4T8LpC0msapZ4wXGA|144640",
  song: "song/the-holderness-family-bye-bye-bye",
} as const satisfies Track
