import type { Module } from "@akasha/code-system/module"

export const seatStatedParentRefusal = {
  id: "01a0686d-9d5e-7013-b269-67c3e7b3038a",
  pageTypeSlug: "module",
  slug: "seat-stated-parent-refusal",
  definition: "the refusal a seat start meets when it names the seat above it rather than being it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The seat above a new one is the seat running the call, read from its environment.",
    },
    {
      invariantKind: "departure",
      statement:
        "A parent stated as a flag and a parent stated with an equals sign are both refused.",
    },
  ],
} as const satisfies Module
