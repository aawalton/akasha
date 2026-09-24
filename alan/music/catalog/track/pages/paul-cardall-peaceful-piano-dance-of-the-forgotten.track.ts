import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoDanceOfTheForgotten = {
  id: "01a0b4c8-32a6-7195-8996-26c8171205ba",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-dance-of-the-forgotten",
  ownLength: 3.0797666666666665,
  ownProgress: 3.0797666666666665,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dance of the Forgotten",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "danceoftheforgotten|7FQRbf8gbKw8KZQZAJWxH2|184786",
  song: "song/paul-cardall-dance-of-the-forgotten",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 11,
      externalId: "06C3k3I4a9Sdm49uOfPee9",
      externalLink: "https://open.spotify.com/track/06C3k3I4a9Sdm49uOfPee9",
    },
  ],
} as const satisfies Track
