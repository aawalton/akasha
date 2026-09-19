import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsVol2HowGentleGodsCommand = {
  id: "01a0b4c8-5ff1-746d-9528-57ecff394fea",
  type: "page-type/track",
  slug: "paul-cardall-hymns-vol-2-how-gentle-gods-command",
  ownLength: 2.3346666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns-vol-2"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3RnjXBwWa0q8D0zLRzEEEq",
      externalLink: "https://open.spotify.com/track/3RnjXBwWa0q8D0zLRzEEEq",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "How Gentle God's Command",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "howgentlegodscommand|7FQRbf8gbKw8KZQZAJWxH2|140080",
  song: "song/paul-cardall-how-gentle-gods-command",
} as const satisfies Track
