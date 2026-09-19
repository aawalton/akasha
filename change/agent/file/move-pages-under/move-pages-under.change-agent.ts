import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const movePagesUnder = {
  id: "01a0ba5c-5a5f-79e4-a8e4-1cfded3be787",
  type: "page-type/change-agent",
  slug: "move-pages-under",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "every page of one type carried under the page that page names, in one call",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages carried are derived from what the pages state rather than handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page of the page type handed in is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is carried under the page that page names at the property handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page lands in the folder named under the folder its own page sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a page sits is read from the index rather than from the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a value addresses is looked for once however many pages name it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page carried keeps the slug that page had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file a page keeps beside that page moves with the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming a path that moved is repointed in the same answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating nothing at that property is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal carrying no page says how many were carried and how many passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value listing one page is read as that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value listing more than one page is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is no page type and slug parted by a slash is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value no page answers is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the tree holds no body at is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type named here that is no page type is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page already sitting where that page lands is read over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one call carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no count carries every page this change reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count that is no whole number above nothing is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal at any page refuses the whole call and names that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call that refuses carries no page at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call carrying no page at all is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each carry is left to the mechanical change moving a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here changes the data a page states.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 4096,
} as const satisfies ChangeAgent
