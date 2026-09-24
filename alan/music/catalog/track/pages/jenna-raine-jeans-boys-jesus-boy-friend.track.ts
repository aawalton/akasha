import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineJeansBoysJesusBoyFriend = {
  id: "01a0c621-1606-706b-abd5-3a338dfdae30",
  type: "page-type/track",
  slug: "jenna-raine-jeans-boys-jesus-boy-friend",
  ownLength: 3.1588,
  ownProgress: 3.1588,
  partOfCollections: ["release/jenna-raine-jeans-boys-jesus"],
  status: "completed",
  unit: "unit/minutes",
  title: "Boy Friend",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jenna-raine" }],
  trackKey: "boyfriend|3aHe9rMa5HFTjXHw8tEz0A|189528",
  song: "song/jenna-raine-boy-friend",
  carriedBy: [
    {
      release: "release/jenna-raine-jeans-boys-jesus",
      discNumber: 1,
      position: 6,
      externalId: "0JpuK1Q7QDCN2IW5YmuDSg",
      externalLink: "https://open.spotify.com/track/0JpuK1Q7QDCN2IW5YmuDSg",
    },
  ],
} as const satisfies Track
