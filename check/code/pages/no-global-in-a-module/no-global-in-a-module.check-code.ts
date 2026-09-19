import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noGlobalInAModule = {
  id: "01a061f4-5ea3-75e0-bcb9-903223ba2331",
  type: "page-type/check-code",
  slug: "no-global-in-a-module",
  definition: "the check refusing a module body that declares a global",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A global name is declared in a declaration file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `declare global` block in a module body is refused at every path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration file is the destination rather than a second offence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block is refused against the line the block opens on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file with two blocks is refused twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block inside another declaration is refused like a block at the top.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The check judges only the paths the change has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The audit judges every module the tree holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module already with a block is refused the next time that module is touched.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No module is kept as permitted.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The check reads no path beyond the ones the change carries.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 60 },
} as const satisfies CheckCode
