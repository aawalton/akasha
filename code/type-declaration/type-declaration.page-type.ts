import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const typeDeclaration = {
  id: "01a0605a-98f4-7c54-8030-4fec48465bda",
  type: "page-type/page-type",
  slug: "type-declaration",
  definition: "types a compiler reads and emits nothing from",
  parts: [
    "file-property/ambient-types",
    "number-property/source-version",
    "record-property/generated",
    "text-property/written-by",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/ambient-types", required: true, many: false },
    { pageProperty: "record-property/generated", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type declaration's TypeScript is in a file beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing here is compiled into anything that runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration describing globals states no import at its top level.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A declaration describes code written elsewhere or types shared between our modules.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module states the types that module alone uses.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A package augments a shared interface only where the member's type is not that package's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A member carrying the augmenting package's own type belongs on a subtype that package declares.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "No compiler diagnostic marks a member restated with only its default type argument changed.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
