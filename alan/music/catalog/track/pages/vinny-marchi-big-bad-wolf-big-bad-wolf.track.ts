import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBigBadWolfBigBadWolf = {
  id: "01a0b112-956e-7c24-b7f7-93d14c1566c3",
  type: "page-type/track",
  slug: "vinny-marchi-big-bad-wolf-big-bad-wolf",
  ownLength: 2.352533333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-big-bad-wolf"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3IsEapFmPMrn3lSOyayXhr",
      externalLink: "https://open.spotify.com/track/3IsEapFmPMrn3lSOyayXhr",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Big Bad Wolf",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "bigbadwolf|5USAMqcbMAzF3HBmeD5pJF|141152",
} as const satisfies Track
