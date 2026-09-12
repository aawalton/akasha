import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const dallaDeployCleanup = {
  id: "01a08cd4-2398-7e2b-8600-bc6002b41fe7",
  type: "initiative",
  slug: "dalla-deploy-cleanup",
  domain: "domain/infrastructure",
  persona: "dalla",
  intents: [
    {
      statement:
        "Every workstation service runs from one checkout the workstation deploy alone moves.",
      workingMemory:
        "The wrapper stops following files, so nothing unjudged reaches a running service. The whole kind is put up by one deploy named for the kind, judged over the union of every workstation closure. The tree moves once and only the units whose own closure changed are restarted; a scheduled unit reads the tree on its next tick. The main checkout is the database and the only write target, so a unit reads and writes pages under it while running its code out of the pinned one.",
    },
    {
      statement: "One workstation service runs the deploy loops for every service of one kind.",
    },
    {
      statement: "A service has at most one deploy running at a time.",
    },
    {
      statement: "A service waits out the cooldown its page states before deploying again.",
      workingMemory:
        "The cooldown defaults to one minute, so a run of commits does not re-run the closure checks over and over. An iOS app states an hour, to stay inside TestFlight's limits.",
    },
    {
      statement:
        "A service deploys no commit newer than what every service it depends on has deployed.",
      workingMemory:
        "This edge is a strict version dependency rather than a record of one service reaching another. A service names another only where deploying past that service's deployed commit would break. Two services that talk but tolerate skew name nothing here.",
    },
    {
      statement:
        "A service is deployed without anyone asking once a commit changes what it is built from.",
    },
    {
      statement: "A deploy loop puts up first the service furthest behind that is able to deploy.",
      workingMemory:
        "Furthest behind is the service whose deployed commit is oldest, among those past their cooldown and not held back by a service they depend on. A service nothing can be deployed for is passed over rather than waited on.",
    },
  ],
  constraints: [
    "The checks a deploy runs are the checks stating `runs-on-deploy`.",
    "A deploy is judged over the files its artifact is built from, diffed between the last deploy's commit and this one.",
  ],
} as const satisfies Initiative
