import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandAeFondKiss = {
  id: "01a0abea-5d25-7dff-a4b9-de18c546bd73",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-ae-fond-kiss",
  ownLength: 3.9917666666666665,
  ownProgress: 3.9917666666666665,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land",
    "release/celtic-woman-2-ancient-land-deluxe",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Ae Fond Kiss",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "aefondkiss|6NWtt9pNOL2Gx7kBykdE5x|239506",
  song: "song/celtic-woman-ae-fond-kiss",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 12,
      externalId: "5HUyQwyqXk5qDO7PyB2lWS",
      externalLink: "https://open.spotify.com/track/5HUyQwyqXk5qDO7PyB2lWS",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 12,
      externalId: "77bdzUwzuXiLUk39LyHWgt",
      externalLink: "https://open.spotify.com/track/77bdzUwzuXiLUk39LyHWgt",
    },
  ],
} as const satisfies Track
