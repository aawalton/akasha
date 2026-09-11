import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const dallaServiceStability = {
  id: "01a0911d-4745-7cb3-aef6-81176d51a5ea",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "dalla-service-stability",
  domain: "domain/service",
  persona: "dalla",
  intents: [
    {
      statement: "A service the wrapper cannot start again reaches an agent.",
      workingMemory:
        "Alan: the wrapper is answerable for a service staying alive, and where it cannot resolve a break it alerts an agent, which retires `service-watching`. Nothing alerts today. `Restart=always` with no burst limit leaves a unit reading `activating` forever and never `failed`. `service-watching` is itself a service under the same wrapper, so it died of the same fault and reported none of it. `OnFailure` and `StartLimitBurst` are uncarried by the `systemd` record property.\n",
    },
    {
      statement: "A unit names the wrapper by something a folder move cannot break.",
      workingMemory:
        "The unit runs `bun infrastructure/services/workstations/service-wrapping/service-wrapping.module.code.ts -- bun <the service>`. The wrapper is the target, so when its own path moved, bun exited 1 before a line of wrapper code ran, and a wrapper cannot alert about the wrapper not being there. That path was spelled three ways in three days. A unit naming a stable entrypoint that resolves the wrapper through the index is what the alerting intent rests on.\n",
    },
    {
      statement: "A change moving a file a deployed unit names rewrites that unit or is refused.",
      workingMemory:
        "Nothing redeploys a unit when the path its page spells moves. It came again on 2026-09-11: `9c088cf6742` moved the tree under `infrastructure/`, crash-looping `pages-service` until 10:06 and taking alanwalton.com with it. Every service page was right throughout; only the installed units were stale. The findings `a-folder-move-leaves-the-run-path-a-service-page-spells-pointing-at-nothing` and `a-folder-move-stops-the-service-whose-page-spells-the-moved-path` record the class.\n",
    },
    {
      statement:
        "A change renaming a page type rewrites every deployed resource naming it or is refused.",
      workingMemory:
        "The `page-store` readiness probe asks the pages for page type `workstation-service`, which was renamed to `service-workstation`. The pages answer 400, so the pod never read ready, its service carried no endpoints, and every loader asking the pages threw. `page-store.manifest.code.ts` already said the new slug; only the nine-day-old deployment was stale, and `akasha deploy page-store` mended it.\n",
    },
    {
      statement: "A cluster workload that has not read ready reaches an agent.",
      workingMemory:
        "`page-store` sat running with zero endpoints for nine days and nothing said so, while alanwalton.com answered 500 to every signed-in reader. The first intent puts the alerting on the workstation wrapper, and nothing watches the cluster the same way. A pod running but never ready is the cluster's twin of a unit activating but never failed: both read as alive to whatever counts failures.\n",
    },
  ],
  constraints: [
    "A service a change broke is mended by closing the gap in the change, the guard or the check rather than by mending that one service.",
  ],
} as const satisfies Initiative
