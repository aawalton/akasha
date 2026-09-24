import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsMountainMinuetUnbound = {
  id: "01a0b4c8-236c-787f-8903-134f259498c7",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-mountain-minuet-unbound",
  ownLength: 3.6041666666666665,
  ownProgress: 3.6041666666666665,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mountain Minuet Unbound",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "mountainminuetunbound|7FQRbf8gbKw8KZQZAJWxH2|216250",
  song: "song/paul-cardall-mountain-minuet-unbound",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 20,
      externalId: "4ClxRjdZVeVR40D2HR1a7L",
      externalLink: "https://open.spotify.com/track/4ClxRjdZVeVR40D2HR1a7L",
    },
  ],
} as const satisfies Track
