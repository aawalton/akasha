import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const sweepWindowPages = {
  id: "01a0a166-9b55-7e8f-89b6-fccdbd5cda2d",
  type: "page-type/service-workstation",
  slug: "sweep-window-pages",
  definition: "the service taking away the page of every editor window that is no longer open",
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "hourly",
    jitterSeconds: 300,
    startTimeoutSeconds: 900,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick takes away the page of every window that is no longer open.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page whose window is still open is taken away by a tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick judges a window's process the way a seat's holder process is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick sweeps the main checkout rather than the tree the service runs from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick that finds every window open writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page taken away goes as a commit, so what it was stays in history.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick names every page whose slug states no process rather than guessing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick turns the sweeping module's own sweep rather than a sweep written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick that cannot run at all carries its fault out and fails the unit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How often a tick runs bounds how long a closed window's page stays up.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page's age is read to decide what goes.",
    },
  ],
} as const satisfies ServiceWorkstation
