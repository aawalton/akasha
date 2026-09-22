import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxStorybookChampagneCigarettes = {
  id: "01a0c95e-014b-7fce-9088-b1f324456e63",
  type: "page-type/track",
  slug: "lilith-max-storybook-champagne-cigarettes",
  ownLength: 2.4631833333333333,
  ownProgress: 0,
  partOfCollections: ["release/lilith-max-storybook"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Champagne & Cigarettes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "champagnecigarettes|797SPxZf82IYq3XCM8c9AM|147791",
  song: "song/lilith-max-champagne-cigarettes",
  carriedBy: [
    {
      release: "release/lilith-max-storybook",
      discNumber: 1,
      position: 4,
      externalId: "4H1txROO89cfuEUkkGCXHr",
      externalLink: "https://open.spotify.com/track/4H1txROO89cfuEUkkGCXHr",
    },
  ],
} as const satisfies Track
