import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele25MillionYearsAgo = {
  id: "01a0d52b-c25a-7762-b67e-b3a31e1af400",
  type: "page-type/track",
  slug: "adele-25-million-years-ago",
  ownLength: 3.7844166666666665,
  ownProgress: 3.7844166666666665,
  partOfCollections: ["release/adele-25"],
  status: "completed",
  unit: "unit/minutes",
  title: "Million Years Ago",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "millionyearsago|4dpARuHxo51G3z768sgnrY|227065",
  song: "song/adele-million-years-ago",
  carriedBy: [
    {
      release: "release/adele-25",
      discNumber: 1,
      position: 9,
      externalId: "0ijHEBUBXIJPp5ubUkDLQi",
      externalLink: "https://open.spotify.com/track/0ijHEBUBXIJPp5ubUkDLQi",
    },
  ],
} as const satisfies Track
