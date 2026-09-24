import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30CryYourHeartOut = {
  id: "01a0d52b-c25a-7794-835a-22a49a1f6062",
  type: "page-type/track",
  slug: "adele-30-cry-your-heart-out",
  ownLength: 4.2546333333333335,
  ownProgress: 4.2546333333333335,
  partOfCollections: ["release/adele-30"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cry Your Heart Out",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "cryyourheartout|4dpARuHxo51G3z768sgnrY|255278",
  song: "song/adele-cry-your-heart-out",
  carriedBy: [
    {
      release: "release/adele-30",
      discNumber: 1,
      position: 4,
      externalId: "09u787BYeYIGd2mFIJ505t",
      externalLink: "https://open.spotify.com/track/09u787BYeYIGd2mFIJ505t",
    },
  ],
} as const satisfies Track
