import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreHayfieldsNeathTheGroveIsAHeart = {
  id: "01a0ce87-16a1-7f52-97e4-9c08271b6a5a",
  type: "page-type/track",
  slug: "yaelokre-hayfields-neath-the-grove-is-a-heart",
  ownLength: 5.5033,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-hayfields", "release/yaelokre-neath-the-grove-is-a-heart"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Neath the grove is a heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3rRyfgGByetsaaujkjQ7rY", artistName: "Yaelokre" }],
  trackKey: "neaththegroveisaheart|3rRyfgGByetsaaujkjQ7rY|330198",
  song: "song/yaelokre-neath-the-grove-is-a-heart",
  carriedBy: [
    {
      release: "release/yaelokre-hayfields",
      discNumber: 1,
      position: 4,
      externalId: "4N9J9uEwUX0FPMGxhPRihQ",
      externalLink: "https://open.spotify.com/track/4N9J9uEwUX0FPMGxhPRihQ",
    },
    {
      release: "release/yaelokre-neath-the-grove-is-a-heart",
      discNumber: 1,
      position: 1,
      externalId: "3eeM8nJ8kaxDzIEqhRFqu4",
      externalLink: "https://open.spotify.com/track/3eeM8nJ8kaxDzIEqhRFqu4",
    },
  ],
} as const satisfies Track
