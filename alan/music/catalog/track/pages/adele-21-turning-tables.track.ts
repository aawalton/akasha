import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele21TurningTables = {
  id: "01a0d52b-c25a-7bcd-8e15-e417b9f4d5ed",
  type: "page-type/track",
  slug: "adele-21-turning-tables",
  ownLength: 4.166666666666667,
  ownProgress: 4.166666666666667,
  partOfCollections: ["release/adele-21"],
  status: "completed",
  unit: "unit/minutes",
  title: "Turning Tables",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "turningtables|4dpARuHxo51G3z768sgnrY|250000",
  song: "song/adele-turning-tables",
  carriedBy: [
    {
      release: "release/adele-21",
      discNumber: 1,
      position: 3,
      externalId: "4oy98QoABnGKpvapDkI525",
      externalLink: "https://open.spotify.com/track/4oy98QoABnGKpvapDkI525",
    },
  ],
} as const satisfies Track
