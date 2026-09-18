import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoWhenMorningComes = {
  id: "01a0b4c8-3183-7201-b10b-e5fcd5935210",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-when-morning-comes",
  ownLength: 3.0831,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0nku2WnTle72iE8OrNyDwT",
      externalLink: "https://open.spotify.com/track/0nku2WnTle72iE8OrNyDwT",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "When Morning Comes",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "whenmorningcomes|7FQRbf8gbKw8KZQZAJWxH2|184986",
} as const satisfies Track
