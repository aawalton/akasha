import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineOnlyStartedGrowingGoodGrief = {
  id: "01a0c621-1bbd-7b0e-9d8c-6614e631d55f",
  type: "page-type/track",
  slug: "jenna-raine-only-started-growing-good-grief",
  ownLength: 2.6771,
  ownProgress: 2.6771,
  partOfCollections: ["release/jenna-raine-only-started-growing", "release/jenna-raine-good-grief"],
  status: "completed",
  unit: "unit/minutes",
  title: "Good Grief",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "goodgrief|3aHe9rMa5HFTjXHw8tEz0A|160626",
  song: "song/jenna-raine-good-grief",
  carriedBy: [
    {
      release: "release/jenna-raine-good-grief",
      discNumber: 1,
      position: 1,
      externalId: "7GCA73c9Qb7qce3mm18DcL",
      externalLink: "https://open.spotify.com/track/7GCA73c9Qb7qce3mm18DcL",
    },
    {
      release: "release/jenna-raine-only-started-growing",
      discNumber: 1,
      position: 2,
      externalId: "7pTDuP5CyQ5ENyYR1kxlNA",
      externalLink: "https://open.spotify.com/track/7pTDuP5CyQ5ENyYR1kxlNA",
    },
  ],
} as const satisfies Track
