import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const cpuKind = {
  id: "01a09185-edee-760c-88ee-bd4e0bbbcef7",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "cpu-kind",
  definition: "one measure a reading of a processor is taken in",
  pluralSlug: "cpu-kinds",
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading of a processor is in one kind.",
    },
    {
      invariantKind: "departure",
      statement: "A number in one kind answers no question asked in another.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling states the kind that ceiling is read in.",
    },
    {
      invariantKind: "departure",
      statement: "A reading over more than one processor states how many processors it is over.",
    },
    {
      invariantKind: "departure",
      statement: "A kind the kernel has no file for is no kind.",
    },
  ],
  types: "ts",
} as const satisfies PageType
