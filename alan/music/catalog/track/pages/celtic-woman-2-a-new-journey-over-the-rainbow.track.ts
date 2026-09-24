import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyOverTheRainbow = {
  id: "01a0abea-7492-7a31-8651-3627f1d7bdf5",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-over-the-rainbow",
  ownLength: 2.6184333333333334,
  ownProgress: 2.6184333333333334,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  status: "completed",
  unit: "unit/minutes",
  title: "Over The Rainbow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "overtherainbow|6NWtt9pNOL2Gx7kBykdE5x|157106",
  song: "song/celtic-woman-over-the-rainbow",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-new-journey",
      discNumber: 1,
      position: 4,
      externalId: "6fcwyNqo0AUDpCwmzdZQvl",
      externalLink: "https://open.spotify.com/track/6fcwyNqo0AUDpCwmzdZQvl",
    },
  ],
} as const satisfies Track
