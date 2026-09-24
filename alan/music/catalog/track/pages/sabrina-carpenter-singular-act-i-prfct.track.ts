import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIPrfct = {
  id: "01a0b111-2690-7a4e-b5fa-07fd6e9f187c",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-prfct",
  ownLength: 2.77555,
  ownProgress: 2.77555,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  status: "completed",
  unit: "unit/minutes",
  title: "prfct",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "prfct|74KM79TiuVKeVCqs8QtB0B|166533",
  song: "song/sabrina-carpenter-prfct",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-i",
      discNumber: 1,
      position: 5,
      externalId: "75wU86jr8iIiBVfD3kU3cU",
      externalLink: "https://open.spotify.com/track/75wU86jr8iIiBVfD3kU3cU",
    },
  ],
} as const satisfies Track
