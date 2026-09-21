import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineBeLikeYou2LostAtSea = {
  id: "01a0c621-26ba-7d97-a5e3-2099b6021ad4",
  type: "page-type/track",
  slug: "jenna-raine-be-like-you-2-lost-at-sea",
  ownLength: 3.6595166666666668,
  ownProgress: 3.6595166666666668,
  partOfCollections: ["release/jenna-raine-be-like-you-2", "release/jenna-raine-be-like-you"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lost at Sea",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "lostatsea|3aHe9rMa5HFTjXHw8tEz0A|219571",
  song: "song/jenna-raine-lost-at-sea",
  carriedBy: [
    {
      release: "release/jenna-raine-be-like-you",
      discNumber: 1,
      position: 4,
      externalId: "3HA0Bnf3NasKIcA7FZzRdz",
      externalLink: "https://open.spotify.com/track/3HA0Bnf3NasKIcA7FZzRdz",
    },
    {
      release: "release/jenna-raine-be-like-you-2",
      discNumber: 1,
      position: 4,
      externalId: "4i82FUwGpnwe4dnpKdTw5t",
      externalLink: "https://open.spotify.com/track/4i82FUwGpnwe4dnpKdTw5t",
    },
  ],
} as const satisfies Track
