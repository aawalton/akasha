import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanYouRaiseMeUp = {
  id: "01a0abea-7a15-764e-b1b5-0561955eb444",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-you-raise-me-up",
  ownLength: 4.518883333333333,
  ownProgress: 4.518883333333333,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Raise Me Up",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "youraisemeup|6NWtt9pNOL2Gx7kBykdE5x|271133",
  song: "song/celtic-woman-you-raise-me-up",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 16,
      externalId: "03wrmep5c3Dr9JlOXPvFUX",
      externalLink: "https://open.spotify.com/track/03wrmep5c3Dr9JlOXPvFUX",
    },
  ],
} as const satisfies Track
