import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGodPutASmileUponYourFaceMurder = {
  id: "01a0b9ef-00c3-7aef-8a61-17b452ca3ec4",
  type: "page-type/track",
  slug: "coldplay-god-put-a-smile-upon-your-face-murder",
  ownLength: 5.581316666666667,
  ownProgress: 5.581316666666667,
  partOfCollections: ["release/coldplay-god-put-a-smile-upon-your-face", "release/coldplay-murder"],
  status: "completed",
  unit: "unit/minutes",
  title: "Murder",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "murder|4gzpq5DPGxSnKTe4SA8HAU|334879",
  song: "song/coldplay-murder",
  carriedBy: [
    {
      release: "release/coldplay-god-put-a-smile-upon-your-face",
      discNumber: 1,
      position: 2,
      externalId: "6FNYoIM6xtaH1mBlLwDMvM",
      externalLink: "https://open.spotify.com/track/6FNYoIM6xtaH1mBlLwDMvM",
    },
    {
      release: "release/coldplay-murder",
      discNumber: 1,
      position: 1,
      externalId: "41qujRJ7RG759UklwNHStb",
      externalLink: "https://open.spotify.com/track/41qujRJ7RG759UklwNHStb",
    },
  ],
} as const satisfies Track
