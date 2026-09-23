import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedTheLastTime = {
  id: "01a0ce86-8539-7cda-a788-92b7c7b6fea5",
  type: "page-type/track",
  slug: "taylor-swift-2-red-the-last-time",
  ownLength: 4.97155,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Last Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "3fCQnw6VSudXBTN5d2QP2z", artistName: "Gary Lightbody" },
  ],
  trackKey: "thelasttime|06HL4z0CvFAxyc27GXpf02,3fCQnw6VSudXBTN5d2QP2z|298293",
  song: "song/taylor-swift-the-last-time",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 10,
      externalId: "3n9mzjgAzjyKawvbHzciXF",
      externalLink: "https://open.spotify.com/track/3n9mzjgAzjyKawvbHzciXF",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 10,
      externalId: "7vvIpJZye5cRR6De1LKM0m",
      externalLink: "https://open.spotify.com/track/7vvIpJZye5cRR6De1LKM0m",
    },
  ],
} as const satisfies Track
