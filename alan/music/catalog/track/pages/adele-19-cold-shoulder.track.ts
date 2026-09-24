import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19ColdShoulder = {
  id: "01a0d52b-c259-7989-8de8-2fab8f0ef3e0",
  type: "page-type/track",
  slug: "adele-19-cold-shoulder",
  ownLength: 3.197766666666667,
  ownProgress: 0,
  partOfCollections: ["release/adele-19", "release/adele-cold-shoulder"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Cold Shoulder",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "coldshoulder|4dpARuHxo51G3z768sgnrY|191866",
  song: "song/adele-cold-shoulder",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 4,
      externalId: "7qxPZTCgQaAe76yhl06vik",
      externalLink: "https://open.spotify.com/track/7qxPZTCgQaAe76yhl06vik",
    },
    {
      release: "release/adele-cold-shoulder",
      discNumber: 1,
      position: 1,
      externalId: "4EBRcXw782MB7GGJKoKTW5",
      externalLink: "https://open.spotify.com/track/4EBRcXw782MB7GGJKoKTW5",
    },
  ],
} as const satisfies Track
