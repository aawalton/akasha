import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxOurLittleAngel = {
  id: "01a0b4c8-64bc-7801-812f-7b5f74dca940",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-our-little-angel",
  ownLength: 2.9811,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3yuWnTfxvtGWKnauBaS9Hg",
      externalLink: "https://open.spotify.com/track/3yuWnTfxvtGWKnauBaS9Hg",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Our Little Angel",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ourlittleangel|7FQRbf8gbKw8KZQZAJWxH2|178866",
  song: "song/paul-cardall-our-little-angel",
} as const satisfies Track
