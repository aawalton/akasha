import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ThisSideHangingByAThread = {
  id: "01a0caa8-b85c-7279-ad3b-276847b1ee6e",
  type: "page-type/track",
  slug: "nickel-creek-2-this-side-hanging-by-a-thread",
  ownLength: 4.1146666666666665,
  ownProgress: 4.1146666666666665,
  partOfCollections: ["release/nickel-creek-2-this-side"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hanging By A Thread",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "hangingbyathread|3bcLBxvaI7GsBzGp3WHnwQ|246880",
  song: "song/nickel-creek-hanging-by-a-thread",
  carriedBy: [
    {
      release: "release/nickel-creek-2-this-side",
      discNumber: 1,
      position: 4,
      externalId: "4VQAuV4Sj6JGwdvpiRKeqg",
      externalLink: "https://open.spotify.com/track/4VQAuV4Sj6JGwdvpiRKeqg",
    },
  ],
} as const satisfies Track
