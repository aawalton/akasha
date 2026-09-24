import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyTheBlessing = {
  id: "01a0abea-71ee-7167-ad81-2df720fa0a4d",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-the-blessing",
  ownLength: 3.862,
  ownProgress: 3.862,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Blessing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "theblessing|6NWtt9pNOL2Gx7kBykdE5x|231720",
  song: "song/celtic-woman-the-blessing",
  carriedBy: [
    {
      release: "release/celtic-woman-2-lullaby",
      discNumber: 1,
      position: 8,
      externalId: "6G6NlVtzCW4asCmlYm0SUs",
      externalLink: "https://open.spotify.com/track/6G6NlVtzCW4asCmlYm0SUs",
    },
  ],
} as const satisfies Track
