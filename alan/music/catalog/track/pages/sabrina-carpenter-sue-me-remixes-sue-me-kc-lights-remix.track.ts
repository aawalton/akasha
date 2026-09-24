import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSueMeRemixesSueMeKcLightsRemix = {
  id: "01a0b111-3057-7b6a-8d6a-8aba1c2509b0",
  type: "page-type/track",
  slug: "sabrina-carpenter-sue-me-remixes-sue-me-kc-lights-remix",
  ownLength: 3.3698166666666665,
  ownProgress: 3.3698166666666665,
  partOfCollections: ["release/sabrina-carpenter-sue-me-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sue Me - KC Lights Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }, { artistName: "KC Lights" }],
  trackKey: "suemekclightsremix|0bUZrFj7rstq07E4iAJHgZ,74KM79TiuVKeVCqs8QtB0B|202189",
  song: "song/sabrina-carpenter-sue-me",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-sue-me-remixes",
      discNumber: 1,
      position: 2,
      externalId: "0Mtz5ZTbFSkhN4yCirMOIS",
      externalLink: "https://open.spotify.com/track/0Mtz5ZTbFSkhN4yCirMOIS",
    },
  ],
} as const satisfies Track
