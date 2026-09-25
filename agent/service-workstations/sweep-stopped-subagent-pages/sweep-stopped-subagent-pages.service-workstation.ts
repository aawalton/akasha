import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const sweepStoppedSubagentPages = {
  id: "01a0d8f4-aa3d-72bb-b19c-0205b4dffd80",
  type: "page-type/service-workstation",
  slug: "sweep-stopped-subagent-pages",
  definition: "the service taking away every subagent page stopped from the agents panel",
  enabled: true,
  systemd: {
    schedule: "minutely",
    jitterSeconds: 5,
    accuracySeconds: 1,
    startTimeoutSeconds: 420,
  },
  told: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick takes away the pages with a stop beside them and no others.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick judges a page on its stop and on whether a live process acts under it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A tick reads no transcript, so no tick pays for the full census.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick where no page carries a stop reads which pages carry one and stops there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick sweeps the main checkout rather than the tree the service runs from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick says which pages went and says nothing where none went.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick takes through the lock the full census takes through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick finding that lock held writes nothing and says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick that wrote nothing for a held lock ran rather than failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick that cannot run at all carries its fault out and fails the unit.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A tick waits up to 300 seconds for the landing lock every seat shares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick is allowed longer than that wait, so a held lock ends a tick gently.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A timer elapsing during a tick joins that tick rather than starting a second one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How often a tick runs bounds how long a stopped subagent's row stays up.",
    },
  ],
} as const satisfies ServiceWorkstation
