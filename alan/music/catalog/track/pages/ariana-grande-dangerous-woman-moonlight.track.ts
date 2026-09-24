import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanMoonlight = {
  id: "01a0a6c5-2b0d-7f43-8eb4-dd9c5c3059ff",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-moonlight",
  ownLength: 3.3726666666666665,
  ownProgress: 3.3726666666666665,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Moonlight",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "moonlight|66CXWjxzNUsdJxJ2JdwvnR|202360",
  song: "song/ariana-grande-moonlight",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 1,
      externalId: "1qcJdr8TYuGjFhjRoYNC3e",
      externalLink: "https://open.spotify.com/track/1qcJdr8TYuGjFhjRoYNC3e",
    },
  ],
} as const satisfies Track
