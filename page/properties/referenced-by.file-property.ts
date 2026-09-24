import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const referencedBy = {
  id: "01a0a2e9-c513-7eed-aa47-3b272814218c",
  type: "page-type/file-property",
  slug: "referenced-by",
  propertySlug: "referenced-by",
  definition: "what names this page or imports a file beside it, one line to a reference",
  extensions: ["jsonl"],
  generated: true,
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line says where the reference comes from and what it comes through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reference through a page property comes through that property's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import comes through the slug `import`, which no page property holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line for an import says whether that import names only a type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line for an import says whether that import is followed only later.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reference to a file beside the page says that file's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reference to the page itself says no file name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line naming this page through a property carries the naming page's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines are sorted, so one reference that changes moves one line.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A page nothing references has no file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An import is referenced by the path a specifier reaches rather than by the specifier.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
