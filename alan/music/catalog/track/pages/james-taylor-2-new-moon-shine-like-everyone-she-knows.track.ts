import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineLikeEveryoneSheKnows = {
  id: "01a0abeb-3fe8-7b32-b103-ac216d556106",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-like-everyone-she-knows",
  ownLength: 4.932883333333334,
  ownProgress: 4.932883333333334,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  status: "completed",
  unit: "unit/minutes",
  title: "Like Everyone She Knows",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "likeeveryonesheknows|0vn7UBvSQECKJm2817Yf1P|295973",
  song: "song/james-taylor-like-everyone-she-knows",
  carriedBy: [
    {
      release: "release/james-taylor-2-new-moon-shine",
      discNumber: 1,
      position: 7,
      externalId: "7nomKdjCucPNhBx3RbCim0",
      externalLink: "https://open.spotify.com/track/7nomKdjCucPNhBx3RbCim0",
    },
  ],
} as const satisfies Track
