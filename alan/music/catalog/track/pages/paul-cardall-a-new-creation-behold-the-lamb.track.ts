import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationBeholdTheLamb = {
  id: "01a0b4c8-3629-7a7c-b1b0-3ecbabc34683",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-behold-the-lamb",
  ownLength: 1.5388833333333334,
  ownProgress: 1.5388833333333334,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  title: "Behold, The Lamb",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "beholdthelamb|7FQRbf8gbKw8KZQZAJWxH2|92333",
  song: "song/paul-cardall-behold-the-lamb",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 6,
      externalId: "2eoKgh60xFf7P5lIrjKgmd",
      externalLink: "https://open.spotify.com/track/2eoKgh60xFf7P5lIrjKgmd",
    },
  ],
} as const satisfies Track
