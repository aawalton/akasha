import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiImFakin = {
  id: "01a0b111-2543-72a6-9ee5-274c49b64b37",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-im-fakin",
  ownLength: 2.9218166666666665,
  ownProgress: 2.9218166666666665,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "I'm Fakin",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "imfakin|74KM79TiuVKeVCqs8QtB0B|175309",
  song: "song/sabrina-carpenter-im-fakin",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-ii",
      discNumber: 1,
      position: 4,
      externalId: "62dMfMIAoHZcu3ne9Ie3RE",
      externalLink: "https://open.spotify.com/track/62dMfMIAoHZcu3ne9Ie3RE",
    },
  ],
} as const satisfies Track
