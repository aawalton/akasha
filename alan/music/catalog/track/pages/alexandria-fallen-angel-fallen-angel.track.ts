import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaFallenAngelFallenAngel = {
  id: "01a0aa7a-85c2-78fb-aea3-6e2a46ab2755",
  type: "page-type/track",
  slug: "alexandria-fallen-angel-fallen-angel",
  ownLength: 2.7624,
  ownProgress: 2.7624,
  partOfCollections: ["release/alexandria-fallen-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fallen Angel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/alexandria" }],
  trackKey: "fallenangel|0SQG4wPVUlfbmbGQfqB47y|165744",
  song: "song/alexandria-fallen-angel",
  carriedBy: [
    {
      release: "release/alexandria-fallen-angel",
      discNumber: 1,
      position: 1,
      externalId: "3seBiwK70S9YrmolLWJiVp",
      externalLink: "https://open.spotify.com/track/3seBiwK70S9YrmolLWJiVp",
    },
  ],
} as const satisfies Track
