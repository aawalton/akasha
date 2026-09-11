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
      statement:
        "A deploy is built from a tree pinned at the commit rather than from the working checkout.",
      workingMemory:
        "A git worktree pinned at the commit shares the object store, so this costs a checkout of the tree rather than a clone. The tree is the commit, so the gate refusing a worktree that differs never fires. A tree an artifact is built from is taken away once the deploy is done, and the one a workstation service runs from is kept.",
    },
    {
      statement: "A workstation service runs from a checkout that only its own deploy moves.",
      workingMemory:
        "The wrapper stops following files and restarting on a change, so nothing unjudged reaches a running service. The deploy moves that checkout to the commit and restarts the unit. The main checkout is the database and the only write target, so the pinned one holds the code a unit runs while the root pages are read and written under stays the main checkout.",
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
  ],
  constraints: [
    "The checks a deploy runs are the checks stating `runs-on-deploy`.",
    "A deploy is judged over the files its artifact is built from, diffed between the last deploy's commit and this one.",
  ],
} as const satisfies Initiative
