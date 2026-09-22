import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2ThisSideThisSide = {
  id: "01a0caa8-b8ab-796d-b6b8-02cf275e52c5",
  type: "page-type/track",
  slug: "nickel-creek-2-this-side-this-side",
  ownLength: 3.5566666666666666,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-this-side"],
  status: "not-started",
  unit: "unit/minutes",
  title: "This Side",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "thisside|3bcLBxvaI7GsBzGp3WHnwQ|213400",
  song: "song/nickel-creek-this-side",
  carriedBy: [
    {
      release: "release/nickel-creek-2-this-side",
      discNumber: 1,
      position: 6,
      externalId: "4OBLmckjKIhBFHVIsvZDtw",
      externalLink: "https://open.spotify.com/track/4OBLmckjKIhBFHVIsvZDtw",
    },
  ],
} as const satisfies Track
