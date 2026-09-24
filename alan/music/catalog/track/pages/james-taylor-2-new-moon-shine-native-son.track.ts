import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineNativeSon = {
  id: "01a0abeb-403d-78c2-a575-7d5469abfdde",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-native-son",
  ownLength: 3.8011,
  ownProgress: 3.8011,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  status: "completed",
  unit: "unit/minutes",
  title: "Native Son",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "nativeson|0vn7UBvSQECKJm2817Yf1P|228066",
  song: "song/james-taylor-native-son",
  carriedBy: [
    {
      release: "release/james-taylor-2-new-moon-shine",
      discNumber: 1,
      position: 10,
      externalId: "0mRhgBuZU3jjSMRlIIyV6W",
      externalLink: "https://open.spotify.com/track/0mRhgBuZU3jjSMRlIIyV6W",
    },
  ],
} as const satisfies Track
