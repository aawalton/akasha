import type { Check } from "../check.page-type.ts"

export const noTmp = {
  id: "01a04ecb-5cd1-7000-8159-83b7e93d72b9",
  pageTypeSlug: "check",
  slug: "no-tmp",
  definition: "the check refusing a reach for /tmp, where no scratch of ours stands",
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
        "`tmpdir` is refused where it is taken from `node:os`, because what it answers is the machine's to say, and here it says /tmp.",
    },
    {
      invariantKind: "departure",
      statement:
        "A literal is judged by the value it carries, never by the text around it, so a sentence naming /tmp is prose and not a path.",
    },
    {
      invariantKind: "departure",
      statement:
        "A template is judged by its head alone, since what a substitution will put there is not known.",
    },
    {
      invariantKind: "departure",
      statement: "A path is matched from its first character, so /var/tmp is never read as /tmp.",
    },
    {
      invariantKind: "absence",
      statement:
        "No use of /tmp is kept as permitted, because a run wanting scratch has /var/tmp to make it in.",
    },
    {
      invariantKind: "gap",
      statement:
        "A reach for /tmp through a variable, an environment read, or a re-export is not seen.",
    },
  ],
} as const satisfies Check
