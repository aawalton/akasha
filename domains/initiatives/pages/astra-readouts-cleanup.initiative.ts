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
        "`move-folder-package` composes the whole carry from `readout-system/` to `readouts/` as 430 changes, and that landing refuses on faults already in the package rather than on the carry: `no-rule-in-two-files` refuses seven duplications across five readout code files, one of them shared with `agents/claude-accounts`; no page type declares `figure-max-length` or `day-kind`; and four tests fail, two of them naming `readout-system` paths as strings. Each is cleared on its own before the carry lands.",
    },
    {
      statement: "The readouts/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "The check refuses nothing under `readout-system/` now. `rings` became `ring`, the name the domain it holds gives its folder, and `budget-ring`, `completion-ring` and `stoplight-ring` each took a folder of their own beneath it, leaving one page to a folder. This intent waits on the carry to `readouts/` and on nothing else.",
    },
  ],
} as const satisfies Initiative
