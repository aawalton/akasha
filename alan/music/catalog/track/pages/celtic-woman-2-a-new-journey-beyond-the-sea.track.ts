import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyBeyondTheSea = {
  id: "01a0abea-750a-7232-b9c6-b8174acb0038",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-beyond-the-sea",
  ownLength: 3.328883333333333,
  ownProgress: 3.328883333333333,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  status: "completed",
  unit: "unit/minutes",
  title: "Beyond The Sea",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "beyondthesea|6NWtt9pNOL2Gx7kBykdE5x|199733",
  song: "song/celtic-woman-beyond-the-sea",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-new-journey",
      discNumber: 1,
      position: 8,
      externalId: "7mjpTAOF23vrpTU5B1pqsT",
      externalLink: "https://open.spotify.com/track/7mjpTAOF23vrpTU5B1pqsT",
    },
  ],
} as const satisfies Track
