import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxSilentNight = {
  id: "01a0b4c8-6709-7867-af8d-4f1c28a522c3",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-silent-night",
  ownLength: 5.466666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GiLifDol2BAvcv5JKb3JB",
      externalLink: "https://open.spotify.com/track/5GiLifDol2BAvcv5JKb3JB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Silent Night",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "silentnight|7FQRbf8gbKw8KZQZAJWxH2|328000",
  song: "song/celtic-woman-silent-night",
} as const satisfies Track
