import type { Initiative } from "../initiative.page-type.ts"

export const astraPersonsCleanup = {
  id: "01a06cd9-a5d8-7ceb-980a-d9e77ebb0437",
  pageTypeSlug: "initiative",
  slug: "astra-persons-cleanup",
  domainSlug: "workspace-package/readout-system",
  personaSlug: "astra",
  intents: [
    {
      statement: "All readouts-specific files are organized in the readouts/ folder.",
      workingMemory:
        "The package is `readout-system` and its folder is `readout-system/`, holding 184 tracked files. Nineteen of the twenty `readout` pages sit there, and the twentieth sits at `temper/temper-progress/readouts/inboxes-temper-tasks/`, where whether it belongs is unsettled. `alan/harness/readouts/` holds the `alan-readouts` domain, which is the readings that reach Alan rather than the system.",
    },
    {
      statement: "The readouts/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "The check judged 201 files under `readout-system/` and refused two folders. `readout-system` refuses because its subfolder `rings` is no part the package declares, the package declaring `domain/ring`. `readout-system/rings` refuses because it holds four pages rather than one: `budget-ring`, `completion-ring`, `ring` and `stoplight-ring`.",
    },
  ],
} as const satisfies Initiative
