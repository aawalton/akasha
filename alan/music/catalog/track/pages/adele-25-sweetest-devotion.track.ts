import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele25SweetestDevotion = {
  id: "01a0d52b-c25a-793a-bcc0-acd5f377c584",
  type: "page-type/track",
  slug: "adele-25-sweetest-devotion",
  ownLength: 4.195016666666667,
  ownProgress: 4.195016666666667,
  partOfCollections: ["release/adele-25"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweetest Devotion",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "sweetestdevotion|4dpARuHxo51G3z768sgnrY|251701",
  song: "song/adele-sweetest-devotion",
  carriedBy: [
    {
      release: "release/adele-25",
      discNumber: 1,
      position: 11,
      externalId: "10tHyoc3wSA5scOVZuMcFm",
      externalLink: "https://open.spotify.com/track/10tHyoc3wSA5scOVZuMcFm",
    },
  ],
} as const satisfies Track
