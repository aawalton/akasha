import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaPixiePixie = {
  id: "01a0aa7a-8a4d-7dc0-88f1-c51823319acb",
  type: "page-type/track",
  slug: "alexandria-pixie-pixie",
  ownLength: 3.4814666666666665,
  ownProgress: 3.4814666666666665,
  partOfCollections: ["release/alexandria-pixie"],
  status: "completed",
  unit: "unit/minutes",
  title: "Pixie",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/alexandria" }],
  trackKey: "pixie|0SQG4wPVUlfbmbGQfqB47y|208888",
  song: "song/alexandria-pixie",
  carriedBy: [
    {
      release: "release/alexandria-pixie",
      discNumber: 1,
      position: 1,
      externalId: "1IAS4hF2QOiDWsv0HDVL1H",
      externalLink: "https://open.spotify.com/track/1IAS4hF2QOiDWsv0HDVL1H",
    },
  ],
} as const satisfies Track
