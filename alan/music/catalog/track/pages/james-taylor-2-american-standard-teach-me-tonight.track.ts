import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardTeachMeTonight = {
  id: "01a0abeb-2e4c-7c6c-a2ad-4b8fd0a3f658",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-teach-me-tonight",
  ownLength: 2.98,
  ownProgress: 2.98,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  status: "completed",
  unit: "unit/minutes",
  title: "Teach Me Tonight",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "teachmetonight|0vn7UBvSQECKJm2817Yf1P|178800",
  song: "song/james-taylor-teach-me-tonight",
  carriedBy: [
    {
      release: "release/james-taylor-2-american-standard",
      discNumber: 1,
      position: 3,
      externalId: "2hVZIMjwyAWegOM0795wYx",
      externalLink: "https://open.spotify.com/track/2hVZIMjwyAWegOM0795wYx",
    },
  ],
} as const satisfies Track
