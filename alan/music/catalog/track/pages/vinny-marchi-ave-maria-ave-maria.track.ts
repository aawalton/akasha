import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiAveMariaAveMaria = {
  id: "01a0b112-9b3d-73f5-9a83-f1a958c98855",
  type: "page-type/track",
  slug: "vinny-marchi-ave-maria-ave-maria",
  ownLength: 3.9335,
  ownProgress: 3.9335,
  partOfCollections: ["release/vinny-marchi-ave-maria"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ave Maria",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Franz Schubert" }, { artist: "artist/vinny-marchi" }],
  trackKey: "avemaria|2p0UyoPfYfI76PCStuXfOP,5USAMqcbMAzF3HBmeD5pJF|236010",
  song: "song/vinny-marchi-ave-maria",
  carriedBy: [
    {
      release: "release/vinny-marchi-ave-maria",
      discNumber: 1,
      position: 1,
      externalId: "5TjhimqQne160MIG1iaCdv",
      externalLink: "https://open.spotify.com/track/5TjhimqQne160MIG1iaCdv",
    },
  ],
} as const satisfies Track
