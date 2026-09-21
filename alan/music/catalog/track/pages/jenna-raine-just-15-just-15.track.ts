import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineJust15Just15 = {
  id: "01a0c621-194b-720f-8768-f3a6a99f85c8",
  type: "page-type/track",
  slug: "jenna-raine-just-15-just-15",
  ownLength: 3.52805,
  ownProgress: 3.52805,
  partOfCollections: ["release/jenna-raine-just-15"],
  status: "completed",
  unit: "unit/minutes",
  title: "Just 15",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "just15|3aHe9rMa5HFTjXHw8tEz0A|211683",
  song: "song/jenna-raine-just-15",
  carriedBy: [
    {
      release: "release/jenna-raine-just-15",
      discNumber: 1,
      position: 1,
      externalId: "0noBpncaaAp2DM6hy01VLg",
      externalLink: "https://open.spotify.com/track/0noBpncaaAp2DM6hy01VLg",
    },
  ],
} as const satisfies Track
