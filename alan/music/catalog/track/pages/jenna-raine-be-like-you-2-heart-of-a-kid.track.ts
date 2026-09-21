import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineBeLikeYou2HeartOfAKid = {
  id: "01a0c621-26e7-741a-a222-d1fb2b284820",
  type: "page-type/track",
  slug: "jenna-raine-be-like-you-2-heart-of-a-kid",
  ownLength: 3.758766666666667,
  ownProgress: 0,
  partOfCollections: ["release/jenna-raine-be-like-you-2", "release/jenna-raine-be-like-you"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Heart of a Kid",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "heartofakid|3aHe9rMa5HFTjXHw8tEz0A|225526",
  song: "song/jenna-raine-heart-of-a-kid",
  carriedBy: [
    {
      release: "release/jenna-raine-be-like-you",
      discNumber: 1,
      position: 5,
      externalId: "2OSxQwMJjSZk6wJCCofXNL",
      externalLink: "https://open.spotify.com/track/2OSxQwMJjSZk6wJCCofXNL",
    },
    {
      release: "release/jenna-raine-be-like-you-2",
      discNumber: 1,
      position: 5,
      externalId: "55vymoPBoHbxNBdYnM0EVN",
      externalLink: "https://open.spotify.com/track/55vymoPBoHbxNBdYnM0EVN",
    },
  ],
} as const satisfies Track
