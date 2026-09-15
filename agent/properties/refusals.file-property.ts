import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const refusals = {
  id: "01a08164-c068-734a-9643-dbd686a4e3cc",
  type: "page-type/file-property",
  slug: "refusals",
  propertySlug: "refusals",
  definition: "why the landing an agent last tried was refused",
  extensions: ["txt"],
  runsFileLength: false,
  generated: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file has every refusal the last landing this agent tried answered with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One blank line parts two refusals.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run replaces the file rather than appending to the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run refusing nothing takes the file away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file here says the last landing was refused.",
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
