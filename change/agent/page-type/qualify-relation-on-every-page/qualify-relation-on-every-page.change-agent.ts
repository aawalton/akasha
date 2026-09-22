import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const qualifyRelationOnEveryPage = {
  id: "01a0a06e-3331-798c-81bc-0c45119e50c0",
  type: "page-type/change-agent",
  slug: "qualify-relation-on-every-page",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "a bare name a key holds made an address, on every page of a page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming its page type under the key already is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field named beside the key is written inside each of that key's entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those entries sit in the page's own body or in the entry file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run naming no field writes the key's own value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type no page of which names a page by a bare name is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no count writes every page naming a page by a bare name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Writing the names anew is left to the mechanical change acting on a page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page's own body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
