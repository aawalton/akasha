import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const dallaDeployCleanup = {
  id: "01a08cd4-2398-7e2b-8600-bc6002b41fe7",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "dalla-deploy-cleanup",
  domain: "domain/infrastructure",
  persona: "dalla",
  intents: [
    {
      statement: "Everything that is deployed has a service page.",
      workingMemory:
        "`deploy-kind-reading` reads seven kinds: web-app, ios-app, service-cluster, service-workstation, service-inference, container-recipe and eso-addon. Three of those are service pages already. A web app, an ios app, a container recipe and an eso addon are not.\n",
    },
    {
      statement: "A deploy happens at a specific commit, not at HEAD.",
      workingMemory:
        "`--ref` belongs to an ios app alone, and an ios deploy naming none is refused where a tracked file differs from HEAD. The deploy help says a pod builds from the commit HEAD is at, and a workstation service, an inference service and an eso addon are put up from the checkout.\n",
    },
    {
      statement: "A deployed service tracks the most recent commit that was successfully deployed.",
    },
    {
      statement:
        "A deploy happens only where every file its artifact is built from passed its checks at that commit.",
    },
  ],
  constraints: [
    "The checks a deploy runs are the checks stating `runs-on-deploy`.",
    "A deploy is judged over the files its artifact is built from, diffed between the last deploy's commit and this one.",
  ],
} as const satisfies Initiative
