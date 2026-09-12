import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const shellTerminal = {
  id: "01a0884d-5f98-745e-bc9f-ced0318936eb",
  type: "domain",
  slug: "shell-terminal",
  definition: "the shell an editor terminal runs",
  parts: [
    "module/document-present",
    "module/terminal-account-launchers",
    "module/terminal-bash",
    "module/terminal-ended",
    "module/terminal-entry-points",
    "module/terminal-reload",
    "module/terminal-seat-launchers",
    "module/terminal-seat-marks",
    "module/terminal-seat-stating",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A restart of the editor puts every interactive seat back in the terminal tab that seat held.",
    },
  ],
} as const satisfies Domain
