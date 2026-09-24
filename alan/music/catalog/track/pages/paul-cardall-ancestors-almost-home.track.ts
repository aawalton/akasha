import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsAlmostHome = {
  id: "01a0b4c8-1fd0-7c5f-94d4-1241a8ff0072",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-almost-home",
  ownLength: 2.2300333333333335,
  ownProgress: 2.2300333333333335,
  partOfCollections: ["release/paul-cardall-ancestors"],
  status: "completed",
  unit: "unit/minutes",
  title: "Almost Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "almosthome|7FQRbf8gbKw8KZQZAJWxH2|133802",
  song: "song/paul-cardall-almost-home",
  carriedBy: [
    {
      release: "release/paul-cardall-ancestors",
      discNumber: 1,
      position: 12,
      externalId: "3SixQfC0NUXp1gcnHHw9qu",
      externalLink: "https://open.spotify.com/track/3SixQfC0NUXp1gcnHHw9qu",
    },
  ],
} as const satisfies Track
