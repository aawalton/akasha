import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const changeIsReachedThroughARunner = {
  id: "01a09bac-a3ec-74c7-8af0-d1eee1c41021",
  type: "code-check",
  slug: "change-is-reached-through-a-runner",
  definition: "the check refusing an import of a change's code from outside that change",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body naming another change's code is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A change reaches another change through a runner rather than through an import.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a change naming that change's own code is let through.",
    },
    {
      invariantKind: "departure",
      statement: "The map beside a runner names every change and is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is read from the parse rather than from the text.",
    },
    {
      invariantKind: "departure",
      statement: "A body is parsed only where its text spells the folder the changes sit under.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the specifier the body spells.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is filed at the body spelling the specifier.",
    },
    {
      invariantKind: "departure",
      statement: "One body naming several such files is refused once for each.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not code is passed over.",
    },
    {
      invariantKind: "stopgap",
      statement: "A test or a test's fixtures naming a change's code is let through.",
    },
    {
      invariantKind: "gap",
      statement: "A test reaches a change through a runner rather than by importing that change.",
    },
    {
      invariantKind: "absence",
      statement: "Whether the code a specifier names is there is not read here.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 20 },
} as const satisfies CodeCheck
