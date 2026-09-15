import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const clearings = {
  id: "01a09c42-2954-7ac4-b9bf-76a533d55823",
  type: "page-type/file-property",
  slug: "clearings",
  propertySlug: "clearings",
  definition: "the contexts a hook cleared, one line for each",
  extensions: ["jsonl"],
  runsFileLength: false,
  generated: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One line has one clearing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line names the agent cleared, or says none was named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line is appended rather than written over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
