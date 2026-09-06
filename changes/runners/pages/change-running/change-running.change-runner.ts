import type { ChangeRunner } from "../../change-runner.page-type.ts"

export const changeRunning = {
  id: "01a077c9-cb05-7a92-a69e-7d25da444d7e",
  pageTypeSlug: "change-runner",
  slug: "change-running",
  definition: "the runner loading a change from its address and running the guards it names",
  code: "ts",
  test: "ts",
  addressed: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An address is the page type and the slug the change is filed under.",
    },
    {
      invariantKind: "departure",
      statement: "The page at an address is read off the index rather than found by a walk.",
    },
    {
      invariantKind: "departure",
      statement: "A change's code is beside its page under the key its page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "Every change exports its run under one name.",
    },
    {
      invariantKind: "departure",
      statement: "A guard is loaded by the slug the change's page names.",
    },
    {
      invariantKind: "departure",
      statement: "A guard runs over the answer of the change naming that guard.",
    },
    {
      invariantKind: "departure",
      statement: "An answer already refused runs no guard.",
    },
    {
      invariantKind: "departure",
      statement: "An address reaching no page is refused rather than answered with no edits.",
    },
    {
      invariantKind: "departure",
      statement: "An address written in code is held to the arguments the map states.",
    },
    {
      invariantKind: "departure",
      statement: "An address worked out while a command runs is held to the change's refusals.",
    },
    {
      invariantKind: "departure",
      statement: "Loading a change and running that change are two acts.",
    },
    {
      invariantKind: "departure",
      statement:
        "Loading reaches the disk and running reaches nothing outside the world handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A caller holding a lock over a store loads before the lock is taken.",
    },
    {
      invariantKind: "departure",
      statement: "The guards are loaded alongside the change rather than after the change answers.",
    },
    {
      invariantKind: "absence",
      statement: "No change is imported here.",
    },
    {
      invariantKind: "gap",
      statement:
        "A change whose code throws while loading refuses the run rather than the landing.",
    },
  ],
} as const satisfies ChangeRunner
