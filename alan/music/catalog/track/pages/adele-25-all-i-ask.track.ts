import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele25AllIAsk = {
  id: "01a0d52b-c25a-78ba-9c00-0479016687db",
  type: "page-type/track",
  slug: "adele-25-all-i-ask",
  ownLength: 4.53,
  ownProgress: 4.53,
  partOfCollections: ["release/adele-25"],
  status: "completed",
  unit: "unit/minutes",
  title: "All I Ask",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "alliask|4dpARuHxo51G3z768sgnrY|271800",
  song: "song/adele-all-i-ask",
  carriedBy: [
    {
      release: "release/adele-25",
      discNumber: 1,
      position: 10,
      externalId: "05TOt5Vz4StdjMpEdFPlvB",
      externalLink: "https://open.spotify.com/track/05TOt5Vz4StdjMpEdFPlvB",
    },
  ],
} as const satisfies Track
