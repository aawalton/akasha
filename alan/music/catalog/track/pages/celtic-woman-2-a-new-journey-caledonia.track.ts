import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyCaledonia = {
  id: "01a0abea-7550-76d9-9057-7aea1df351c7",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-caledonia",
  ownLength: 4.990433333333334,
  ownProgress: 4.990433333333334,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  status: "completed",
  unit: "unit/minutes",
  title: "Caledonia",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "caledonia|6NWtt9pNOL2Gx7kBykdE5x|299426",
  song: "song/celtic-woman-caledonia",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-new-journey",
      discNumber: 1,
      position: 10,
      externalId: "4arr5VKJbKO8PO5OY27NrM",
      externalLink: "https://open.spotify.com/track/4arr5VKJbKO8PO5OY27NrM",
    },
  ],
} as const satisfies Track
