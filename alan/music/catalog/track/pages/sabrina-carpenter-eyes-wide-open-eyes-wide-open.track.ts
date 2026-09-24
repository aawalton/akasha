import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenEyesWideOpen = {
  id: "01a0b111-2854-7e62-8ac4-60989117d414",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-eyes-wide-open",
  ownLength: 3.212,
  ownProgress: 3.212,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  status: "completed",
  unit: "unit/minutes",
  title: "Eyes Wide Open",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "eyeswideopen|74KM79TiuVKeVCqs8QtB0B|192720",
  song: "song/sabrina-carpenter-eyes-wide-open",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-eyes-wide-open",
      discNumber: 1,
      position: 1,
      externalId: "4pbrp5dxpqjfaf4GiS6YuO",
      externalLink: "https://open.spotify.com/track/4pbrp5dxpqjfaf4GiS6YuO",
    },
  ],
} as const satisfies Track
