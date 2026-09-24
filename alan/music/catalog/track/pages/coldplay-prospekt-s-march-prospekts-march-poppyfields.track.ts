import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayProspektSMarchProspektsMarchPoppyfields = {
  id: "01a0b9ee-fc85-7881-9fb9-e46a2856fd55",
  type: "page-type/track",
  slug: "coldplay-prospekt-s-march-prospekts-march-poppyfields",
  ownLength: 3.65385,
  ownProgress: 3.65385,
  partOfCollections: [
    "release/coldplay-prospekt-s-march",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Prospekt's March / Poppyfields",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "prospektsmarchpoppyfields|4gzpq5DPGxSnKTe4SA8HAU|219231",
  song: "song/coldplay-prospekts-march-poppyfields",
  carriedBy: [
    {
      release: "release/coldplay-prospekt-s-march",
      discNumber: 1,
      position: 5,
      externalId: "6KgFgKiVLWk75G86H5bcea",
      externalLink: "https://open.spotify.com/track/6KgFgKiVLWk75G86H5bcea",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 2,
      position: 5,
      externalId: "4yr1059N96a8msTHVftmFN",
      externalLink: "https://open.spotify.com/track/4yr1059N96a8msTHVftmFN",
    },
  ],
} as const satisfies Track
