import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const manifestLandsOnAFile = {
  id: "01a05d75-de6d-726c-b07d-520ab5bfd098",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "manifest-lands-on-a-file",
  definition: "the check refusing a way into a package that lands where no file is",
  runsOnChange: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A way in names a file the change leaves behind that change.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every manifest the index names is judged whether or not the change has that manifest.",
    },
    {
      invariantKind: "departure",
      statement: "This check catches a file moving away from under a way in.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is filed at the manifest rather than at the file that moved.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the specifier as well as the path.",
    },
    {
      invariantKind: "departure",
      statement: "Which ways in a manifest names is read by `package-manifest`.",
    },
    {
      invariantKind: "absence",
      statement: "A manifest that will not parse names no way in.",
    },
    {
      invariantKind: "absence",
      statement: "A manifest calling its package nothing names no way in.",
    },
    {
      invariantKind: "absence",
      statement: "A key that is not a lone dot and does not open with a dot names no way in.",
    },
    {
      invariantKind: "absence",
      statement: "Whether the file a way in lands on can be parsed is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "A target nested under a condition is no way in this check judges.",
    },
    {
      invariantKind: "absence",
      statement: "A file named by `main` or `bin` is no way in this check judges.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
