import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const eppieSpotifyCleanup = {
  id: "01a090fb-cdee-7e42-9dc4-823acf3d43f9",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "eppie-spotify-cleanup",
  domain: "domain/spotify",
  persona: "eppie",
  intents: [
    {
      statement: "Consent asks for no scope the spotify domain never uses.",
      workingMemory:
        "`SPOTIFY_SCOPES` names sixteen. Five are never exercised: `playlist-modify-public`, `playlist-modify-private`, `user-library-modify`, `user-follow-modify` and `ugc-image-upload`. The domain reads the player, search, one track and the top items, and commands the player; it writes no playlist, saves no track, follows no artist and uploads no image. Dropping a scope means asking Alan for consent again, so this waits on the next consent rather than calling for one.",
    },
  ],
} as const satisfies Initiative
