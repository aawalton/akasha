import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeTrouble = {
  id: "01a0c43f-d05d-707e-8bfd-e60d609d32c4",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-trouble",
  ownLength: 3.19,
  ownProgress: 3.19,
  partOfCollections: [
    "release/imagine-dragons-smoke-mirrors-deluxe",
    "release/imagine-dragons-smoke-mirrors",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Trouble",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "trouble|53XhwfbYqKCa1cC15pYq2q|191400",
  song: "song/imagine-dragons-trouble",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors",
      discNumber: 1,
      position: 10,
      externalId: "7oeeeHdNY8S6zVsU0fuWLr",
      externalLink: "https://open.spotify.com/track/7oeeeHdNY8S6zVsU0fuWLr",
    },
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "6JsePoT1VWserj2YIUu0hE",
      externalLink: "https://open.spotify.com/track/6JsePoT1VWserj2YIUu0hE",
    },
  ],
} as const satisfies Track
