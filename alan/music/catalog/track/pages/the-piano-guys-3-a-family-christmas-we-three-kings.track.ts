import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasWeThreeKings = {
  id: "01a0afa2-17f5-70b2-a221-9c643bdef766",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-we-three-kings",
  ownLength: 3.2588166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4xwQXoPQP2RJ6j98vgJgVV",
      externalLink: "https://open.spotify.com/track/4xwQXoPQP2RJ6j98vgJgVV",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "We Three Kings",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1U5zgr455OGyIkLNXvDdrf", artistName: "Traditional" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey: "wethreekings|0jW6R8CVyVohuUJVcuweDI,1U5zgr455OGyIkLNXvDdrf|195529",
} as const satisfies Track
