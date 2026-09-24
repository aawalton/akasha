import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsTheGathering = {
  id: "01a0b4c8-1e5e-7c57-911e-8ecf366ec360",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-the-gathering",
  ownLength: 3.414,
  ownProgress: 3.414,
  partOfCollections: ["release/paul-cardall-ancestors"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Gathering",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thegathering|7FQRbf8gbKw8KZQZAJWxH2|204840",
  song: "song/paul-cardall-the-gathering",
  carriedBy: [
    {
      release: "release/paul-cardall-ancestors",
      discNumber: 1,
      position: 2,
      externalId: "4DQoiSDwYMZZF2uKNAAF9E",
      externalLink: "https://open.spotify.com/track/4DQoiSDwYMZZF2uKNAAF9E",
    },
  ],
} as const satisfies Track
