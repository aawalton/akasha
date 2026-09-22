import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2LiveFromTheFoxTheaterDestinationLive = {
  id: "01a0caa8-bd36-7fae-873a-759f2fd78251",
  type: "page-type/track",
  slug: "nickel-creek-2-live-from-the-fox-theater-destination-live",
  ownLength: 4.2858833333333335,
  ownProgress: 0,
  partOfCollections: [
    "release/nickel-creek-2-live-from-the-fox-theater",
    "release/nickel-creek-2-destination-live",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Destination - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "destinationlive|3bcLBxvaI7GsBzGp3WHnwQ|257153",
  song: "song/nickel-creek-destination",
  carriedBy: [
    {
      release: "release/nickel-creek-2-destination-live",
      discNumber: 1,
      position: 1,
      externalId: "09afufgADP0SpzZUsXEaeN",
      externalLink: "https://open.spotify.com/track/09afufgADP0SpzZUsXEaeN",
    },
    {
      release: "release/nickel-creek-2-live-from-the-fox-theater",
      discNumber: 1,
      position: 4,
      externalId: "7xFFltSRdqIvYLMlUt3pne",
      externalLink: "https://open.spotify.com/track/7xFFltSRdqIvYLMlUt3pne",
    },
  ],
} as const satisfies Track
