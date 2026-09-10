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
        "Alan wants the reading timers gone rather than kept under the watch. Eight readouts move and seven of them read one folder, `days/pages/<today>/`. Plants reads the food entries, monarch keeps its timer since it asks the Monarch API live, and the three Claude countdowns take no reading at all. The blocker is `STALE_AFTER_MS`: with no beat a tile goes dark at minute 46, so being current has to become whether the watcher is well rather than whether a reading is recent.",
    },
    {
      statement: "Alan deletes an initiative from the Work Panel's right click menu.",
      workingMemory:
        "The panel is `editor-extension/work-tree-panel`, with `work-tree-view`, `work-tree-ids` and `work-tree-reading` beside it. The initiative page type states `mortal: true`, so its pages are expected to be deleted, and `akasha change draft` already runs a `remove-page` act, so nothing new has to be written to do the deleting. Unsettled: whether the panel mutates a page anywhere today, and what becomes of a seat whose assignment is the initiative being deleted.",
    },
    {
      statement: "Alan deletes one initiative intent from the Work Panel's right click menu.",
      workingMemory:
        "An intent is one entry in the `intents` record list on the initiative's own page, so deleting one rewrites that page rather than removing a file, and `akasha change draft` already runs a `remove-property-record` act for exactly that. `intents` is optional, so an initiative may be left holding none. Unsettled: whether this shares the menu declaration and the id scheme with deleting a whole initiative, which decides whether the two can be built side by side.",
    },
  ],
} as const satisfies Initiative
