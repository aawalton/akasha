import type { Initiative } from "../initiative.page-type.ts"

export const astraReadoutsCleanup = {
  id: "01a06cd9-a5d8-7ceb-980a-d9e77ebb0437",
  pageTypeSlug: "initiative",
  slug: "astra-readouts-cleanup",
  domainSlug: "workspace-package/readout-system",
  personaSlug: "astra",
  intents: [
    {
      statement: "All readouts-specific files are organized in the readouts/ folder.",
      workingMemory:
        "The duplicated rules, the two properties no page type declared, and the harness that could serve a test run no stylesheet are cleared, so `no-rule-in-two-files`, `folder-matches-a-shape` and the test check refuse nothing under `readout-system/`. `move-folder-package` composes the carry as 430 changes, waiting on `move-folder`, which builds its list from the index and so names sidecars holding no file and misses uncommitted files that are there.",
    },
    {
      statement: "The readouts/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "The check refuses nothing under `readout-system/` now. `rings` became `ring`, the name the domain it holds gives its folder, and `budget-ring`, `completion-ring` and `stoplight-ring` each took a folder of their own beneath it, leaving one page to a folder. This intent waits on the carry to `readouts/` and on nothing else.",
    },
  ],
} as const satisfies Initiative
