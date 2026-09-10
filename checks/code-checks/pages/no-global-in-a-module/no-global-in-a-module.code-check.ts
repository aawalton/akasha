import type { CodeCheck } from "../../code-check.page-type.ts"

export const noGlobalInAModule = {
  id: "01a061f4-5ea3-75e0-bcb9-903223ba2331",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-global-in-a-module",
  definition: "the check refusing a module body that declares a global",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A global name is declared in a declaration file.",
    },
    {
      invariantKind: "departure",
      statement: "A `declare global` block in a module body is refused at every path.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration file is the destination rather than a second offence.",
    },
    {
      invariantKind: "departure",
      statement: "A block is refused against the line the block opens on.",
    },
    {
      invariantKind: "departure",
      statement: "A file with two blocks is refused twice.",
    },
    {
      invariantKind: "departure",
      statement: "A block inside another declaration is refused like a block at the top.",
    },
    {
      invariantKind: "departure",
      statement: "The check judges only the paths the change has.",
    },
    {
      invariantKind: "departure",
      statement: "The audit judges every module the tree holds.",
    },
    {
      invariantKind: "departure",
      statement: "A module already with a block is refused the next time that module is touched.",
    },
    {
      invariantKind: "absence",
      statement: "No module is kept as permitted.",
    },
    {
      invariantKind: "absence",
      statement: "The check reads no path beyond the ones the change carries.",
    },
    {
      invariantKind: "stopgap",
      statement: "Patch is the only phase Alan approved.",
    },
    {
      invariantKind: "stopgap",
      statement: "Every other phase is off.",
    },
    {
      invariantKind: "gap",
      statement: "No module body declares a global.",
    },
  ],
  check: { maxCpuSeconds: 10 },
} as const satisfies CodeCheck
