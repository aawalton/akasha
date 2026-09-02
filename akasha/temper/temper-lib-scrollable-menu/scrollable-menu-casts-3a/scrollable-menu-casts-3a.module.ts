import type { Module } from "@akasha/code-system/module"

export const scrollableMenuCasts3a = {
  id: "01a06275-c444-769d-a238-060e94512654",
  pageTypeSlug: "module",
  slug: "scrollable-menu-casts-3a",
  definition:
    "the narrowing helpers for shapes named from RunItemCallback through ControlUnknownAlt",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each helper performs a bare TypeScript cast and returns the value unchanged.",
    },
    {
      invariantKind: "absence",
      statement: "The cast is not guarded by any runtime check.",
    },
    {
      invariantKind: "departure",
      statement: "Function signatures name the receiver parameter as void or unknown.",
    },
    {
      invariantKind: "constraint",
      statement: "Membership of this half is decided by the alphabetical name of the target type.",
    },
  ],
} as const satisfies Module
