import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterBringYourLoveHoneyDijonRemixesBringYourLoveTwilightMix = {
  id: "01a0b111-1aaa-7f56-b666-96bfb1fed657",
  type: "page-type/track",
  slug: "sabrina-carpenter-bring-your-love-honey-dijon-remixes-bring-your-love-twilight-mix",
  ownLength: 7.2294,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-bring-your-love-honey-dijon-remixes"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bring Your Love - Twilight Mix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artistName: "Madonna" },
    { artist: "artist/sabrina-carpenter" },
    { artistName: "Honey Dijon" },
  ],
  trackKey:
    "bringyourlovetwilightmix|0XfQBWgzisaS9ltDV9bXAS,6tbjWDEIzxoDsBA1FuhfPW,74KM79TiuVKeVCqs8QtB0B|433764",
  song: "song/sabrina-carpenter-bring-your-love",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-bring-your-love-honey-dijon-remixes",
      discNumber: 1,
      position: 2,
      externalId: "3kB60qmfOPMXgEG5NCVXgS",
      externalLink: "https://open.spotify.com/track/3kB60qmfOPMXgEG5NCVXgS",
    },
  ],
} as const satisfies Track
