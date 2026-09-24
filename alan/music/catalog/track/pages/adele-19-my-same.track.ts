import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19MySame = {
  id: "01a0d52b-c259-76af-b097-3ec8573b84e5",
  type: "page-type/track",
  slug: "adele-19-my-same",
  ownLength: 3.260883333333333,
  ownProgress: 3.260883333333333,
  partOfCollections: ["release/adele-19"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Same",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "mysame|4dpARuHxo51G3z768sgnrY|195653",
  song: "song/adele-my-same",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 10,
      externalId: "5IXOdt9lH8dv9tEHV1VGoK",
      externalLink: "https://open.spotify.com/track/5IXOdt9lH8dv9tEHV1VGoK",
    },
  ],
} as const satisfies Track
