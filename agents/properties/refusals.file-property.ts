import type { FileProperty } from "@akasha/pages/file-property"

export type Refusals = "txt"

export const refusals = {
  id: "01a08164-c068-734a-9643-dbd686a4e3cc",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "refusals",
  propertySlug: "refusals",
  definition: "why the landing an agent last tried was refused",
  runsFileLength: false,
  generated: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The file has every refusal the last landing this agent tried answered with.",
    },
    {
      invariantKind: "departure",
      statement: "One blank line parts two refusals.",
    },
    {
      invariantKind: "departure",
      statement: "A run replaces the file rather than appending to the file.",
    },
    {
      invariantKind: "departure",
      statement: "A run refusing nothing takes the file away.",
    },
    {
      invariantKind: "departure",
      statement: "A file here says the last landing was refused.",
    },
    {
      invariantKind: "departure",
      statement: "The file is kept outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "The byte ceiling is judged over no file here.",
    },
    {
      invariantKind: "absence",
      statement: "No author writes a line here by hand.",
    },
  ],
} as const satisfies FileProperty
