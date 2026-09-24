import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele21SetFireToTheRain = {
  id: "01a0d52b-c25a-7d71-bf00-770a58b160a1",
  type: "page-type/track",
  slug: "adele-21-set-fire-to-the-rain",
  ownLength: 4.04955,
  ownProgress: 0,
  partOfCollections: ["release/adele-21"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Set Fire to the Rain",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "setfiretotherain|4dpARuHxo51G3z768sgnrY|242973",
  song: "song/adele-set-fire-to-the-rain",
  carriedBy: [
    {
      release: "release/adele-21",
      discNumber: 1,
      position: 5,
      externalId: "73CMRj62VK8nUS4ezD2wvi",
      externalLink: "https://open.spotify.com/track/73CMRj62VK8nUS4ezD2wvi",
    },
  ],
} as const satisfies Track
