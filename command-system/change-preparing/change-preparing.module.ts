import type { Module } from "@akasha/code/module"

export const changePreparing = {
  id: "01a0818a-874f-79bb-a981-3f70b61d6b09",
  pageTypeSlug: "module",
  slug: "change-preparing",
  definition: "the change the gate is judged over, worked out from the change a call asked for",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body of a kind the formatter owns is formatted before the gate sees the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body handed in as the fold already formatted it is not formatted again.",
    },
    {
      invariantKind: "departure",
      statement: "A body that moved since the fold formatted it is formatted again.",
    },
    {
      invariantKind: "departure",
      statement: "A body of any other kind reaches the gate as the caller handed the body in.",
    },
    {
      invariantKind: "departure",
      statement: "A removal is never formatted.",
    },
    {
      invariantKind: "departure",
      statement:
        "Formatting a body leaves every other thing the change says about that path unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A change with a package manifest has the lockfile those manifests warrant.",
    },
    {
      invariantKind: "departure",
      statement: "The lockfile is made again before the gate sees the change.",
    },
    {
      invariantKind: "departure",
      statement: "A lockfile that could not be made is said rather than refusing the change.",
    },
    {
      invariantKind: "departure",
      statement:
        "Formatting and the lockfile and the worked type are worked out before the hold is taken.",
    },
    {
      invariantKind: "departure",
      statement: "The address map is worked out before the hold is taken alongside those three.",
    },
    {
      invariantKind: "departure",
      statement: "The spacing steps are worked out before the hold is taken alongside those four.",
    },
    {
      invariantKind: "departure",
      statement: "The source globs are worked out before the hold is taken alongside those five.",
    },
    {
      invariantKind: "departure",
      statement: "The written types are worked out before the hold is taken alongside those six.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type's generator writes for every page of that page type on the one landing.",
    },
    {
      invariantKind: "departure",
      statement: "A generator that is not there is said here rather than refusing the landing.",
    },
    {
      invariantKind: "departure",
      statement: "Every road that lands works those seven out through one step here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The worked type, the address map and the spacing steps are worked out over one change.",
    },
    {
      invariantKind: "departure",
      statement: "That change is built from the base commit this call was handed.",
    },
    {
      invariantKind: "departure",
      statement: "That change has the paths a move renames as well as the paths an edit writes.",
    },
    {
      invariantKind: "departure",
      statement:
        "That change is answered alongside the edits, so the gate is judged over that same change.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change the lockfile or a generated file was added to is answered as no change to judge over.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose slug names no export refuses the change with that page.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is made where the change is prepared rather than among the checks.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every road that lands is held to that refusal, including a change kind running no check.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file or takes the hold.",
    },
  ],
} as const satisfies Module
