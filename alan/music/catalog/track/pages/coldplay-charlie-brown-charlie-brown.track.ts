import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayCharlieBrownCharlieBrown = {
  id: "01a0b9ee-f8f7-7554-8b57-a9932e44bf78",
  type: "page-type/track",
  slug: "coldplay-charlie-brown-charlie-brown",
  ownLength: 4.75265,
  ownProgress: 4.75265,
  partOfCollections: ["release/coldplay-charlie-brown", "release/coldplay-mylo-xyloto"],
  status: "completed",
  unit: "unit/minutes",
  title: "Charlie Brown",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "charliebrown|4gzpq5DPGxSnKTe4SA8HAU|285159",
  song: "song/coldplay-charlie-brown",
  carriedBy: [
    {
      release: "release/coldplay-charlie-brown",
      discNumber: 1,
      position: 1,
      externalId: "2xmG19ADoSwiEkBOJZ6poQ",
      externalLink: "https://open.spotify.com/track/2xmG19ADoSwiEkBOJZ6poQ",
    },
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 4,
      externalId: "1yqMgZNrevsWMLWfO2PRp5",
      externalLink: "https://open.spotify.com/track/1yqMgZNrevsWMLWfO2PRp5",
    },
  ],
} as const satisfies Track
