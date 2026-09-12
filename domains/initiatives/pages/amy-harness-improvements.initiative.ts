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
        "A seat's Claude Code session is named for that seat, so Alan sees who he is talking to.",
      workingMemory:
        "A session carries two names. The live one, which a session listing shows, is registered once from `CLAUDE_CODE_SESSION_NAME` as the child writes its record under `sessions/<pid>.json`, so no Stop hook reaches it; without that key a child takes its folder's name, which is why seats list as `repos-NN`. `supervisor-adopt` now hands it the seat's slug, and a running seat keeps its old name until restarted. The Stop hook writes the other name, the title the transcript carries.",
    },
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
