import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const qualifyRelationOnEveryPage = {
  id: "01a0a06e-3331-798c-81bc-0c45119e50c0",
  type: "change-agent",
  slug: "qualify-relation-on-every-page",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "a bare name one key holds made an address, on every page of one page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming its page type under the key already is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no page of which names a page by a bare name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count writes every page naming a page by a bare name.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Writing the names anew is left to the mechanical change acting on a page type.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page's own body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
