import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe80sLibidoKiller = {
  id: "01a0b4c6-ce77-71f4-b0bb-ab2792b9795c",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-80s-libido-killer",
  ownLength: 3.0145,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-80s"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2AD27VdzUAxqpWzDerkkKm",
      externalLink: "https://open.spotify.com/track/2AD27VdzUAxqpWzDerkkKm",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Libido Killer",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "libidokiller|6tITG4T8LpC0msapZ4wXGA|180870",
  song: "song/the-holderness-family-libido-killer",
} as const satisfies Track
