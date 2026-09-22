import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const nickelCreek2WhyShouldTheFireDieHelena = {
  id: "01a0caa8-b720-74ad-99e2-402b5491ef7e",
  type: "page-type/track",
  slug: "nickel-creek-2-why-should-the-fire-die-helena",
  ownLength: 4.764883333333334,
  ownProgress: 0,
  partOfCollections: ["release/nickel-creek-2-why-should-the-fire-die"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Helena",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3bcLBxvaI7GsBzGp3WHnwQ", artistName: "Nickel Creek" }],
  trackKey: "helena|3bcLBxvaI7GsBzGp3WHnwQ|285893",
  song: "song/nickel-creek-helena",
  carriedBy: [
    {
      release: "release/nickel-creek-2-why-should-the-fire-die",
      discNumber: 1,
      position: 13,
      externalId: "3bVEoQJkzgbEKPWjEmFsjd",
      externalLink: "https://open.spotify.com/track/3bVEoQJkzgbEKPWjEmFsjd",
    },
  ],
} as const satisfies Track
