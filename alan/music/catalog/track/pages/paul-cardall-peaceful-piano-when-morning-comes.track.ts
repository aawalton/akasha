import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoWhenMorningComes = {
  id: "01a0b4c8-3183-7201-b10b-e5fcd5935210",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-when-morning-comes",
  ownLength: 3.0831,
  ownProgress: 3.0831,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "When Morning Comes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "whenmorningcomes|7FQRbf8gbKw8KZQZAJWxH2|184986",
  song: "song/paul-cardall-when-morning-comes",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 2,
      externalId: "0nku2WnTle72iE8OrNyDwT",
      externalLink: "https://open.spotify.com/track/0nku2WnTle72iE8OrNyDwT",
    },
  ],
} as const satisfies Track
