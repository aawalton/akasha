import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoVoices = {
  id: "01a0b4c8-486d-728c-ad1f-9bd848382acc",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-voices",
  ownLength: 4.943333333333333,
  ownProgress: 4.943333333333333,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Voices",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "voices|7FQRbf8gbKw8KZQZAJWxH2|296600",
  song: "song/paul-cardall-voices",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 12,
      externalId: "0JuXdkOzxGNm9glbP1G60P",
      externalLink: "https://open.spotify.com/track/0JuXdkOzxGNm9glbP1G60P",
    },
  ],
} as const satisfies Track
