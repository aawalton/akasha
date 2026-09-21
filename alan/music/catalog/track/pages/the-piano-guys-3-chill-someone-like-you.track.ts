import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillSomeoneLikeYou = {
  id: "01a0afa1-e0b2-73cb-95ba-f6fd739a9481",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-someone-like-you",
  ownLength: 3.9826166666666665,
  ownProgress: 3.9826166666666665,
  partOfCollections: ["release/the-piano-guys-3-chill", "release/the-piano-guys-3-pop-on-piano"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "69q8YjuybeflQbQB5bwSeS",
      externalLink: "https://open.spotify.com/track/69q8YjuybeflQbQB5bwSeS",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Someone Like You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "someonelikeyou|0jW6R8CVyVohuUJVcuweDI|238957",
  song: "song/the-piano-guys-someone-like-you",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-chill",
      discNumber: 1,
      position: 3,
      externalId: "69q8YjuybeflQbQB5bwSeS",
      externalLink: "https://open.spotify.com/track/69q8YjuybeflQbQB5bwSeS",
    },
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 12,
      externalId: "0Ns9vkYSbP3OGL4kG9NpUf",
      externalLink: "https://open.spotify.com/track/0Ns9vkYSbP3OGL4kG9NpUf",
    },
  ],
} as const satisfies Track
