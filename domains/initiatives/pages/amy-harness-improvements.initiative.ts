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
      statement: "The Stream Health Samples shortcut succeeds when an iOS automation runs it.",
      workingMemory:
        "TestFlight build 214 carries a reporter: every run posts its outcome sentence to /api/errors, a route asking for no credential, so even a run that reads nothing out of the Keychain is heard. Read the runs by asking for runtime-error pages whose url is stream-health-samples; the build number rides on the userAgent. Why an automation fails is still unknown. A locked phone can read neither HealthKit nor the Keychain, and that is the reading these reports are there to settle.",
    },
  ],
} as const satisfies Initiative
