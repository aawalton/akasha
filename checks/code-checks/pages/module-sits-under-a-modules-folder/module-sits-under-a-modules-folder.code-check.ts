import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const moduleSitsUnderAModulesFolder = {
  id: "01a095ee-d67a-7507-8e3e-82b54865302b",
  type: "code-check",
  slug: "module-sits-under-a-modules-folder",
  definition: "the check refusing a module page whose folder sits under no modules folder",
  runsOnChange: false,
  runsOnDeploy: false,
  runsOnWorktree: false,
  runsOnAudit: false,
  experimental: true,
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
    {
      invariantKind: "departure",
      statement: "Alan approved this check in the turn that asked for it.",
    },
    {
      invariantKind: "departure",
      statement: "This check judges at no phase while the folders it refuses are being nested.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every phase returns to true where no module page sits outside a `modules` folder.",
    },
    {
      invariantKind: "departure",
      statement: "`experimental` comes off this page with them.",
    },
  ],
  check: { maxCpuSeconds: 5 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
