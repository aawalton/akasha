import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulEyeToEye = {
  id: "01a0b4c8-5a6f-7f2e-9637-655a94f744bd",
  type: "page-type/track",
  slug: "paul-cardall-faithful-eye-to-eye",
  ownLength: 4.4844333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-faithful"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0GsZ1mvBocuIAOBsvzPwlO",
      externalLink: "https://open.spotify.com/track/0GsZ1mvBocuIAOBsvzPwlO",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Eye To Eye",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "eyetoeye|7FQRbf8gbKw8KZQZAJWxH2|269066",
} as const satisfies Track
