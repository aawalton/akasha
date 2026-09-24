import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyTheVoice = {
  id: "01a0abea-75d9-70f2-96c6-ecc47bb8aeb1",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-the-voice",
  ownLength: 3.08955,
  ownProgress: 3.08955,
  partOfCollections: [
    "release/celtic-woman-2-a-new-journey",
    "release/celtic-woman-2-the-greatest-journey-essential-collection",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Voice",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "thevoice|6NWtt9pNOL2Gx7kBykdE5x|185373",
  song: "song/celtic-woman-the-voice",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-new-journey",
      discNumber: 1,
      position: 14,
      externalId: "2E3y6X63fbZCYJGELwRAWQ",
      externalLink: "https://open.spotify.com/track/2E3y6X63fbZCYJGELwRAWQ",
    },
    {
      release: "release/celtic-woman-2-the-greatest-journey-essential-collection",
      discNumber: 1,
      position: 6,
      externalId: "7h6Ecll0SxsNZgojrhCP2D",
      externalLink: "https://open.spotify.com/track/7h6Ecll0SxsNZgojrhCP2D",
    },
  ],
} as const satisfies Track
