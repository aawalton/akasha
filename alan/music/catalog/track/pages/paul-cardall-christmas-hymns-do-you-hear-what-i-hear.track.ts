import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsDoYouHearWhatIHear = {
  id: "01a0b4c8-54ce-79a7-a95c-6b2f37544761",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-do-you-hear-what-i-hear",
  ownLength: 4.181766666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6a2813oVuxkVqXZJEbX8AR",
      externalLink: "https://open.spotify.com/track/6a2813oVuxkVqXZJEbX8AR",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Do you hear what I Hear?",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "doyouhearwhatihear|7FQRbf8gbKw8KZQZAJWxH2|250906",
  song: "song/paul-cardall-do-you-hear-what-i-hear",
} as const satisfies Track
