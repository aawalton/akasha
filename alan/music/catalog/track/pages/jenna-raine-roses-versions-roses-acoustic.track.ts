import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineRosesVersionsRosesAcoustic = {
  id: "01a0c621-1c99-719f-95ef-db39d44cf3dc",
  type: "page-type/track",
  slug: "jenna-raine-roses-versions-roses-acoustic",
  ownLength: 3.1782666666666666,
  ownProgress: 0,
  partOfCollections: ["release/jenna-raine-roses-versions"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Roses - Acoustic",
  trackType: "acoustic",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "rosesacoustic|3aHe9rMa5HFTjXHw8tEz0A|190696",
  song: "song/jenna-raine-roses",
  carriedBy: [
    {
      release: "release/jenna-raine-roses-versions",
      discNumber: 1,
      position: 1,
      externalId: "0AqzpgAdqnK7HmKOF128rY",
      externalLink: "https://open.spotify.com/track/0AqzpgAdqnK7HmKOF128rY",
    },
  ],
} as const satisfies Track
