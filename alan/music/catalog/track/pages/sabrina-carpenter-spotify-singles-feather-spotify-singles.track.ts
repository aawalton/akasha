import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSpotifySinglesFeatherSpotifySingles = {
  id: "01a0b111-2d6f-759a-8f19-90c3a108f5a3",
  type: "page-type/track",
  slug: "sabrina-carpenter-spotify-singles-feather-spotify-singles",
  ownLength: 3.090866666666667,
  ownProgress: 3.090866666666667,
  partOfCollections: ["release/sabrina-carpenter-spotify-singles"],
  status: "completed",
  unit: "unit/minutes",
  title: "Feather - Spotify Singles",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "featherspotifysingles|74KM79TiuVKeVCqs8QtB0B|185452",
  song: "song/sabrina-carpenter-feather-spotify-singles",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-spotify-singles",
      discNumber: 1,
      position: 2,
      externalId: "2l6lCBL8egSBfL4ih4KtKk",
      externalLink: "https://open.spotify.com/track/2l6lCBL8egSBfL4ih4KtKk",
    },
  ],
} as const satisfies Track
