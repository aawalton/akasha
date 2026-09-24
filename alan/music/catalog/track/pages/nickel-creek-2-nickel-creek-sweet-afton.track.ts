import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2NickelCreekSweetAfton = {
  id: "01a0caa8-bbd9-7343-b770-f0775753ce1f",
  type: "page-type/track",
  slug: "nickel-creek-2-nickel-creek-sweet-afton",
  ownLength: 5.631766666666667,
  ownProgress: 5.631766666666667,
  partOfCollections: ["release/nickel-creek-2-nickel-creek"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet Afton",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "sweetafton|3bcLBxvaI7GsBzGp3WHnwQ|337906",
  song: "song/nickel-creek-sweet-afton",
  carriedBy: [
    {
      release: "release/nickel-creek-2-nickel-creek",
      discNumber: 1,
      position: 7,
      externalId: "5Nu7mcExOo7QRbsnBEvLvQ",
      externalLink: "https://open.spotify.com/track/5Nu7mcExOo7QRbsnBEvLvQ",
    },
  ],
} as const satisfies Track
