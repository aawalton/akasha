import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineBeLikeYou2BeLikeYou = {
  id: "01a0c621-2633-70f1-b566-aafb87f1fa6e",
  type: "page-type/track",
  slug: "jenna-raine-be-like-you-2-be-like-you",
  ownLength: 2.9613833333333335,
  ownProgress: 0,
  partOfCollections: ["release/jenna-raine-be-like-you-2", "release/jenna-raine-be-like-you"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Be Like You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "belikeyou|3aHe9rMa5HFTjXHw8tEz0A|177683",
  song: "song/jenna-raine-be-like-you",
  carriedBy: [
    {
      release: "release/jenna-raine-be-like-you",
      discNumber: 1,
      position: 1,
      externalId: "4Nwf5aLRZHsY5K3A0AJJ1J",
      externalLink: "https://open.spotify.com/track/4Nwf5aLRZHsY5K3A0AJJ1J",
    },
    {
      release: "release/jenna-raine-be-like-you-2",
      discNumber: 1,
      position: 1,
      externalId: "7AlsTy6OrZsv4NexZYmfD5",
      externalLink: "https://open.spotify.com/track/7AlsTy6OrZsv4NexZYmfD5",
    },
  ],
} as const satisfies Track
