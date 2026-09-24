import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooAmortageTears = {
  id: "01a0afa2-7352-7059-9046-7acbd9be28a1",
  type: "page-type/track",
  slug: "jisoo-amortage-tears",
  ownLength: 3.0370166666666667,
  ownProgress: 3.0370166666666667,
  partOfCollections: ["release/jisoo-amortage"],
  status: "completed",
  unit: "unit/minutes",
  title: "TEARS",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jisoo" }],
  trackKey: "tears|6UZ0ba50XreR4TM8u322gs|182221",
  song: "song/jisoo-tears",
  carriedBy: [
    {
      release: "release/jisoo-amortage",
      discNumber: 1,
      position: 3,
      externalId: "08fvSPSKjoF4vmoEtcGain",
      externalLink: "https://open.spotify.com/track/08fvSPSKjoF4vmoEtcGain",
    },
  ],
} as const satisfies Track
