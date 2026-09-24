import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulFaithful = {
  id: "01a0b4c8-5954-762d-9d06-c891fa44a7ab",
  type: "page-type/track",
  slug: "paul-cardall-faithful-faithful",
  ownLength: 4.856883333333333,
  ownProgress: 4.856883333333333,
  partOfCollections: ["release/paul-cardall-faithful"],
  status: "completed",
  unit: "unit/minutes",
  title: "Faithful",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "faithful|7FQRbf8gbKw8KZQZAJWxH2|291413",
  song: "song/paul-cardall-faithful",
  carriedBy: [
    {
      release: "release/paul-cardall-faithful",
      discNumber: 1,
      position: 1,
      externalId: "29RN3dYeRN85alf5DNAbuH",
      externalLink: "https://open.spotify.com/track/29RN3dYeRN85alf5DNAbuH",
    },
  ],
} as const satisfies Track
