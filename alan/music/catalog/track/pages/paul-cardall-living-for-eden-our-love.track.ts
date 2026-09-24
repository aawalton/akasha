import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenOurLove = {
  id: "01a0b4c8-490b-7056-aa18-b312f22c10ba",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-our-love",
  ownLength: 3.86,
  ownProgress: 3.86,
  partOfCollections: [
    "release/paul-cardall-living-for-eden",
    "release/paul-cardall-saving-tiny-hearts",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Our Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ourlove|7FQRbf8gbKw8KZQZAJWxH2|231600",
  song: "song/paul-cardall-our-love",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 1,
      externalId: "1BqSWGmMMuJpNyCSO8Gz1d",
      externalLink: "https://open.spotify.com/track/1BqSWGmMMuJpNyCSO8Gz1d",
    },
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 9,
      externalId: "1kbItb45MwET1UkL5T3Gu9",
      externalLink: "https://open.spotify.com/track/1kbItb45MwET1UkL5T3Gu9",
    },
  ],
} as const satisfies Track
