import type { Initiative } from "../initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a087b7-34b5-7bf9-bc45-4b2eb623b673",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "Alan's app fills his password in from 1Password.",
      workingMemory:
        "Alan settled the origin: the app moves to `https://alanwalton.com` by `server.url` in `alanwalton.ios-app.capacitor-config.json`, which no grep for capacitor finds. Three files break: `auth-mode` flips localStorage auth to cookie auth and abandons the session, `browser-client` feeds it, `sim-driver` builds the sim URL. 24 more are allowlists and `.widgetURL` literals to add the origin to. Whether the suppressor touches AutoFill is unverified; the move settles it at no cost.",
    },
    {
      statement: "All of Jenny's widgets work.",
      workingMemory:
        "Her pod ran a September 2 checkout querying the store with `groupSlugs` and reading `row.scaleSlug`, both since renamed; the store 400s and the route turns any refusal into 503. Categorize survived by looking up on `slug`. Both sites are deployed, and a restart no longer blanks a tile, since a group with no relayed reading now reads the readout's own row. Left: whether her three tiles draw on her phone.",
    },

    {
      statement: "Alan's phone drains its health samples into akasha every day.",
      workingMemory:
        "The drain works: 777 readings landed at 08:16 today. The renames were not the cause — the headscale TLS certificate expired and tailscaled could not fetch its control key, so `workstation.alanwalton.ts.net` had no address for 23h43m while `page-listening` served loopback and systemd called it healthy. Alan holds the certificate. `device-secret-context` answers 503 now rather than 500. Left: make a refused bind fatal, so a store off the tailnet is said.",
    },
  ],
} as const satisfies Initiative
