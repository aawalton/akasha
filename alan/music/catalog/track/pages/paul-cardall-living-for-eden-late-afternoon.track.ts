import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenLateAfternoon = {
  id: "01a0b4c8-49aa-7272-a8b2-48543dbc56ba",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-late-afternoon",
  ownLength: 3.7413333333333334,
  ownProgress: 3.7413333333333334,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Late Afternoon",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "lateafternoon|7FQRbf8gbKw8KZQZAJWxH2|224480",
  song: "song/paul-cardall-late-afternoon",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 5,
      externalId: "3eizE9vP8DOrT3XYlup7Xk",
      externalLink: "https://open.spotify.com/track/3eizE9vP8DOrT3XYlup7Xk",
    },
  ],
} as const satisfies Track
