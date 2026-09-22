import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2NickelCreekCuckoosNest = {
  id: "01a0caa8-bc05-7039-84d1-d41015263c52",
  type: "page-type/track",
  slug: "nickel-creek-2-nickel-creek-cuckoos-nest",
  ownLength: 2.3274,
  ownProgress: 2.3274,
  partOfCollections: ["release/nickel-creek-2-nickel-creek"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cuckoo's Nest",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "cuckoosnest|3bcLBxvaI7GsBzGp3WHnwQ|139644",
  song: "song/nickel-creek-cuckoos-nest",
  carriedBy: [
    {
      release: "release/nickel-creek-2-nickel-creek",
      discNumber: 1,
      position: 8,
      externalId: "79QOptRQIPEAUynI4LeeHR",
      externalLink: "https://open.spotify.com/track/79QOptRQIPEAUynI4LeeHR",
    },
  ],
} as const satisfies Track
