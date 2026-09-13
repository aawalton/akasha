import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const taylorSwift = {
  id: "019ea415-e8fc-73be-bc29-1dc0adc80d55",
  type: "artist",
  slug: "taylor-swift",
  title: "Taylor Swift",
  partOfCollections: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "following",
  genre: [
    "pop",
    "country",
    "country pop",
    "singer-songwriter",
    "pop rock",
    "contemporary country",
    "synth-pop",
    "indie folk",
  ],
  rank: "S",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "20244d07-534f-4eff-b4d4-930878889970",
      externalLink: "https://musicbrainz.org/artist/20244d07-534f-4eff-b4d4-930878889970",
      lastSyncedAt: "2026-06-08",
    },
    {
      source: "spotify",
      externalId: "06HL4z0CvFAxyc27GXpf02",
      externalLink: "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02",
      lastSyncedAt: "2026-03-02",
    },
  ],
  tags: ["Indie Pop Storyteller"],
  reaction: "txt",
} as const satisfies Artist
