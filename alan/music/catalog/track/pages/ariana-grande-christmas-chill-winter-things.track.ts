import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillWinterThings = {
  id: "01a0a6c5-3a8b-7c03-9b2f-466a5ef27021",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-winter-things",
  ownLength: 2.6443666666666665,
  ownProgress: 2.6443666666666665,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "Winter Things",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "winterthings|66CXWjxzNUsdJxJ2JdwvnR|158662",
  song: "song/ariana-grande-winter-things",
  carriedBy: [
    {
      release: "release/ariana-grande-christmas-chill",
      discNumber: 1,
      position: 6,
      externalId: "2LdWTutlhGH6Zqpp7IAiZc",
      externalLink: "https://open.spotify.com/track/2LdWTutlhGH6Zqpp7IAiZc",
    },
  ],
} as const satisfies Track
