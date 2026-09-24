import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineSlapLeather = {
  id: "01a0abeb-3fcd-737e-8b2a-dc72cd452c55",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-slap-leather",
  ownLength: 1.9644333333333333,
  ownProgress: 1.9644333333333333,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  status: "completed",
  unit: "unit/minutes",
  title: "Slap Leather",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "slapleather|0vn7UBvSQECKJm2817Yf1P|117866",
  song: "song/james-taylor-slap-leather",
  carriedBy: [
    {
      release: "release/james-taylor-2-new-moon-shine",
      discNumber: 1,
      position: 6,
      externalId: "5pxaiDJQNRoZrT3uEbGMOD",
      externalLink: "https://open.spotify.com/track/5pxaiDJQNRoZrT3uEbGMOD",
    },
  ],
} as const satisfies Track
