import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGraceInGriefMourningLight = {
  id: "01a0b4c8-25ca-7826-aa3e-f3343321ea3b",
  type: "page-type/track",
  slug: "paul-cardall-grace-in-grief-mourning-light",
  ownLength: 3.85,
  ownProgress: 3.85,
  partOfCollections: ["release/paul-cardall-grace-in-grief", "release/paul-cardall-mourning-light"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mourning Light",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "mourninglight|7FQRbf8gbKw8KZQZAJWxH2|231000",
  song: "song/paul-cardall-mourning-light",
  carriedBy: [
    {
      release: "release/paul-cardall-grace-in-grief",
      discNumber: 1,
      position: 6,
      externalId: "072NDoeUR97KLlyuMY0z0S",
      externalLink: "https://open.spotify.com/track/072NDoeUR97KLlyuMY0z0S",
    },
    {
      release: "release/paul-cardall-mourning-light",
      discNumber: 1,
      position: 1,
      externalId: "1gCWCSVLsvJAK79Srw7FX7",
      externalLink: "https://open.spotify.com/track/1gCWCSVLsvJAK79Srw7FX7",
    },
  ],
} as const satisfies Track
