import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ThisSideSabraGirl = {
  id: "01a0caa8-ba05-7501-9e44-0fb7cbcfa415",
  type: "page-type/track",
  slug: "nickel-creek-2-this-side-sabra-girl",
  ownLength: 4.07045,
  ownProgress: 4.07045,
  partOfCollections: ["release/nickel-creek-2-this-side"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sabra Girl",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/nickel-creek" }],
  trackKey: "sabragirl|3bcLBxvaI7GsBzGp3WHnwQ|244227",
  song: "song/nickel-creek-sabra-girl",
  carriedBy: [
    {
      release: "release/nickel-creek-2-this-side",
      discNumber: 1,
      position: 11,
      externalId: "4V3TVHe0Wx44x0aDj1e9k7",
      externalLink: "https://open.spotify.com/track/4V3TVHe0Wx44x0aDj1e9k7",
    },
  ],
} as const satisfies Track
