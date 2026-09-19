import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domainTreeHanging = {
  id: "01a0b7a0-c25d-7084-bc7a-9ba4b269d516",
  type: "page-type/module",
  slug: "domain-tree-hanging",
  definition: "the domain tree a set of things is hung on, with every domain holding none left out",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The domains are nested here the way the domains panel nests them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing hangs under the domain that thing names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain with nothing hung beneath it anywhere is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain's count is everything hung beneath it rather than every row beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That count reaches the whole descent rather than what hangs directly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing hung on a domain carries no count of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain's own things are drawn after the domains beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What hangs on one domain keeps the order the caller gave it in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing naming a domain the nesting never reached is drawn as a root of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every domain named that way is reported unreached as well as drawn.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides what is hung on the domains.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file the editor holds.",
    },
  ],
} as const satisfies Module
