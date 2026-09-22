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
        "A deploy is judged over the diff since its last commit, narrowed to the union of every service's closure: 59 services, 2726 files. `carriedWith` then widens what the run reads to 8603 by taking whole folders, 630 of them test files no closure holds. Narrowing that union to the services that restart is a no-op: a changed file sits in the union exactly when some restarting service's closure holds it. Taking whole folders is what widens the judging.",
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
