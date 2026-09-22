import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2LiveFromTheFoxTheaterOdeToAButterflyLive = {
  id: "01a0caa8-ad70-7f39-99a7-3827cefe88a8",
  type: "page-type/track",
  slug: "nickel-creek-2-live-from-the-fox-theater-ode-to-a-butterfly-live",
  ownLength: 7.1278,
  ownProgress: 7.1278,
  partOfCollections: ["release/nickel-creek-2-live-from-the-fox-theater"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ode to a Butterfly - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "odetoabutterflylive|3bcLBxvaI7GsBzGp3WHnwQ|427668",
  song: "song/nickel-creek-ode-to-a-butterfly",
  carriedBy: [
    {
      release: "release/nickel-creek-2-live-from-the-fox-theater",
      discNumber: 1,
      position: 11,
      externalId: "11e1JMKftSVD5wbkkpVaWo",
      externalLink: "https://open.spotify.com/track/11e1JMKftSVD5wbkkpVaWo",
    },
  ],
} as const satisfies Track
