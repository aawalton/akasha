import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoDanceOfTheLiving = {
  id: "01a0b4c8-3343-7987-bc72-94d0200e926d",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-dance-of-the-living",
  ownLength: 3.5877666666666665,
  ownProgress: 3.5877666666666665,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dance of the Living",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "danceoftheliving|7FQRbf8gbKw8KZQZAJWxH2|215266",
  song: "song/paul-cardall-dance-of-the-living",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 16,
      externalId: "4CufJg21ZFLZwGYmik66nE",
      externalLink: "https://open.spotify.com/track/4CufJg21ZFLZwGYmik66nE",
    },
  ],
} as const satisfies Track
