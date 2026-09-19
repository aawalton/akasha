import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenEarlyMonday = {
  id: "01a0b4c8-495b-7cda-b592-3acee89b040f",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-early-monday",
  ownLength: 3.566,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3O6XdRfu7EPes8FRC0IdOu",
      externalLink: "https://open.spotify.com/track/3O6XdRfu7EPes8FRC0IdOu",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Early Monday",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "earlymonday|7FQRbf8gbKw8KZQZAJWxH2|213960",
  song: "song/paul-cardall-early-monday",
} as const satisfies Track
