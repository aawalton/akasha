import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBreakFreeBreakFreeInstrumental = {
  id: "01a0a6c5-3d82-7eba-b64b-bf7a527eeec8",
  type: "page-type/track",
  slug: "ariana-grande-break-free-break-free-instrumental",
  ownLength: 3.572,
  ownProgress: 3.572,
  partOfCollections: ["release/ariana-grande-break-free"],
  status: "completed",
  unit: "unit/minutes",
  title: "Break Free - Instrumental",
  trackType: "instrumental",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Zedd" }],
  trackKey: "breakfreeinstrumental|2qxJFvFYMEDqd7ui6kSAcq,66CXWjxzNUsdJxJ2JdwvnR|214320",
  song: "song/ariana-grande-break-free",
  carriedBy: [
    {
      release: "release/ariana-grande-break-free",
      discNumber: 1,
      position: 3,
      externalId: "4XUkjZrKbmpzSMo5pX1n5m",
      externalLink: "https://open.spotify.com/track/4XUkjZrKbmpzSMo5pX1n5m",
    },
  ],
} as const satisfies Track
