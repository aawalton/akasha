import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoOutOfTheAshes = {
  id: "01a0b4c8-32e4-7405-a089-fc4293e38ef6",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-out-of-the-ashes",
  ownLength: 3.68955,
  ownProgress: 3.68955,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Out of the Ashes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "outoftheashes|7FQRbf8gbKw8KZQZAJWxH2|221373",
  song: "song/paul-cardall-out-of-the-ashes",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 13,
      externalId: "401671bNrYWakt7WxNohsG",
      externalLink: "https://open.spotify.com/track/401671bNrYWakt7WxNohsG",
    },
  ],
} as const satisfies Track
