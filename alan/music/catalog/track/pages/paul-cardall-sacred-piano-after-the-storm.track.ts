import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoAfterTheStorm = {
  id: "01a0b4c8-4780-7ee9-820b-9bd679f90df8",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-after-the-storm",
  ownLength: 2.918,
  ownProgress: 2.918,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "After the Storm",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "afterthestorm|7FQRbf8gbKw8KZQZAJWxH2|175080",
  song: "song/paul-cardall-after-the-storm",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 6,
      externalId: "1FZBFu5w1WJ8wm4uMUB8FU",
      externalLink: "https://open.spotify.com/track/1FZBFu5w1WJ8wm4uMUB8FU",
    },
  ],
} as const satisfies Track
