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
        "Alan settled the origin and I settled the mechanism: a bundled entry redirecting to `https://alanwalton.com`, as smilingjenny boots. Every CORS allowlist already carries the origin, and no deep link changes, since iOS hands a widget's URL to its own app whatever the scheme and the router keeps only the path. Left: whether Capacitor injects its bridge on a remote origin, which nothing here exercises and everything native needs, then `auth-mode` deleted and `browser-client` always cookie-ssr.",
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
    {
      statement: "Every stoplight takes its reading on a watch rather than on a timer.",
      workingMemory:
        "Twelve readouts take a reading on a `*:0/5` timer and relay it on `*:2/5`. Two watches already run: `inbox-count-watch` follows the index and re-takes the task counts, and `data-watching` recomputes each code editor picture from the folders that picture declares it reads. The second is the general mechanism and the one to reach for. Left: whether each reading has a source in the checkout to watch, since Monarch, Claude usage and the health samples arrive from outside it.",
    },
  ],
} as const satisfies Initiative
