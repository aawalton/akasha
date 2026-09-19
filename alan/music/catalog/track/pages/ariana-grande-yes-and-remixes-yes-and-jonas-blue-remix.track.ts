import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndRemixesYesAndJonasBlueRemix = {
  id: "01a0a6c5-35ef-74cd-83f2-999310b5e41c",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-remixes-yes-and-jonas-blue-remix",
  ownLength: 3.5483833333333332,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and-remixes"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "62iX6bbxe9T81LrNwqre3p",
      externalLink: "https://open.spotify.com/track/62iX6bbxe9T81LrNwqre3p",
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
  song: "song/ariana-grande-yes-and-2",
} as const satisfies Track
