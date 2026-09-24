import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2NickelCreekTheLighthousesTale = {
  id: "01a0caa8-badc-76e4-875d-6395e882bd4f",
  type: "page-type/track",
  slug: "nickel-creek-2-nickel-creek-the-lighthouses-tale",
  ownLength: 5.0277666666666665,
  ownProgress: 5.0277666666666665,
  partOfCollections: ["release/nickel-creek-2-nickel-creek"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Lighthouse's Tale",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "thelighthousestale|3bcLBxvaI7GsBzGp3WHnwQ|301666",
  song: "song/nickel-creek-the-lighthouses-tale",
  carriedBy: [
    {
      release: "release/nickel-creek-2-nickel-creek",
      discNumber: 1,
      position: 2,
      externalId: "05HjafWVI238CLw5RDNkas",
      externalLink: "https://open.spotify.com/track/05HjafWVI238CLw5RDNkas",
    },
  ],
} as const satisfies Track
