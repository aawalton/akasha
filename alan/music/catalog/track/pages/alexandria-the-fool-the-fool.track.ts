import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaTheFoolTheFool = {
  id: "01a0aa7a-842b-72e7-a0ea-f3348754fb52",
  type: "page-type/track",
  slug: "alexandria-the-fool-the-fool",
  ownLength: 2.91935,
  ownProgress: 0,
  partOfCollections: ["release/alexandria-the-fool"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5OkXA7ru3aZrY92m800aSc",
      externalLink: "https://open.spotify.com/track/5OkXA7ru3aZrY92m800aSc",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Fool",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0SQG4wPVUlfbmbGQfqB47y", artistName: "Alexandria" }],
  trackKey: "thefool|0SQG4wPVUlfbmbGQfqB47y|175161",
  song: "song/alexandria-the-fool",
} as const satisfies Track
