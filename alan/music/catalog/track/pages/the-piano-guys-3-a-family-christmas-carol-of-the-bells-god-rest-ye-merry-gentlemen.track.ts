import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasCarolOfTheBellsGodRestYeMerryGentlemen = {
  id: "01a0afa2-1777-7603-8e24-0fd1541ac0a2",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-carol-of-the-bells-god-rest-ye-merry-gentlemen",
  ownLength: 3.3653,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7r6am67jCRvroqkkE2TS8y",
      externalLink: "https://open.spotify.com/track/7r6am67jCRvroqkkE2TS8y",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Carol of the Bells / God Rest Ye Merry Gentlemen",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6lBN3Tzt61u8i9AJoAhKzF", artistName: "Mykola Dmytrovych Leontovych" },
    { externalId: "1U5zgr455OGyIkLNXvDdrf", artistName: "Traditional" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey:
    "carolofthebellsgodrestyemerrygentlemen|0jW6R8CVyVohuUJVcuweDI,1U5zgr455OGyIkLNXvDdrf,6lBN3Tzt61u8i9AJoAhKzF|201918",
  song: "song/the-piano-guys-carol-of-the-bells-god-rest-ye-merry-gentlemen",
} as const satisfies Track
