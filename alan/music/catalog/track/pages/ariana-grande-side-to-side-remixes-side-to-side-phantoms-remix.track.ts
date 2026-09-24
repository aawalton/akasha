import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSideToSideRemixesSideToSidePhantomsRemix = {
  id: "01a0a6c5-3903-731c-a2e7-fc43ff15beab",
  type: "page-type/track",
  slug: "ariana-grande-side-to-side-remixes-side-to-side-phantoms-remix",
  ownLength: 4.276,
  ownProgress: 4.276,
  partOfCollections: ["release/ariana-grande-side-to-side-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Side To Side - Phantoms Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artist: "artist/ariana-grande" },
    { artistName: "Nicki Minaj" },
    { artistName: "Phantoms" },
  ],
  trackKey:
    "sidetosidephantomsremix|0hCNtLu0JehylgoiP8L4Gh,1bJJlRHoc1UVeqzxcrPLIw,66CXWjxzNUsdJxJ2JdwvnR|256560",
  song: "song/ariana-grande-side-to-side",
  carriedBy: [
    {
      release: "release/ariana-grande-side-to-side-remixes",
      discNumber: 1,
      position: 2,
      externalId: "1OQavCoScXzV0tdMlofwmK",
      externalLink: "https://open.spotify.com/track/1OQavCoScXzV0tdMlofwmK",
    },
  ],
} as const satisfies Track
