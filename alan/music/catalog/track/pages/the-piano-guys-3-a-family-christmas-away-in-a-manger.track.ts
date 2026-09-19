import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasAwayInAManger = {
  id: "01a0afa2-1816-7c0b-ab0b-c697a003cd5f",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-away-in-a-manger",
  ownLength: 3.1982666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4AdyjF5Db6nVtSkHSQVe7m",
      externalLink: "https://open.spotify.com/track/4AdyjF5Db6nVtSkHSQVe7m",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Away in a Manger",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0IyFf7sJynolp1a7Ck79u9", artistName: "William J. Kirkpatrick" },
    { externalId: "1U5zgr455OGyIkLNXvDdrf", artistName: "Traditional" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey:
    "awayinamanger|0IyFf7sJynolp1a7Ck79u9,0jW6R8CVyVohuUJVcuweDI,1U5zgr455OGyIkLNXvDdrf|191896",
  song: "song/the-piano-guys-away-in-a-manger",
} as const satisfies Track
