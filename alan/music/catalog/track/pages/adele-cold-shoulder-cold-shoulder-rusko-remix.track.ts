import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adeleColdShoulderColdShoulderRuskoRemix = {
  id: "01a0d52b-c25a-747b-90aa-9b653fcd65b2",
  type: "page-type/track",
  slug: "adele-cold-shoulder-cold-shoulder-rusko-remix",
  ownLength: 4.118216666666667,
  ownProgress: 0,
  partOfCollections: ["release/adele-cold-shoulder"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Cold Shoulder - Rusko Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }, { artistName: "Rusko" }],
  trackKey: "coldshoulderruskoremix|4BTcOR2hEQZQQL5AMo5u10,4dpARuHxo51G3z768sgnrY|247093",
  song: "song/adele-cold-shoulder",
  carriedBy: [
    {
      release: "release/adele-cold-shoulder",
      discNumber: 1,
      position: 4,
      externalId: "7kamdS7QerS3V1MlkVybhk",
      externalLink: "https://open.spotify.com/track/7kamdS7QerS3V1MlkVybhk",
    },
  ],
} as const satisfies Track
