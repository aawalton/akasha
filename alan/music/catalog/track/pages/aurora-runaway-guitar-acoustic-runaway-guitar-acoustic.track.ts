import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunawayGuitarAcousticRunawayGuitarAcoustic = {
  id: "01a0b638-0612-758d-99ee-d3972a00daee",
  type: "page-type/track",
  slug: "aurora-runaway-guitar-acoustic-runaway-guitar-acoustic",
  ownLength: 4.329983333333334,
  ownProgress: 4.329983333333334,
  partOfCollections: [
    "release/aurora-runaway-guitar-acoustic",
    "release/aurora-runaway-piano-acoustic",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Runaway - Guitar Acoustic",
  trackType: "acoustic",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "runawayguitaracoustic|1WgXqy2Dd70QQOU7Ay074N|259799",
  song: "song/aurora-runaway",
  carriedBy: [
    {
      release: "release/aurora-runaway-guitar-acoustic",
      discNumber: 1,
      position: 1,
      externalId: "7zfV4jqXVfM7vzd0uojGZN",
      externalLink: "https://open.spotify.com/track/7zfV4jqXVfM7vzd0uojGZN",
    },
    {
      release: "release/aurora-runaway-piano-acoustic",
      discNumber: 1,
      position: 2,
      externalId: "2VkSgNcU9IH45EY3O7Z0lj",
      externalLink: "https://open.spotify.com/track/2VkSgNcU9IH45EY3O7Z0lj",
    },
  ],
} as const satisfies Track
