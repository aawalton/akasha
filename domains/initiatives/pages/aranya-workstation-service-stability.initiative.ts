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
        "A service page states nothing of how it runs: `runs` and `starts` are gone, and every unit's `ExecStart` names the runner and the slug. `service-running` finds the page through the index under the checkout the environment names, and imports the `running` group beside it out of the checkout the runner sits in, so a unit runs the pinned tree's code over the main checkout's pages. Deployed over all 44. Left: `run-path-reading` and `service-reaching` are read by nothing.\n",
    },
    {
      statement: "A workstation unit on the machine is what its page says.",
      workingMemory:
        "`akasha deploy <slug>`, run by hand, is still the only path from a page to systemd, so a stale unit is invisible: `unit-writing` stamps `# Written from ` into every header and nothing reads it back. A sweep on 2026-09-11 found all 35 `ExecStart` paths present but 2 of 44 `Documentation=` lines naming a folder since renamed. Links placed outside the checkout no longer drift: `install-linking` repoints every link a page states, in the landing.\n",
    },
  ],
  constraints: [
    "Stability rests on no alert and on nothing a person or agent does; a failed service is a fault in the system, mended so that kind of failure becomes impossible.",
  ],
} as const satisfies Initiative
