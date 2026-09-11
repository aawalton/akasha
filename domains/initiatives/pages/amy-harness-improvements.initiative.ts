import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a090ef-ed11-7162-90af-281766fc1806",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement:
        "A code editor restart puts every interactive seat back in the terminal tab that seat held.",
      workingMemory:
        "The reattach itself already worked; what the restart lost was which tab held which seat, because the revive attaches tmux directly and that was the one path writing no seat mark. The bash every shell evals now writes the mark when the editor hands it VSCODE_TMUX_REATTACH. Nothing more can be told from here: the next editor restart is what exercises it.",
    },
    {
      statement: "Alan's phone drains its health samples without him running a shortcut.",
      workingMemory:
        'A Shortcuts automation on a timer cannot be relied on. HealthKit\'s store is encrypted while the phone is locked, so every read from a run firing then fails: the 11:30 run on 2026-09-11 reported "Health\'s store was shut" for both metrics, and nothing on the phone can schedule "unlocked". The drain therefore also runs when the app comes forward, which is unlocked by definition, at most once an hour. Read the runs by asking for runtime-error pages whose url is stream-health-samples.',
    },
  ],
} as const satisfies Initiative
