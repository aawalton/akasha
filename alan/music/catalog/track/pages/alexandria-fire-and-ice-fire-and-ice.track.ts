import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaFireAndIceFireAndIce = {
  id: "01a0aa7a-8749-7445-a102-7a337ca3d909",
  type: "page-type/track",
  slug: "alexandria-fire-and-ice-fire-and-ice",
  ownLength: 2.3349,
  ownProgress: 2.3349,
  partOfCollections: ["release/alexandria-fire-and-ice"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fire and Ice",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/alexandria" }],
  trackKey: "fireandice|0SQG4wPVUlfbmbGQfqB47y|140094",
  song: "song/alexandria-fire-and-ice",
  carriedBy: [
    {
      release: "release/alexandria-fire-and-ice",
      discNumber: 1,
      position: 1,
      externalId: "10sQMYrMaRMAjgQqU0rT9m",
      externalLink: "https://open.spotify.com/track/10sQMYrMaRMAjgQqU0rT9m",
    },
  ],
} as const satisfies Track
