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
  ],
  constraints: [
    "This initiative stays when its last intent goes, rather than dying as a finished initiative does.",
  ],
} as const satisfies Initiative
