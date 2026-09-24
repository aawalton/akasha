import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulABlueWorld = {
  id: "01a0b4c8-5a08-7fca-8f7b-fbbf0ab9f716",
  type: "page-type/track",
  slug: "paul-cardall-faithful-a-blue-world",
  ownLength: 4.945333333333333,
  ownProgress: 4.945333333333333,
  partOfCollections: ["release/paul-cardall-faithful"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Blue World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ablueworld|7FQRbf8gbKw8KZQZAJWxH2|296720",
  song: "song/paul-cardall-a-blue-world",
  carriedBy: [
    {
      release: "release/paul-cardall-faithful",
      discNumber: 1,
      position: 6,
      externalId: "1K0NL2Sxe1acIY8239sZRb",
      externalLink: "https://open.spotify.com/track/1K0NL2Sxe1acIY8239sZRb",
    },
  ],
} as const satisfies Track
