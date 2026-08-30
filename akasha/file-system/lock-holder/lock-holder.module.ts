import type { Module } from "../../code-system/module/module.page-type.ts"

export const lockHolder = {
  id: "01a05231-61c5-7336-8fa7-302f778209a9",
  pageTypeSlug: "module",
  slug: "lock-holder",
  definition: "the process a lock's mark names, and whether it is still the one that took the lock",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A mark names the process that wrote it and the moment that process started, in that order, parted by a space.",
    },
    {
      invariantKind: "departure",
      statement: "A holder is weighed by the moment its process started as well as its number.",
    },
    {
      invariantKind: "departure",
      statement:
        "The moment a process started is read from `/proc`, and a pid nothing is running under answers unknown rather than failing.",
    },
    {
      invariantKind: "departure",
      statement: "An unknown moment on either side leaves the holder weighed by its number alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mark that cannot be read, stands empty, or names no number is answered as no holder, which is an answer rather than a failure to read one.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here takes a lock or releases one, and nothing here knows where a lock stands. What is read is a pid and a mark.",
    },
  ],
} as const satisfies Module
