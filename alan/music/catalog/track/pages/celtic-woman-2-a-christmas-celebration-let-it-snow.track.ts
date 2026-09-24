import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AChristmasCelebrationLetItSnow = {
  id: "01a0abea-7811-72a2-8f19-244cab0ba82b",
  type: "page-type/track",
  slug: "celtic-woman-2-a-christmas-celebration-let-it-snow",
  ownLength: 2.50955,
  ownProgress: 2.50955,
  partOfCollections: ["release/celtic-woman-2-a-christmas-celebration"],
  status: "completed",
  unit: "unit/minutes",
  title: "Let It Snow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "letitsnow|6NWtt9pNOL2Gx7kBykdE5x|150573",
  song: "song/celtic-woman-let-it-snow",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-christmas-celebration",
      discNumber: 1,
      position: 15,
      externalId: "44FJNOq0COMcht2LWn21FW",
      externalLink: "https://open.spotify.com/track/44FJNOq0COMcht2LWn21FW",
    },
  ],
} as const satisfies Track
