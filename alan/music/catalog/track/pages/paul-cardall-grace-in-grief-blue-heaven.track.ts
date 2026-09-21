import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGraceInGriefBlueHeaven = {
  id: "01a0b4c8-2643-7270-b867-b9e0cf85007b",
  type: "page-type/track",
  slug: "paul-cardall-grace-in-grief-blue-heaven",
  ownLength: 3.82145,
  ownProgress: 3.82145,
  partOfCollections: ["release/paul-cardall-grace-in-grief"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5DIAZjIZPEPZgbONYUby8d",
      externalLink: "https://open.spotify.com/track/5DIAZjIZPEPZgbONYUby8d",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Blue Heaven",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "blueheaven|7FQRbf8gbKw8KZQZAJWxH2|229287",
  song: "song/paul-cardall-blue-heaven",
  carriedBy: [
    {
      release: "release/paul-cardall-grace-in-grief",
      discNumber: 1,
      position: 9,
      externalId: "5DIAZjIZPEPZgbONYUby8d",
      externalLink: "https://open.spotify.com/track/5DIAZjIZPEPZgbONYUby8d",
    },
  ],
} as const satisfies Track
