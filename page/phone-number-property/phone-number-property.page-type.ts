import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const phoneNumberProperty = {
  id: "01a053e9-5cd1-7137-9fbb-c33920c95575",
  type: "page-type",
  slug: "phone-number-property",
  definition: "a page property with a telephone number",
  extends: ["page-type/page-property"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number is written in E.164.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number opens with `+`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number has digits alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number has its own country calling code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number reaching fifteen digits is the longest there is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number states no max.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
