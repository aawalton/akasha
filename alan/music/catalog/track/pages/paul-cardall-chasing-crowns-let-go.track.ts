import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsLetGo = {
  id: "01a0b4c8-21c7-70a5-978c-c454c3f71f3a",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-let-go",
  ownLength: 2.975,
  ownProgress: 2.975,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Let Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "letgo|7FQRbf8gbKw8KZQZAJWxH2|178500",
  song: "song/paul-cardall-let-go",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 9,
      externalId: "2VeffqUMeC7VlyTyP34zjd",
      externalLink: "https://open.spotify.com/track/2VeffqUMeC7VlyTyP34zjd",
    },
  ],
} as const satisfies Track
