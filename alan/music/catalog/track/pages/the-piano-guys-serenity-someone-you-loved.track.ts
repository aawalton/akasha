import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenitySomeoneYouLoved = {
  id: "01a0afa2-086a-72b3-9465-ba022024f30b",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-someone-you-loved",
  ownLength: 3.3857666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6exccVMFxHjO0gsWeLum7Q",
      externalLink: "https://open.spotify.com/track/6exccVMFxHjO0gsWeLum7Q",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Someone You Loved",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "someoneyouloved|0jW6R8CVyVohuUJVcuweDI|203146",
} as const satisfies Track
