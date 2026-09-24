import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndExtendedMixInstrumental = {
  id: "01a0a6c5-3549-7927-9a5a-b06f0aa974c0",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-extended-mix-instrumental",
  ownLength: 5.136733333333333,
  ownProgress: 5.136733333333333,
  partOfCollections: ["release/ariana-grande-yes-and"],
  status: "completed",
  unit: "unit/minutes",
  title: "yes, and? - extended mix instrumental",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "yesandextendedmixinstrumental|66CXWjxzNUsdJxJ2JdwvnR|308204",
  song: "song/ariana-grande-yes-and",
  carriedBy: [
    {
      release: "release/ariana-grande-yes-and",
      discNumber: 1,
      position: 8,
      externalId: "3AF1Q0Ce50AsqrX6qKbZEc",
      externalLink: "https://open.spotify.com/track/3AF1Q0Ce50AsqrX6qKbZEc",
    },
  ],
} as const satisfies Track
