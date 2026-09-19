import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyTheGreatestHitsVolOneYoureWelcome = {
  id: "01a0b4c6-d373-755f-88e2-f72c91e8e689",
  type: "page-type/track",
  slug: "the-holderness-family-the-greatest-hits-vol-one-youre-welcome",
  ownLength: 2.3671166666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-the-greatest-hits-vol-one"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0msybl0I1Zk1SRsFUGfSEL",
      externalLink: "https://open.spotify.com/track/0msybl0I1Zk1SRsFUGfSEL",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "You're Welcome",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "yourewelcome|6tITG4T8LpC0msapZ4wXGA|142027",
  song: "song/the-holderness-family-youre-welcome",
} as const satisfies Track
