import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const pageService = {
  id: "01a05a43-5afa-7d0d-8d60-dbd3c3498f99",
  type: "page-type/service-workstation",
  slug: "page-service",
  definition: "the service answering page queries and landing page writes",
  enabled: true,
  port: 8787,
  binds: ["127.0.0.1", "::1", "workstation.alanwalton.ts.net"],
  systemd: {
    restartDelaySeconds: 1,
    startLimitIntervalSeconds: 0,
  },
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The pages system service runs on a workstation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages system service answers for the pages in akasha and for no page outside akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A query is answered from the index and from the values beside the pages that query names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A read takes no lock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read is answered while another read is being answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer is never older than the file that answer speaks for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write commits the values its pages keep in the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value a page keeps outside the commit is written beside the page and committed with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write is not gated by the checks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write is not a break of the glass.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Writes arriving while a write is committing are committed together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write names its writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer a write names stands in the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write that did not commit put nothing into the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The index the pages system service reads is built from the commit at HEAD.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The index names the paths the pages system service does not answer for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pod reaches the pages system service over the tailnet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The port the pages system service listens on is read from this page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The host names the pages system service answers on are read from this page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The pages system service answers on the house network.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no port is refused when the page is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The store the cluster reaches reads as ready only while the pages system service is listening.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No caller of the pages system service is asked for a credential.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An answer costs nothing where the pages the answer rests on have not changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages system service is started again for as long as that service is failing.",
    },
  ],
  parts: [
    "manifest/page-forwarder",
    "module/call-reading",
    "module/file-answering",
    "module/kinds-gathering",
    "module/page-appending",
    "module/page-asking",
    "module/page-calling",
    "module/page-composing",
    "module/page-listening",
    "module/page-placing",
    "module/page-putting",
    "module/page-reading",
    "module/page-serving",
    "module/page-shaping",
    "module/page-writing",
    "module/pages-foldered",
    "module/where-testing",
  ],
} as const satisfies ServiceWorkstation
