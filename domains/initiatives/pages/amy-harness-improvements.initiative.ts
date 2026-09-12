import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a0923f-7f1e-7a24-8ed4-0f22b6840e04",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement:
        "A workstation service that stops running is told to the persona who answers for it.",
      workingMemory:
        "`code-editor-data-watcher` was stopped at 04:39 on 2026-09-12 and stayed down until 05:26, taking the terminal tab names and colours with it, and nothing said so. `service-watching` ran every minute throughout and wrote its ledger every minute, and that ledger held only `ttc-client`. `brokenIn` does call an enabled unscheduled unit that is `inactive` broken, so the miss is upstream of it, in what `healthFor` watches. Unwalked.",
    },
  ],
  constraints: [
    "This initiative stays when its last intent goes, rather than dying as a finished initiative does.",
  ],
} as const satisfies Initiative
