import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyShaping = {
  id: "01a091e7-e2ef-7749-b938-fe724b6673e5",
  type: "page-type/module",
  slug: "property-shaping",
  definition: "the shape each page property declares, read from beside that property's page type",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every shape the pages declare is read from the file beside that property's kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shapes a change leaves are composed here rather than read after it lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind no page the change carries touches is not composed again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page property the change takes away is dropped before the change's own are set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type the change itself carries is found among the change's pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape whose page type sits nowhere is answered, and its file is not written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of one of those kinds stating no property slug carries no shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape is keyed by the page type a property is and then that property's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the property's page states nothing under is carried as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first value a property is filed under answers for that property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every shape is read once for a reading and held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name saying a page type is answered by that key alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name saying a page type reads the shapes filed under that page type alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name saying no page type is answered by the one shape carrying that slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug more than one shape carries is refused and must name its page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no shape carries is refused rather than answered as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name reaching a page by id is refused, a property being named by its slug.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file for one property alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lists a directory.",
    },
  ],
} as const satisfies Module
