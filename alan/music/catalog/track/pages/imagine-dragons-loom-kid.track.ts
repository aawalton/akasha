import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomKid = {
  id: "01a0c43f-b567-7527-bb59-eee31f316878",
  type: "page-type/track",
  slug: "imagine-dragons-loom-kid",
  ownLength: 2.6631,
  ownProgress: 2.6631,
  partOfCollections: ["release/imagine-dragons-loom"],
  status: "completed",
  unit: "unit/minutes",
  title: "Kid",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "kid|53XhwfbYqKCa1cC15pYq2q|159786",
  song: "song/imagine-dragons-kid",
  carriedBy: [
    {
      release: "release/imagine-dragons-loom",
      discNumber: 1,
      position: 8,
      externalId: "4PPK3VK5iDF7Vqmey65li2",
      externalLink: "https://open.spotify.com/track/4PPK3VK5iDF7Vqmey65li2",
    },
  ],
} as const satisfies Track
