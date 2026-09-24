import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheGreatestJourneyEssentialCollectionAveMaria = {
  id: "01a0abea-7eb4-7445-b440-2c13e9dd6315",
  type: "page-type/track",
  slug: "celtic-woman-2-the-greatest-journey-essential-collection-ave-maria",
  ownLength: 2.8699833333333333,
  ownProgress: 2.8699833333333333,
  partOfCollections: ["release/celtic-woman-2-the-greatest-journey-essential-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ave Maria",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "avemaria|6NWtt9pNOL2Gx7kBykdE5x|172199",
  song: "song/celtic-woman-ave-maria",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-greatest-journey-essential-collection",
      discNumber: 1,
      position: 13,
      externalId: "6QS6YPHz807ohnNEr05mKh",
      externalLink: "https://open.spotify.com/track/6QS6YPHz807ohnNEr05mKh",
    },
  ],
} as const satisfies Track
