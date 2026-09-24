import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyTheHillsOfIreland = {
  id: "01a0abea-69fc-700f-980e-fa1e3b0f9176",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-the-hills-of-ireland",
  ownLength: 3.2007,
  ownProgress: 3.2007,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Hills Of Ireland",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "thehillsofireland|6NWtt9pNOL2Gx7kBykdE5x|192042",
  song: "song/celtic-woman-the-hills-of-ireland",
  carriedBy: [
    {
      release: "release/celtic-woman-2-destiny",
      discNumber: 1,
      position: 16,
      externalId: "52Mclc4OjcfWvFl7UL8miX",
      externalLink: "https://open.spotify.com/track/52Mclc4OjcfWvFl7UL8miX",
    },
  ],
} as const satisfies Track
