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
        "The unit runs `bun services/workstations/service-wrapping/service-wrapping.module.code.ts -- bun <the service>`. The wrapper is the target, so when its own path moved, bun exited 1 before a line of wrapper code ran, and a wrapper cannot alert about the wrapper not being there. That path was spelled three ways in three days. A unit naming a stable entrypoint that resolves the wrapper through the index is what the alerting intent rests on.\n",
    },
    {
      statement: "A change moving a file a deployed unit names rewrites that unit or is refused.",
      workingMemory:
        "Nothing redeploys a unit when the path its page spells moves. Every service page was right through the outage; only the installed units were stale, and `akasha deploy <slug>` put all twelve back. The findings `a-folder-move-leaves-the-run-path-a-service-page-spells-pointing-at-nothing` and `a-folder-move-stops-the-service-whose-page-spells-the-moved-path` record the class and neither was acted on.\n",
    },
  ],
  constraints: [
    "A service a change broke is mended by closing the gap in the change, the guard or the check rather than by mending that one service.",
  ],
} as const satisfies Initiative
