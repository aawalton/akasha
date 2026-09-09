import type { Domain } from "@akasha/domains/domain"

export const terminalShell = {
  id: "01a0884d-5f98-745e-bc9f-ced0318936eb",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "terminal-shell",
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
} as const satisfies Domain
