import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiADifferentKindOfHuman = {
  id: "01a0b637-f9a9-7b8d-b6c0-0bba98194e93",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-a-different-kind-of-human",
  ownLength: 4.018416666666667,
  ownProgress: 4.018416666666667,
  partOfCollections: ["release/aurora-a-different-kind-of-human-step-ii", "release/aurora-stories"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Different Kind Of Human",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "adifferentkindofhuman|1WgXqy2Dd70QQOU7Ay074N|241105",
  song: "song/aurora-a-different-kind-of-human",
  carriedBy: [
    {
      release: "release/aurora-a-different-kind-of-human-step-ii",
      discNumber: 1,
      position: 8,
      externalId: "3xCYl9Ix2ZUa7rH7nbUOTS",
      externalLink: "https://open.spotify.com/track/3xCYl9Ix2ZUa7rH7nbUOTS",
    },
    {
      release: "release/aurora-stories",
      discNumber: 1,
      position: 6,
      externalId: "4GKYK3jkenBTQqbKi1GtkP",
      externalLink: "https://open.spotify.com/track/4GKYK3jkenBTQqbKi1GtkP",
    },
  ],
} as const satisfies Track
