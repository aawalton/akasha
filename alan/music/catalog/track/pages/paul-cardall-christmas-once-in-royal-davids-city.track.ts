import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasOnceInRoyalDavidsCity = {
  id: "01a0b4c8-34df-73eb-8871-76de066e1a4c",
  type: "page-type/track",
  slug: "paul-cardall-christmas-once-in-royal-davids-city",
  ownLength: 3.144616666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3s6CksBSoshnJ6lMhyq5At",
      externalLink: "https://open.spotify.com/track/3s6CksBSoshnJ6lMhyq5At",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Once in Royal David's City",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "onceinroyaldavidscity|7FQRbf8gbKw8KZQZAJWxH2|188677",
  song: "song/paul-cardall-once-in-royal-davids-city",
} as const satisfies Track
