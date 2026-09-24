import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30ToBeLoved = {
  id: "01a0d52b-c25a-76c0-8d02-91e1070c25e2",
  type: "page-type/track",
  slug: "adele-30-to-be-loved",
  ownLength: 6.732683333333333,
  ownProgress: 6.732683333333333,
  partOfCollections: ["release/adele-30"],
  status: "completed",
  unit: "unit/minutes",
  title: "To Be Loved",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "tobeloved|4dpARuHxo51G3z768sgnrY|403961",
  song: "song/adele-to-be-loved",
  carriedBy: [
    {
      release: "release/adele-30",
      discNumber: 1,
      position: 11,
      externalId: "10ImcQk9tihY1EKMDIbvXJ",
      externalLink: "https://open.spotify.com/track/10ImcQk9tihY1EKMDIbvXJ",
    },
  ],
} as const satisfies Track
