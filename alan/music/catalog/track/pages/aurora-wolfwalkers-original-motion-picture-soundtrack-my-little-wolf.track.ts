import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWolfwalkersOriginalMotionPictureSoundtrackMyLittleWolf = {
  id: "01a0b637-f7dc-7df9-9e39-08283e324aed",
  type: "page-type/track",
  slug: "aurora-wolfwalkers-original-motion-picture-soundtrack-my-little-wolf",
  ownLength: 2.36355,
  ownProgress: 2.36355,
  partOfCollections: ["release/aurora-wolfwalkers-original-motion-picture-soundtrack"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Little Wolf",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Bruno Coulais" }],
  trackKey: "mylittlewolf|5kjb55jtwPnbYXXDvP4x7R|141813",
  song: "song/aurora-my-little-wolf",
  carriedBy: [
    {
      release: "release/aurora-wolfwalkers-original-motion-picture-soundtrack",
      discNumber: 1,
      position: 12,
      externalId: "5tLgsIdVy6xWDRkdKKTTQu",
      externalLink: "https://open.spotify.com/track/5tLgsIdVy6xWDRkdKKTTQu",
    },
  ],
} as const satisfies Track
