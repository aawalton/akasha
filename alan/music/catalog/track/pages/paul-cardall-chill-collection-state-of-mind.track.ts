import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionStateOfMind = {
  id: "01a0b4c8-45d5-70bd-9f2f-97f8ab325799",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-state-of-mind",
  ownLength: 4.196133333333333,
  ownProgress: 4.196133333333333,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "State of Mind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "stateofmind|7FQRbf8gbKw8KZQZAJWxH2|251768",
  song: "song/paul-cardall-state-of-mind",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 10,
      externalId: "7HbJxW7MtgE7CcFtyOEsXl",
      externalLink: "https://open.spotify.com/track/7HbJxW7MtgE7CcFtyOEsXl",
    },
  ],
} as const satisfies Track
