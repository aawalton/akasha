import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeTheEssence = {
  id: "01a0b637-ec22-74fd-b5cb-f144f28f1d90",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-the-essence",
  ownLength: 3.16,
  ownProgress: 3.16,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Essence",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "theessence|1WgXqy2Dd70QQOU7Ay074N|189600",
  song: "song/aurora-the-essence",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 6,
      externalId: "2Q48Cy1g2vgETUmkSsccPl",
      externalLink: "https://open.spotify.com/track/2Q48Cy1g2vgETUmkSsccPl",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 6,
      externalId: "1A6KGfxjQLl7JQfCk20y27",
      externalLink: "https://open.spotify.com/track/1A6KGfxjQLl7JQfCk20y27",
    },
  ],
} as const satisfies Track
