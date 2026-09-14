import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const auditRefusals = {
  id: "01a094bd-e107-7176-9d08-3acf8ccb369a",
  type: "file-property",
  slug: "audit-refusals",
  propertySlug: "audit-refusals",
  definition: "what the last audit an agent ran refused",
  extensions: ["txt"],
  runsFileLength: false,
  generated: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file has every refusal the last audit this agent ran answered with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One blank line parts two refusals.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit replaces the file rather than appending to the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit refusing nothing takes the file away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing this agent makes leaves the file as the last audit left it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file is kept outside the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The byte ceiling is judged over no file here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
