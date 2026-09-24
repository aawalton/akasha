import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenReturnToEden = {
  id: "01a0b4c8-4add-7131-88f3-9ab08a8ac552",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-return-to-eden",
  ownLength: 3.5657666666666668,
  ownProgress: 3.5657666666666668,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Return To Eden",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "returntoeden|7FQRbf8gbKw8KZQZAJWxH2|213946",
  song: "song/paul-cardall-return-to-eden",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 13,
      externalId: "5Usvxr0uLh0taMdOuMTJPs",
      externalLink: "https://open.spotify.com/track/5Usvxr0uLh0taMdOuMTJPs",
    },
  ],
} as const satisfies Track
