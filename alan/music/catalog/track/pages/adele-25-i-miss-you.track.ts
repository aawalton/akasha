import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele25IMissYou = {
  id: "01a0d52b-c25a-7aad-87d6-f0ae8961bbfe",
  type: "page-type/track",
  slug: "adele-25-i-miss-you",
  ownLength: 5.810416666666667,
  ownProgress: 5.810416666666667,
  partOfCollections: ["release/adele-25"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Miss You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "imissyou|4dpARuHxo51G3z768sgnrY|348625",
  song: "song/adele-i-miss-you",
  carriedBy: [
    {
      release: "release/adele-25",
      discNumber: 1,
      position: 3,
      externalId: "6QSJvH2m7QLAiFIywwzCVi",
      externalLink: "https://open.spotify.com/track/6QSJvH2m7QLAiFIywwzCVi",
    },
  ],
} as const satisfies Track
