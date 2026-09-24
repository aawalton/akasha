import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3DoYouHearWhatIHearDoYouHearWhatIHear = {
  id: "01a0afa1-f745-78e8-b106-f35c0f040126",
  type: "page-type/track",
  slug: "the-piano-guys-3-do-you-hear-what-i-hear-do-you-hear-what-i-hear",
  ownLength: 3.33695,
  ownProgress: 3.33695,
  partOfCollections: ["release/the-piano-guys-3-do-you-hear-what-i-hear"],
  status: "completed",
  unit: "unit/minutes",
  title: "Do You Hear What I Hear?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "doyouhearwhatihear|0jW6R8CVyVohuUJVcuweDI|200217",
  song: "song/the-piano-guys-do-you-hear-what-i-hear",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-do-you-hear-what-i-hear",
      discNumber: 1,
      position: 1,
      externalId: "0Wnkid6KiAXEVIOr8ufniq",
      externalLink: "https://open.spotify.com/track/0Wnkid6KiAXEVIOr8ufniq",
    },
  ],
} as const satisfies Track
