import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyCarrickfergus = {
  id: "01a0abea-7595-75c7-9995-130d5b8d7df2",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-carrickfergus",
  ownLength: 3.7204333333333333,
  ownProgress: 3.7204333333333333,
  partOfCollections: [
    "release/celtic-woman-2-a-new-journey",
    "release/celtic-woman-2-decade-the-songs-the-show-the-traditions-the-classics",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Carrickfergus",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "carrickfergus|6NWtt9pNOL2Gx7kBykdE5x|223226",
  song: "song/celtic-woman-carrickfergus",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-new-journey",
      discNumber: 1,
      position: 12,
      externalId: "3OukKkKoKiQhpbuAgnNj9a",
      externalLink: "https://open.spotify.com/track/3OukKkKoKiQhpbuAgnNj9a",
    },
    {
      release: "release/celtic-woman-2-decade-the-songs-the-show-the-traditions-the-classics",
      discNumber: 3,
      position: 10,
      externalId: "4TEK0trgxTkYUD83cjULtF",
      externalLink: "https://open.spotify.com/track/4TEK0trgxTkYUD83cjULtF",
    },
  ],
} as const satisfies Track
