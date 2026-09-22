import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aranyaServiceBundles = {
  id: "01a0ca2f-82fe-7bea-ab81-5743ec271e8c",
  type: "page-type/initiative",
  slug: "aranya-service-bundles",
  domain: "domain/infrastructure",
  persona: "persona/aranya",
  intentStack: [
    {
      statement: "A deploy is judged over what the one service it puts up is built from.",
      workingMemory:
        "Not started. A deploy is judged over the diff from the commit it last put up, narrowed to the union over every workstation service plus the CLI, which was 1174 files on 2026-09-12. So a red test under `page/index`, which no workstation service reads, refuses the whole kind. `closuresOf` in `deploy-file-closure` already builds a per-slug closure and `touchedIn` already answers which services a change reaches; `unionOf` collapses them. The per-service artifact makes that judgement possible.",
    },
  ],
  constraints: [
    "A workstation service is deployed as one file, built from the commit that deploy puts up.",
    "A service that restarts outside a deploy runs the same file that service was deployed.",
    "No full copy of the repository is kept for a workstation service.",
    "No workstation service runs from a second checkout of the repository, git-linked or exported.",
    "A bundle proves the commit it is named for rather than taking the commit `HEAD` named while the bundle was built.",
    "At most two bundles are kept for a service at a time.",
    "A service whose bundle will not build refuses the whole deploy rather than leaving a unit naming it.",
  ],
} as const satisfies Initiative
