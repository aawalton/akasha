import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndJonasBlueRemixYesAndJonasBlueRemix = {
  id: "01a0a6c5-3586-7bf5-b0eb-7e2cfff1105f",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-jonas-blue-remix-yes-and-jonas-blue-remix",
  ownLength: 3.5483833333333332,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and-jonas-blue-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oVfohX6LdBkD568rzE8Y7",
      externalLink: "https://open.spotify.com/track/3oVfohX6LdBkD568rzE8Y7",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and? - Jonas Blue Remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "1HBjj22wzbscIZ9sEb5dyf", artistName: "Jonas Blue" },
  ],
  trackKey: "yesandjonasblueremix|1HBjj22wzbscIZ9sEb5dyf,66CXWjxzNUsdJxJ2JdwvnR|212903",
  song: "song/ariana-grande-yes-and",
} as const satisfies Track
