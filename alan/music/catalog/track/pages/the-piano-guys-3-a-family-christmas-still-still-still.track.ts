import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasStillStillStill = {
  id: "01a0afa2-17d3-7b55-b795-51ca84f54ca2",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-still-still-still",
  ownLength: 4.998433333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "73jJWaNrhk8zS0fY8gPesD",
      externalLink: "https://open.spotify.com/track/73jJWaNrhk8zS0fY8gPesD",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Still, Still, Still",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1U5zgr455OGyIkLNXvDdrf", artistName: "Traditional" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "4dsp5Yr32mZELtFDiJijDf", artistName: "Katherine Nelson" },
  ],
  trackKey:
    "stillstillstill|0jW6R8CVyVohuUJVcuweDI,1U5zgr455OGyIkLNXvDdrf,4dsp5Yr32mZELtFDiJijDf|299906",
  song: "song/the-piano-guys-still-still-still",
} as const satisfies Track
