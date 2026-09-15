import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const changeIsReachedThroughARunner = {
  id: "01a09bac-a3ec-74c7-8af0-d1eee1c41021",
  type: "check-code",
  slug: "change-is-reached-through-a-runner",
  definition: "the check refusing an import of a change's code from outside that change",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body naming another change's code is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change reaches another change through a runner rather than through an import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file beside a change naming that change's own code is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The map beside a runner names every change and is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier is read from the parse rather than from the text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is parsed only where its text spells the folder the changes sit under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the specifier the body spells.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal is filed at the body spelling the specifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One body naming several such files is refused once for each.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that is not code is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test reaches a change through a runner rather than by importing that change.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether the code a specifier names is there is not read here.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 20 },
} as const satisfies CheckCode
