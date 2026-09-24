import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaTheFoolTheFool = {
  id: "01a0aa7a-842b-72e7-a0ea-f3348754fb52",
  type: "page-type/track",
  slug: "alexandria-the-fool-the-fool",
  ownLength: 2.91935,
  ownProgress: 2.91935,
  partOfCollections: ["release/alexandria-the-fool"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Fool",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/alexandria" }],
  trackKey: "thefool|0SQG4wPVUlfbmbGQfqB47y|175161",
  song: "song/alexandria-the-fool",
  carriedBy: [
    {
      release: "release/alexandria-the-fool",
      discNumber: 1,
      position: 1,
      externalId: "5OkXA7ru3aZrY92m800aSc",
      externalLink: "https://open.spotify.com/track/5OkXA7ru3aZrY92m800aSc",
    },
  ],
} as const satisfies Track
