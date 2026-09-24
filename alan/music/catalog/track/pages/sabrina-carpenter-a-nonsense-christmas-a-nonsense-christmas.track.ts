import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterANonsenseChristmasANonsenseChristmas = {
  id: "01a0b111-2e1d-79d7-b3a1-04849f44c131",
  type: "page-type/track",
  slug: "sabrina-carpenter-a-nonsense-christmas-a-nonsense-christmas",
  ownLength: 2.55165,
  ownProgress: 2.55165,
  partOfCollections: [
    "release/sabrina-carpenter-a-nonsense-christmas",
    "release/sabrina-carpenter-fruitcake",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "A Nonsense Christmas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "anonsensechristmas|74KM79TiuVKeVCqs8QtB0B|153099",
  song: "song/sabrina-carpenter-a-nonsense-christmas",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-a-nonsense-christmas",
      discNumber: 1,
      position: 1,
      externalId: "7yogx3TwxGwSxO2QITsT2q",
      externalLink: "https://open.spotify.com/track/7yogx3TwxGwSxO2QITsT2q",
    },
    {
      release: "release/sabrina-carpenter-fruitcake",
      discNumber: 1,
      position: 1,
      externalId: "73ye7F9Ub51dQ3CrnCHFhr",
      externalLink: "https://open.spotify.com/track/73ye7F9Ub51dQ3CrnCHFhr",
    },
  ],
} as const satisfies Track
