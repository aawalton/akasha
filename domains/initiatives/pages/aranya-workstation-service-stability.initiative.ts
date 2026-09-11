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
        "Alan: two shapes of intervention make this true, and which one fits depends on the case — the change rewrites or refuses what it would break, or the deployed unit names nothing a change can move.\n",
    },
    {
      statement: "A workstation unit on the machine is what its page says.",
      workingMemory:
        "`akasha deploy <slug>`, run by hand, is the only path from a page to systemd. A service's own page is never in the wrapper's import closure (`service-wrapping.module.ts:85`), so `systemd`, `enabled` and `schedule` reach the machine on a deploy alone, and a code change restarts the process without rewriting the unit. `unit-writing.ts` stamps `# Written from ` into every unit header and nothing reads it back, so a stale unit is invisible.\n",
    },
    {
      statement: "A workstation service found ill is made well without anyone acting.",
      workingMemory:
        "Nothing acts on an ill verdict: `service-wellness.module.code.ts:29-38` writes `well: false` beside the page and `service-watching` sends a message to the champion persona. No code restarts on ill health. A crash loop reads well — `WELL = {active, activating, reloading}` (`service-health.module.code.ts:19`), measured at 17 restarts in 136s without ever reaching `failed`. The heartbeat route covers only services stating `worksWithinSeconds`.\n",
    },
  ],
  constraints: [
    "Stability rests on no alert and on nothing a person or agent does; a failed service is a fault in the system, mended so that kind of failure becomes impossible.",
  ],
} as const satisfies Initiative
