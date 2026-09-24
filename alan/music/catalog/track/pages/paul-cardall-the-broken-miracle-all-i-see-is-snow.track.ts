import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleAllISeeIsSnow = {
  id: "01a0b4c8-2fa7-7421-b340-138514a013f2",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-all-i-see-is-snow",
  ownLength: 4.556,
  ownProgress: 4.556,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "All I See Is Snow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }, { artistName: "Thompson Square" }],
  trackKey: "alliseeissnow|0Bvs8yPjrQSbmVIRqSg1Sp,7FQRbf8gbKw8KZQZAJWxH2|273360",
  song: "song/paul-cardall-all-i-see-is-snow",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 8,
      externalId: "5KJqcYc9vpURfiU0EuWBMi",
      externalLink: "https://open.spotify.com/track/5KJqcYc9vpURfiU0EuWBMi",
    },
  ],
} as const satisfies Track
