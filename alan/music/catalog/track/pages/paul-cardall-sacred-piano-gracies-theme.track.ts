import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoGraciesTheme = {
  id: "01a0b4c8-4736-7263-a90d-64241f6273f0",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-gracies-theme",
  ownLength: 4.32265,
  ownProgress: 4.32265,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Gracie's Theme",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "graciestheme|7FQRbf8gbKw8KZQZAJWxH2|259359",
  song: "song/paul-cardall-gracies-theme",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 4,
      externalId: "0UFK7SQY17RqV3WiexKiOz",
      externalLink: "https://open.spotify.com/track/0UFK7SQY17RqV3WiexKiOz",
    },
  ],
} as const satisfies Track
