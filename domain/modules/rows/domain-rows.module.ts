import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domainRows = {
  id: "01a04e9f-4572-74d2-b19a-9fd2f81583eb",
  type: "page-type/module",
  slug: "domain-rows",
  definition: "every domain the domains panel draws, its champion, its parent, and their order",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page of every page type sitting under `domain` is drawn rather than a `domain` page alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which page types sit under `domain` is read from beside each page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is answered under its address rather than its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two page types may each have a page of one slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part edge is read off the page naming the part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The parts a page names are read off the value the index has for that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part naming no page drawn here makes no edge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page under other than one parent is answered as under no parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An order is the parts a page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The parts keep the order that page names the parts in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain answers with the persona championing that domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The champion edge is read backwards off the persona rather than off the domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona's own slug is read off her file name rather than out of her page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain two personas champion answers with the first persona by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A domain no persona champions answers with no champion rather than an empty champion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge sits beside a page without the place the edge was stated in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which personas champion a page is read only where a persona could.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page a persona could be naming is a page whose address or whose slug that persona states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A slug two page types each have widens the pages asked about rather than narrowing the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The path a drawn domain carries reaches the panel under the name `relPath`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is opened for the parts that page names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is opened for the order those parts keep.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the pages line by line.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Every page answered is a page the index named first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader here takes the repository root or a reading of the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gathering what each page states is apart from working the domains out from it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gathered row holds what one page states and nothing read across pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every question one call asks is asked of one reading.",
    },
  ],
} as const satisfies Module
