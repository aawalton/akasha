import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineBeLikeYou2Technicolor = {
  id: "01a0c621-2772-79b7-87c6-858539e31971",
  type: "page-type/track",
  slug: "jenna-raine-be-like-you-2-technicolor",
  ownLength: 2.908316666666667,
  ownProgress: 2.908316666666667,
  partOfCollections: [
    "release/jenna-raine-be-like-you-2",
    "release/jenna-raine-be-like-you",
    "release/jenna-raine-technicolor",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Technicolor",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "technicolor|3aHe9rMa5HFTjXHw8tEz0A|174499",
  song: "song/jenna-raine-technicolor",
  carriedBy: [
    {
      release: "release/jenna-raine-be-like-you",
      discNumber: 1,
      position: 6,
      externalId: "44YOPzGhL4pqbTQqOzdEkX",
      externalLink: "https://open.spotify.com/track/44YOPzGhL4pqbTQqOzdEkX",
    },
    {
      release: "release/jenna-raine-be-like-you-2",
      discNumber: 1,
      position: 6,
      externalId: "4diVy0FYdLBLGG5UvrzQnI",
      externalLink: "https://open.spotify.com/track/4diVy0FYdLBLGG5UvrzQnI",
    },
    {
      release: "release/jenna-raine-technicolor",
      discNumber: 1,
      position: 1,
      externalId: "3eLkJfZbWrnXk9M2aCcl4E",
      externalLink: "https://open.spotify.com/track/3eLkJfZbWrnXk9M2aCcl4E",
    },
  ],
} as const satisfies Track
