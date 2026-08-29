import type { Check } from "../check.page-type.ts"

export const noSecondSpelling = {
  id: "01a04e8a-0976-707d-b594-703a3dd46e82",
  pageTypeSlug: "check",
  slug: "no-second-spelling",
  definition: "the check refusing a function that says again what a module already exports",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A rule held in one place stays in one place only while nothing spells it again, and an extraction that nothing guards is undone by the next writer who does not know of it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two functions say the same thing when their shape matches once each bound name is read as the order it was bound, so renaming the function, its parameters or its locals hides nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule is owned by the module that exports it, because a module is the code a file is meant to reach for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A module's own private helper owns nothing, so what a module keeps to itself binds no other file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The modules that stand are read from the index, and their code is read as the change would leave it.",
    },
    {
      invariantKind: "absence",
      statement:
        "No rule is too small to own. The smallest a module exports is as short as the idiom every check is written in, so a floor below which respelling is allowed would silence the owner, not the noise.",
    },
    {
      invariantKind: "absence",
      statement:
        "Only a function is read. A rule spelled inline, as an expression bound to nothing, is not seen here at all.",
    },
    {
      invariantKind: "absence",
      statement:
        "Only a renaming is defeated. The same rule written to a different shape — a loop for a call, statements reordered — passes, so this ratchets against drift and proves no absence.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only the paths the change carries are judged, so this holds the count from rising and does not go looking for what already stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "The whole tree carries no second spelling, so every phase reads it and a respelling standing anywhere is refused rather than only one arriving.",
    },
  ],
} as const satisfies Check
