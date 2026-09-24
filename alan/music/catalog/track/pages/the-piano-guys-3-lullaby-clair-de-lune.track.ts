import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyClairDeLune = {
  id: "01a0afa1-dd68-7d00-b713-907fd9daa5fc",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-clair-de-lune",
  ownLength: 3.2080166666666665,
  ownProgress: 3.2080166666666665,
  partOfCollections: [
    "release/the-piano-guys-3-lullaby",
    "release/the-piano-guys-classical-for-studying",
    "release/the-piano-guys-peaceful-summer-nights",
    "release/the-piano-guys-relaxing-piano",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Clair de Lune",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "clairdelune|0jW6R8CVyVohuUJVcuweDI|192481",
  song: "song/the-piano-guys-clair-de-lune",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-lullaby",
      discNumber: 1,
      position: 2,
      externalId: "5rJxlS00sApDRlU20qKV8B",
      externalLink: "https://open.spotify.com/track/5rJxlS00sApDRlU20qKV8B",
    },
    {
      release: "release/the-piano-guys-classical-for-studying",
      discNumber: 1,
      position: 1,
      externalId: "0SiGnQTvxTOh8QsuV1DOQm",
      externalLink: "https://open.spotify.com/track/0SiGnQTvxTOh8QsuV1DOQm",
    },
    {
      release: "release/the-piano-guys-peaceful-summer-nights",
      discNumber: 1,
      position: 3,
      externalId: "1SKnbLdtfMo9Al355kGvCE",
      externalLink: "https://open.spotify.com/track/1SKnbLdtfMo9Al355kGvCE",
    },
    {
      release: "release/the-piano-guys-relaxing-piano",
      discNumber: 1,
      position: 5,
      externalId: "0ksqZyV5hgYw5QaPpBfAwv",
      externalLink: "https://open.spotify.com/track/0ksqZyV5hgYw5QaPpBfAwv",
    },
  ],
} as const satisfies Track
