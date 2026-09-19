import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoAfterTheStorm = {
  id: "01a0b4c8-4780-7ee9-820b-9bd679f90df8",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-after-the-storm",
  ownLength: 2.918,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1FZBFu5w1WJ8wm4uMUB8FU",
      externalLink: "https://open.spotify.com/track/1FZBFu5w1WJ8wm4uMUB8FU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "After the Storm",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "afterthestorm|7FQRbf8gbKw8KZQZAJWxH2|175080",
  song: "song/paul-cardall-after-the-storm",
} as const satisfies Track
