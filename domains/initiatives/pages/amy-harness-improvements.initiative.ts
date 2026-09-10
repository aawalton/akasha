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
        "777 readings landed at 08:16 on 2026-09-10. The cause was never the renames — the headscale TLS certificate expired, tailscaled could not fetch its control key, and `workstation.alanwalton.ts.net` had no address for 23h43m while `page-listening` served loopback and systemd called it healthy. Alan holds that certificate. A refused bind is now published as `unbound` beside the service page and read by `brokenIn`, so the store reads broken in a minute and mends when the name binds.",
    },
    {
      statement: "Every stoplight takes its reading on a watch rather than on a timer.",
      workingMemory:
        "Alan wants the reading timers gone rather than kept under the watch. Eight readouts move and seven of them read one folder, `days/pages/<today>/`. Plants reads the food entries, monarch keeps its timer since it asks the Monarch API live, and the three Claude countdowns take no reading at all. The blocker is `STALE_AFTER_MS`: with no beat a tile goes dark at minute 46, so being current has to become whether the watcher is well rather than whether a reading is recent.",
    },
  ],
} as const satisfies Initiative
