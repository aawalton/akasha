import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenAlongTheWasatch = {
  id: "01a0b4c8-4b9a-786f-8e54-0e1b723f48ec",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-along-the-wasatch",
  ownLength: 3.404,
  ownProgress: 3.404,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Along The Wasatch",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "alongthewasatch|7FQRbf8gbKw8KZQZAJWxH2|204240",
  song: "song/paul-cardall-along-the-wasatch",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 18,
      externalId: "5iM0a00B40fjS51dtTmXHt",
      externalLink: "https://open.spotify.com/track/5iM0a00B40fjS51dtTmXHt",
    },
  ],
} as const satisfies Track
