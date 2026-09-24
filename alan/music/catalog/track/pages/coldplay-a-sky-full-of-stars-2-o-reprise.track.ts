import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayASkyFullOfStars2OReprise = {
  id: "01a0b9ee-f6ba-7a74-890f-2fd0afeb42bb",
  type: "page-type/track",
  slug: "coldplay-a-sky-full-of-stars-2-o-reprise",
  ownLength: 1.6226666666666667,
  ownProgress: 1.6226666666666667,
  partOfCollections: ["release/coldplay-a-sky-full-of-stars-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "O - Reprise",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "oreprise|4gzpq5DPGxSnKTe4SA8HAU|97360",
  song: "song/coldplay-o",
  carriedBy: [
    {
      release: "release/coldplay-a-sky-full-of-stars-2",
      discNumber: 1,
      position: 4,
      externalId: "1NleqQdTDGWJBk0bVxldab",
      externalLink: "https://open.spotify.com/track/1NleqQdTDGWJBk0bVxldab",
    },
  ],
} as const satisfies Track
