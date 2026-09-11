import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaWorkstationServiceStability = {
  id: "01a0911d-4745-7cb3-aef6-81176d51a5ea",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "aranya-workstation-service-stability",
  domain: "domain/service",
  persona: "aranya",
  intents: [
    {
      statement: "A change never breaks a workstation service.",
      workingMemory:
        "Alan: the code a workstation service runs is named by a module-group property on the service page, and that module has a standard `runService` export, so the run cannot be separated from the service. Today the page states `starts` records and `runs` literal command strings spelling `.ts` paths, which a folder move leaves stale. A guard or a check over those strings is the wrong mend.\n",
    },
    {
      statement: "A workstation unit on the machine is what its page says.",
      workingMemory:
        "`akasha deploy <slug>`, run by hand, is the only path from a page to systemd. A service's own page is never in the wrapper's import closure (`service-wrapping.module.ts:85`), so `systemd`, `enabled` and `schedule` reach the machine on a deploy alone, and a code change restarts the process without rewriting the unit. `unit-writing.ts` stamps `# Written from ` into every unit header and nothing reads it back, so a stale unit is invisible.\n",
    },
  ],
  constraints: [
    "Stability rests on no alert and on nothing a person or agent does; a failed service is a fault in the system, mended so that kind of failure becomes impossible.",
  ],
} as const satisfies Initiative
