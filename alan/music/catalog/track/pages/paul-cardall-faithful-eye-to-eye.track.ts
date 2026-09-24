import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulEyeToEye = {
  id: "01a0b4c8-5a6f-7f2e-9637-655a94f744bd",
  type: "page-type/track",
  slug: "paul-cardall-faithful-eye-to-eye",
  ownLength: 4.4844333333333335,
  ownProgress: 4.4844333333333335,
  partOfCollections: ["release/paul-cardall-faithful", "release/paul-cardall-saving-tiny-hearts"],
  status: "completed",
  unit: "unit/minutes",
  title: "Eye To Eye",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "eyetoeye|7FQRbf8gbKw8KZQZAJWxH2|269066",
  song: "song/paul-cardall-eye-to-eye",
  carriedBy: [
    {
      release: "release/paul-cardall-faithful",
      discNumber: 1,
      position: 9,
      externalId: "0GsZ1mvBocuIAOBsvzPwlO",
      externalLink: "https://open.spotify.com/track/0GsZ1mvBocuIAOBsvzPwlO",
    },
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 11,
      externalId: "6RyZT7kfXy8ajOCpzjHVlt",
      externalLink: "https://open.spotify.com/track/6RyZT7kfXy8ajOCpzjHVlt",
    },
  ],
} as const satisfies Track
