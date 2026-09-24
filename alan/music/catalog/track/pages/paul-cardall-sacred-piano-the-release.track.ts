import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoTheRelease = {
  id: "01a0b4c8-4894-7405-bc51-7c7d6d39de58",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-the-release",
  ownLength: 3.4093333333333335,
  ownProgress: 3.4093333333333335,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Release",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "therelease|7FQRbf8gbKw8KZQZAJWxH2|204560",
  song: "song/paul-cardall-the-release",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 13,
      externalId: "2AfUXX1A5KGscwlp9J8Fhs",
      externalLink: "https://open.spotify.com/track/2AfUXX1A5KGscwlp9J8Fhs",
    },
  ],
} as const satisfies Track
