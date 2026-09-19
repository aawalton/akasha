import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoSomeoneLikeYou = {
  id: "01a0afa1-cf53-7c71-8fb6-f19894040e1e",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-someone-like-you",
  ownLength: 3.9826166666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Ns9vkYSbP3OGL4kG9NpUf",
      externalLink: "https://open.spotify.com/track/0Ns9vkYSbP3OGL4kG9NpUf",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Someone Like You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "someonelikeyou|0jW6R8CVyVohuUJVcuweDI|238957",
  song: "song/the-piano-guys-someone-like-you",
} as const satisfies Track
