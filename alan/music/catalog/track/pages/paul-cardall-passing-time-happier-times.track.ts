import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPassingTimeHappierTimes = {
  id: "01a0b4c8-6c11-7905-843c-87d42f75340a",
  type: "page-type/track",
  slug: "paul-cardall-passing-time-happier-times",
  ownLength: 1.46895,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-passing-time"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5kGWSULTUdLHiIGraVpybl",
      externalLink: "https://open.spotify.com/track/5kGWSULTUdLHiIGraVpybl",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Happier Times",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "happiertimes|7FQRbf8gbKw8KZQZAJWxH2|88137",
  song: "song/paul-cardall-happier-times",
} as const satisfies Track
