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
        "55 of the 59 `ExecStart` lines installed name `.git/trees/service-workstation`; the four that do not run a podman image, two brew binaries and a Windows exe, and no akasha code. Every unit's `WorkingDirectory` is the main checkout, which is the database and the only write target. What is left is the landing: `unit-landing` still moves that tree and writes every unit on each `akasha change apply`, so the deploy is not yet alone in moving it. `deploy-tree-pinning` names that as its gap.",
    },
    {
      statement: "A service waits out the cooldown its page states before deploying again.",
      workingMemory:
        "`number-property/cooldown-seconds` sits on `page-type/service`, and a page stating none takes the 60 seconds `deploy-choosing` holds as the default. Every deploy now keeps `deployEndedAt` beside the page it was read from, whether that deploy put up or refused, and the wait is counted from there. No page states a cooldown of its own yet, so the hour an iOS app wants for TestFlight is unwritten.",
    },
    {
      statement:
        "A service deploys no commit newer than what every service it depends on has deployed.",
      workingMemory:
        "`relation-property/deploys-after` sits on `page-type/service`, and `deploy-choosing` holds back any service that still wants a deploy for one it names. That carries down a chain, since a service held back wants a deploy still, and it deadlocks on nothing, because the one holding another back is the one chosen first. A service naming one that is nowhere is held back by nothing. No page names one yet, so the rule bounds nothing today.",
    },
    {
      statement: "A deploy loop puts up first the service furthest behind that is able to deploy.",
      workingMemory:
        "`chosenFrom` in `deploy-choosing` sorts the able by when the commit each put up was made, oldest first, with a service never put up ahead of every service that has been, and the slug settling a tie so a tick is repeatable. Able means wanting a deploy, past its cooldown, with no deploy of its own running, and held back by nothing it deploys after. A tick with nothing able chooses nothing rather than refusing.",
    },
    {
      statement: "One workstation service runs the deploy loops for every service of one kind.",
      workingMemory:
        "`workstation-deploying` is the one for the workstation kind, ticking every minute. A tick lists that kind's subjects through `deploy-subject-listing`, asks `deploy-wanting` which of them a commit changed, picks one through `deploy-choosing`, and starts `akasha deploy <slug>` in a transient scope named for that slug, then ends rather than waiting. Only the workstation kind has a page: every other kind has nothing recorded as deployed, so a loop would put all of them up at once.",
    },
    {
      statement:
        "A service is deployed without anyone asking once a commit changes what it is built from.",
      workingMemory:
        "Built from is the closure `deploy-file-closure` follows out of the files beside a page, and changed is that closure meeting what `git diff` names between the `deployedCommit` kept beside the page and HEAD. The workstation kind is the union over every workstation service. A subject whose diff names no file at all is answered without following anything. Only the workstation kind has a loop running; every other kind waits on somebody typing the command.",
    },
  ],
  constraints: [
    "The checks a deploy runs are the checks stating `runs-on-deploy`.",
    "A deploy is judged over the files its artifact is built from, diffed between the last deploy's commit and this one.",
  ],
} as const satisfies Initiative
