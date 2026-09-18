import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraStoriesADifferentKindOfHuman = {
  id: "01a0b638-0831-7142-8b93-7d3fe3746006",
  type: "page-type/track",
  slug: "aurora-stories-a-different-kind-of-human",
  ownLength: 4.018416666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-stories"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4GKYK3jkenBTQqbKi1GtkP",
      externalLink: "https://open.spotify.com/track/4GKYK3jkenBTQqbKi1GtkP",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A Different Kind Of Human",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "adifferentkindofhuman|1WgXqy2Dd70QQOU7Ay074N|241105",
} as const satisfies Track
