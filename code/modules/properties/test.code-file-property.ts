import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const test = {
  id: "01a04a2e-7e3e-7000-acbe-3a33ab105ce0",
  type: "code-file-property",
  slug: "test",
  propertySlug: "test",
  definition: "what proves a page's code",
  extensions: ["ts", "tsx"],
  maxCpuSeconds: 5,
  maxMemoryMb: 512,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test proving code written in TSX is written in TSX too.",
    },
    {
      invariantKind: "departure",
      statement: "This ceiling throttles a test file rather than refusing that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test file held under the memory it needs pays the reclaim as its own processor time.",
    },
    {
      invariantKind: "departure",
      statement: "This ceiling is above what a test file loading a parser needs to load it.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing refuses a test file for the memory that file peaks at.",
    },
  ],
  types: "ts",
} as const satisfies CodeFileProperty
