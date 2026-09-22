import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2CelebrantsGoingOut = {
  id: "01a0caa8-a764-7000-90d6-7398b7603434",
  type: "page-type/track",
  slug: "nickel-creek-2-celebrants-going-out",
  ownLength: 3.074883333333333,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-celebrants"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Going Out…",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "goingout|3bcLBxvaI7GsBzGp3WHnwQ|184493",
  song: "song/nickel-creek-going-out",
  carriedBy: [
    {
      release: "release/nickel-creek-2-celebrants",
      discNumber: 1,
      position: 6,
      externalId: "0Ak9D9HV7XLSrljdrOPtUj",
      externalLink: "https://open.spotify.com/track/0Ak9D9HV7XLSrljdrOPtUj",
    },
  ],
} as const satisfies Track
