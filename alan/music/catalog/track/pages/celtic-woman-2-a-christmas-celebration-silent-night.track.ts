import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AChristmasCelebrationSilentNight = {
  id: "01a0abea-76b9-706a-819d-90eed9612adb",
  type: "page-type/track",
  slug: "celtic-woman-2-a-christmas-celebration-silent-night",
  ownLength: 3.424,
  ownProgress: 3.424,
  partOfCollections: ["release/celtic-woman-2-a-christmas-celebration"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silent Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "silentnight|6NWtt9pNOL2Gx7kBykdE5x|205440",
  song: "song/celtic-woman-silent-night",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-christmas-celebration",
      discNumber: 1,
      position: 5,
      externalId: "7f8qQ7oqoMEr7YrGI0t3uD",
      externalLink: "https://open.spotify.com/track/7f8qQ7oqoMEr7YrGI0t3uD",
    },
  ],
} as const satisfies Track
