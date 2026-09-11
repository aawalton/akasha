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
        "MEASURED: HealthKit's store is encrypted while the phone is locked, so a timed automation fails there — the 11:30 run on 2026-09-11 said the store was shut and Alan confirmed the phone was locked. So the drain also runs when the app comes forward, at most once a quarter hour. Build 215 carried that and nothing arrived, which told nothing: a plugin that never loaded and a run that hung leave one silence. Build 216 says a run began before it reads, and keeps a refused report.",
    },
  ],
} as const satisfies Initiative
