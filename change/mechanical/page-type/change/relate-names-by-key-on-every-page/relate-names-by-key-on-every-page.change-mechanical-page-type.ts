import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const relateNamesByKeyOnEveryPage = {
  id: "01a18433-10c1-7787-9eca-bd1763c30242",
  type: "page-type/change-mechanical-page-type",
  slug: "relate-names-by-key-on-every-page",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "a name written anew as the page listing it under a key, on every page of a page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a name reaches is the page of the target stating that name under `by`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target page states one name or a list of names under `by`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The target is handed in rather than read off what the key declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is looked up with the space around it trimmed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name two target pages state under `by` refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name no target page states refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That refusal names every such name once, in the order they sort in, with one page holding it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value already the address of a target page is kept as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Names that reach one page are written as that page once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The addresses a page holds come out in the order they sort in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose values come out as they are is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type no page of which holds a name to write is answered as no edit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No property declaration is written.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No entry beside a page is written.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
  createdAt: "2026-10-28T20:28:21.567Z",
  updatedAt: "2026-10-28T20:28:21.567Z",
} as const satisfies ChangeMechanicalPageType
