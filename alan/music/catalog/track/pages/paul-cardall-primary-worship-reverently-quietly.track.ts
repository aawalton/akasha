import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPrimaryWorshipReverentlyQuietly = {
  id: "01a0b4c8-56fa-7a61-8539-bb3136c531ae",
  type: "page-type/track",
  slug: "paul-cardall-primary-worship-reverently-quietly",
  ownLength: 3.15355,
  ownProgress: 3.15355,
  partOfCollections: ["release/paul-cardall-primary-worship", "release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Reverently Quietly",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "reverentlyquietly|7FQRbf8gbKw8KZQZAJWxH2|189213",
  song: "song/paul-cardall-reverently-quietly",
  carriedBy: [
    {
      release: "release/paul-cardall-primary-worship",
      discNumber: 1,
      position: 11,
      externalId: "626e9Py1Awti5VQYrGW7WO",
      externalLink: "https://open.spotify.com/track/626e9Py1Awti5VQYrGW7WO",
    },
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 15,
      externalId: "2lphskZNhDQLdfid5Le2Gm",
      externalLink: "https://open.spotify.com/track/2lphskZNhDQLdfid5Le2Gm",
    },
  ],
} as const satisfies Track
