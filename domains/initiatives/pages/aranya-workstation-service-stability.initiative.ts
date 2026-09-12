import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaWorkstationServiceStability = {
  id: "01a0911d-4745-7cb3-aef6-81176d51a5ea",
  type: "initiative",
  slug: "aranya-workstation-service-stability",
  domain: "domain/service",
  persona: "aranya",
  intents: [
    {
      statement: "A change never breaks a workstation service.",
      workingMemory:
        "A service page states nothing of how it runs: every unit's `ExecStart` names the runner and the slug, and `service-running` imports the `running` group beside the page out of the tree it sits in. That runner is in all 45 closures, so the deploy judges the `running.test.ts` of every service a change would restart, before pinning the tree that restarts them. Left: nothing proves a service came up after its restart; an alert says so instead.\n",
    },
    {
      statement: "A workstation unit on the machine is what its page says.",
      workingMemory:
        "`workstation-deploying` runs the kind's deploy every minute once a commit changes what a service is built from, so a page reaches systemd with nobody asking. `unit-writing` stamps `# Written from ` into every header and nothing reads it back, so a unit edited by hand keeps that edit until the next commit inside its service's closure. `install-linking` repoints in the landing every link a page places outside the checkout.\n",
    },
  ],
  constraints: [
    "Stability rests on no alert and on nothing a person or agent does; a failed service is a fault in the system, mended so that kind of failure becomes impossible.",
  ],
} as const satisfies Initiative
