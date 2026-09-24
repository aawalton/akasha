import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterBringYourLoveBringYourLove = {
  id: "01a0b111-1b17-7ec9-8e24-17ba23d45d11",
  type: "page-type/track",
  slug: "sabrina-carpenter-bring-your-love-bring-your-love",
  ownLength: 3.6066666666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-bring-your-love"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bring Your Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Madonna" }, { artist: "artist/sabrina-carpenter" }],
  trackKey: "bringyourlove|6tbjWDEIzxoDsBA1FuhfPW,74KM79TiuVKeVCqs8QtB0B|216400",
  song: "song/sabrina-carpenter-bring-your-love",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-bring-your-love",
      discNumber: 1,
      position: 1,
      externalId: "0Wr7vTGp9vF3YCG4EASz1e",
      externalLink: "https://open.spotify.com/track/0Wr7vTGp9vF3YCG4EASz1e",
    },
  ],
} as const satisfies Track
