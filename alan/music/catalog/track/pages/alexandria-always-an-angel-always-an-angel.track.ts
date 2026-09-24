import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaAlwaysAnAngelAlwaysAnAngel = {
  id: "01a0aa7a-88cd-7704-8b58-c1606199523f",
  type: "page-type/track",
  slug: "alexandria-always-an-angel-always-an-angel",
  ownLength: 1.9375,
  ownProgress: 1.9375,
  partOfCollections: ["release/alexandria-always-an-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "Always an Angel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/alexandria" }],
  trackKey: "alwaysanangel|0SQG4wPVUlfbmbGQfqB47y|116250",
  song: "song/alexandria-always-an-angel",
  carriedBy: [
    {
      release: "release/alexandria-always-an-angel",
      discNumber: 1,
      position: 1,
      externalId: "5CziXblfbYNLB4dELQrgq4",
      externalLink: "https://open.spotify.com/track/5CziXblfbYNLB4dELQrgq4",
    },
  ],
} as const satisfies Track
