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
      statement: "No Spotify secret page is left over from the collections fold.",
      workingMemory:
        "Three sit unmounted: `collections-secrets-spotify-client-id`, `-client-secret` and `-redirect-uri`. The cluster mounts `alanwalton-secrets-spotify-client-id` and `-client-secret` on `alanwalton-web` and `alanwalton-atlas`. Nothing reads a redirect URI outside `auth-cli`, which Alan runs at his own terminal. Deleting the three is held back because the redirect URI's plaintext is in no other page, and whether Spotify's dashboard still holds it is unseen from here.\n",
    },
  ],
} as const satisfies Initiative
