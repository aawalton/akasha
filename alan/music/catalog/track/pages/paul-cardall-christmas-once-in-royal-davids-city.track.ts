import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasOnceInRoyalDavidsCity = {
  id: "01a0b4c8-34df-73eb-8871-76de066e1a4c",
  type: "page-type/track",
  slug: "paul-cardall-christmas-once-in-royal-davids-city",
  ownLength: 3.144616666666667,
  ownProgress: 3.144616666666667,
  partOfCollections: ["release/paul-cardall-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Once in Royal David's City",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "onceinroyaldavidscity|7FQRbf8gbKw8KZQZAJWxH2|188677",
  song: "song/celtic-woman-once-in-royal-davids-city",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas",
      discNumber: 1,
      position: 10,
      externalId: "3s6CksBSoshnJ6lMhyq5At",
      externalLink: "https://open.spotify.com/track/3s6CksBSoshnJ6lMhyq5At",
    },
  ],
} as const satisfies Track
