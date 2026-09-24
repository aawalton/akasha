import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoWhenSheSmiles = {
  id: "01a0b4c8-3381-77e1-b8d6-14f2d483bed0",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-when-she-smiles",
  ownLength: 4.0271,
  ownProgress: 4.0271,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "When She Smiles",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "whenshesmiles|7FQRbf8gbKw8KZQZAJWxH2|241626",
  song: "song/paul-cardall-when-she-smiles",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 18,
      externalId: "4m81aURCinsOqQ7ggkp43g",
      externalLink: "https://open.spotify.com/track/4m81aURCinsOqQ7ggkp43g",
    },
  ],
} as const satisfies Track
