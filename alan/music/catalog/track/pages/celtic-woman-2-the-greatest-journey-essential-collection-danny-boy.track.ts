import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheGreatestJourneyEssentialCollectionDannyBoy = {
  id: "01a0abea-7e00-7ca1-98b6-d5d63ca33ea2",
  type: "page-type/track",
  slug: "celtic-woman-2-the-greatest-journey-essential-collection-danny-boy",
  ownLength: 3.4193333333333333,
  ownProgress: 3.4193333333333333,
  partOfCollections: ["release/celtic-woman-2-the-greatest-journey-essential-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Danny Boy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "dannyboy|6NWtt9pNOL2Gx7kBykdE5x|205160",
  song: "song/celtic-woman-danny-boy",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-greatest-journey-essential-collection",
      discNumber: 1,
      position: 7,
      externalId: "3kFwfCjcDzVwqD5gFwyyCv",
      externalLink: "https://open.spotify.com/track/3kFwfCjcDzVwqD5gFwyyCv",
    },
  ],
} as const satisfies Track
