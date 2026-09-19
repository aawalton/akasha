import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysAThousandYears = {
  id: "01a0afa2-19b8-7895-99ba-fc106f2cf03d",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-a-thousand-years",
  ownLength: 4.612433333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0E0xI4AgMNU7UkwBt3FCVN",
      externalLink: "https://open.spotify.com/track/0E0xI4AgMNU7UkwBt3FCVN",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Thousand Years",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "athousandyears|0jW6R8CVyVohuUJVcuweDI|276746",
  song: "song/the-piano-guys-a-thousand-years",
} as const satisfies Track
