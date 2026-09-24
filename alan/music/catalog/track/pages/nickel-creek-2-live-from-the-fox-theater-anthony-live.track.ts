import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2LiveFromTheFoxTheaterAnthonyLive = {
  id: "01a0caa8-ae99-731a-9707-a24dd78b2952",
  type: "page-type/track",
  slug: "nickel-creek-2-live-from-the-fox-theater-anthony-live",
  ownLength: 9.188983333333333,
  ownProgress: 9.188983333333333,
  partOfCollections: ["release/nickel-creek-2-live-from-the-fox-theater"],
  status: "completed",
  unit: "unit/minutes",
  title: "Anthony - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "anthonylive|3bcLBxvaI7GsBzGp3WHnwQ|551339",
  song: "song/nickel-creek-anthony",
  carriedBy: [
    {
      release: "release/nickel-creek-2-live-from-the-fox-theater",
      discNumber: 1,
      position: 15,
      externalId: "5kz8ExVzkqAN9kEfFZaa0F",
      externalLink: "https://open.spotify.com/track/5kz8ExVzkqAN9kEfFZaa0F",
    },
  ],
} as const satisfies Track
