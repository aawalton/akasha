import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionAllWeHaveIsLove = {
  id: "01a0b111-2834-722e-9517-5186062ec581",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-all-we-have-is-love",
  ownLength: 3.0382166666666666,
  ownProgress: 3.0382166666666666,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  status: "completed",
  unit: "unit/minutes",
  title: "All We Have Is Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "allwehaveislove|74KM79TiuVKeVCqs8QtB0B|182293",
  song: "song/sabrina-carpenter-all-we-have-is-love",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-evolution",
      discNumber: 1,
      position: 10,
      externalId: "4WFWvM4zjMgjQxmP21ezfO",
      externalLink: "https://open.spotify.com/track/4WFWvM4zjMgjQxmP21ezfO",
    },
  ],
} as const satisfies Track
