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
        "The bridge is injected on a remote origin with no origin check and `allowNavigation` already lists the site, so the move works and no deep link changes. The cost is the shell: `alan/web` wires none of native TTS, the download button, the media resolvers or `useIsOnline`, and serves HTML `no-store` behind a per-request nonce. The entry must fall back to the bundled shell when offline and those wirings must land with it, or Alan trades read-aloud for 1Password.",
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
