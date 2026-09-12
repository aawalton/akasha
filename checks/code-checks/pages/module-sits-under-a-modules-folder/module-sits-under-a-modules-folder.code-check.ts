import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const moduleSitsUnderAModulesFolder = {
  id: "01a095ee-d67a-7507-8e3e-82b54865302b",
  type: "code-check",
  slug: "module-sits-under-a-modules-folder",
  definition: "the check refusing a module page whose folder sits under no modules folder",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A module's folder sits under a folder named `modules`.",
    },
    {
      invariantKind: "departure",
      statement: "That folder sits beside the page the module is a part of.",
    },
    {
      invariantKind: "departure",
      statement: "A module under a folder beneath that one is under it all the same.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `.server` is a modules folder too.",
    },
    {
      invariantKind: "departure",
      statement: "Where a module sits is read from its path rather than from its body.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a module page is no module page.",
    },
    {
      invariantKind: "departure",
      statement: "A page of any other type is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away is let through.",
    },
    {
      invariantKind: "absence",
      statement: "No page body is read here.",
    },
    {
      invariantKind: "absence",
      statement: "The index is not read here.",
    },
  ],
  check: { maxCpuSeconds: 5 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
