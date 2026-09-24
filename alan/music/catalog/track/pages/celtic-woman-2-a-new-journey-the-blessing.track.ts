import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyTheBlessing = {
  id: "01a0abea-74d0-75a4-81f3-cb77e82e6cfd",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-the-blessing",
  ownLength: 3.824,
  ownProgress: 3.824,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Blessing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "theblessing|6NWtt9pNOL2Gx7kBykdE5x|229440",
  song: "song/celtic-woman-the-blessing",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-new-journey",
      discNumber: 1,
      position: 6,
      externalId: "6LeAedD4ZcwueB0WizpJh8",
      externalLink: "https://open.spotify.com/track/6LeAedD4ZcwueB0WizpJh8",
    },
  ],
} as const satisfies Track
