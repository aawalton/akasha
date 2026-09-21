import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineLovesickLovesick = {
  id: "01a0c621-1e0f-7871-858a-41a3d7fde5e6",
  type: "page-type/track",
  slug: "jenna-raine-lovesick-lovesick",
  ownLength: 2.529333333333333,
  ownProgress: 0,
  partOfCollections: ["release/jenna-raine-lovesick"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Lovesick",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "lovesick|3aHe9rMa5HFTjXHw8tEz0A|151760",
  song: "song/jenna-raine-lovesick",
  carriedBy: [
    {
      release: "release/jenna-raine-lovesick",
      discNumber: 1,
      position: 1,
      externalId: "3Fug6rfarsHtM6Ws9ofzaD",
      externalLink: "https://open.spotify.com/track/3Fug6rfarsHtM6Ws9ofzaD",
    },
  ],
} as const satisfies Track
