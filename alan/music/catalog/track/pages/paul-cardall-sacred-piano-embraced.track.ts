import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoEmbraced = {
  id: "01a0b4c8-48bc-79fe-b2a5-20b06dbbda68",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-embraced",
  ownLength: 3.1882166666666665,
  ownProgress: 3.1882166666666665,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Embraced",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "embraced|7FQRbf8gbKw8KZQZAJWxH2|191293",
  song: "song/paul-cardall-embraced",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 14,
      externalId: "7zIfL3Gs8IwKCWuAre4XP6",
      externalLink: "https://open.spotify.com/track/7zIfL3Gs8IwKCWuAre4XP6",
    },
  ],
} as const satisfies Track
