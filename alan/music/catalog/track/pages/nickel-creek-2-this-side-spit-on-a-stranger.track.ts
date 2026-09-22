import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ThisSideSpitOnAStranger = {
  id: "01a0caa8-b7cd-7732-9606-60543a3c61a5",
  type: "page-type/track",
  slug: "nickel-creek-2-this-side-spit-on-a-stranger",
  ownLength: 2.5797666666666665,
  ownProgress: 2.5797666666666665,
  partOfCollections: ["release/nickel-creek-2-this-side"],
  status: "completed",
  unit: "unit/minutes",
  title: "Spit On A Stranger",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "spitonastranger|3bcLBxvaI7GsBzGp3WHnwQ|154786",
  song: "song/nickel-creek-spit-on-a-stranger",
  carriedBy: [
    {
      release: "release/nickel-creek-2-this-side",
      discNumber: 1,
      position: 2,
      externalId: "6CnuCYYgFs8ejnSf9GxEbY",
      externalLink: "https://open.spotify.com/track/6CnuCYYgFs8ejnSf9GxEbY",
    },
  ],
} as const satisfies Track
