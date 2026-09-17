import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3DoYouHearWhatIHearDoYouHearWhatIHear = {
  id: "01a0afa1-f745-78e8-b106-f35c0f040126",
  type: "page-type/track",
  slug: "the-piano-guys-3-do-you-hear-what-i-hear-do-you-hear-what-i-hear",
  ownLength: 3.33695,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-do-you-hear-what-i-hear"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Wnkid6KiAXEVIOr8ufniq",
      externalLink: "https://open.spotify.com/track/0Wnkid6KiAXEVIOr8ufniq",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Do You Hear What I Hear?",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "doyouhearwhatihear|0jW6R8CVyVohuUJVcuweDI|200217",
} as const satisfies Track
