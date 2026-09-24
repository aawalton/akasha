import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsEvolveYesterday = {
  id: "01a0c43f-caf6-727f-b2f3-4a62514d8197",
  type: "page-type/track",
  slug: "imagine-dragons-evolve-yesterday",
  ownLength: 3.41855,
  ownProgress: 3.41855,
  partOfCollections: ["release/imagine-dragons-evolve"],
  status: "completed",
  unit: "unit/minutes",
  title: "Yesterday",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "yesterday|53XhwfbYqKCa1cC15pYq2q|205113",
  song: "song/imagine-dragons-yesterday",
  carriedBy: [
    {
      release: "release/imagine-dragons-evolve",
      discNumber: 1,
      position: 8,
      externalId: "2SJf7W18D1AEpr8L9ATu0c",
      externalLink: "https://open.spotify.com/track/2SJf7W18D1AEpr8L9ATu0c",
    },
  ],
} as const satisfies Track
