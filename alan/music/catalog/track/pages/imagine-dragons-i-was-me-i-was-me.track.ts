import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsIWasMeIWasMe = {
  id: "01a0c43f-df27-7c69-b8ce-04403485031f",
  type: "page-type/track",
  slug: "imagine-dragons-i-was-me-i-was-me",
  ownLength: 3.2668833333333334,
  ownProgress: 3.2668833333333334,
  partOfCollections: ["release/imagine-dragons-i-was-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Was Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "iwasme|53XhwfbYqKCa1cC15pYq2q|196013",
  song: "song/imagine-dragons-i-was-me",
  carriedBy: [
    {
      release: "release/imagine-dragons-i-was-me",
      discNumber: 1,
      position: 1,
      externalId: "27eKJ4RlK36novSUJQXlVH",
      externalLink: "https://open.spotify.com/track/27eKJ4RlK36novSUJQXlVH",
    },
  ],
} as const satisfies Track
