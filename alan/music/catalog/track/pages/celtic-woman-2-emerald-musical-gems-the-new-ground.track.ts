import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2EmeraldMusicalGemsTheNewGround = {
  id: "01a0abea-6c01-7cca-b298-022eeb1936de",
  type: "page-type/track",
  slug: "celtic-woman-2-emerald-musical-gems-the-new-ground",
  ownLength: 2.0591,
  ownProgress: 2.0591,
  partOfCollections: ["release/celtic-woman-2-emerald-musical-gems"],
  status: "completed",
  unit: "unit/minutes",
  title: "The New Ground",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "thenewground|6NWtt9pNOL2Gx7kBykdE5x|123546",
  song: "song/celtic-woman-the-new-ground",
  carriedBy: [
    {
      release: "release/celtic-woman-2-emerald-musical-gems",
      discNumber: 1,
      position: 5,
      externalId: "3cNnzEh2kxYLQtF56E6ofU",
      externalLink: "https://open.spotify.com/track/3cNnzEh2kxYLQtF56E6ofU",
    },
  ],
} as const satisfies Track
