import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noGlobalInAModule = {
  id: "01a061f4-5ea3-75e0-bcb9-903223ba2331",
  type: "check-code",
  slug: "no-global-in-a-module",
  definition: "the check refusing a module body that declares a global",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A global name is declared in a declaration file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `declare global` block in a module body is refused at every path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration file is the destination rather than a second offence.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A block is refused against the line the block opens on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file with two blocks is refused twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A block inside another declaration is refused like a block at the top.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The check judges only the paths the change has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The audit judges every module the tree holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module already with a block is refused the next time that module is touched.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No module is kept as permitted.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The check reads no path beyond the ones the change carries.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
