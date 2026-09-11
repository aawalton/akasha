import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const noRelativeSpecifier = {
  id: "01a08dcb-ceb8-77ee-8fe5-5b6e6337e648",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-relative-specifier",
  definition: "the check refusing a specifier naming a file by a relative path",
  runsOnChange: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A specifier opening with a dot and a slash is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier climbing to a parent folder is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier spelled from the root package is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier naming a package is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is read from the parse rather than from the text.",
    },
    {
      invariantKind: "departure",
      statement: "A string naming no module is let through.",
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
      statement: "One body spelling several relative paths is refused once for each.",
    },
    {
      invariantKind: "departure",
      statement: "A body is parsed only where its text spells a quote before a dot and a slash.",
    },
    {
      invariantKind: "departure",
      statement: "The scan deciding whether to parse reads the text rather than the parse.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not code is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "The phases this check runs at are settled once no body names a file by a relative path.",
    },
    {
      invariantKind: "absence",
      statement: "Whether the file a specifier names is there is not read here.",
    },
    {
      invariantKind: "absence",
      statement: "No manifest is read here.",
    },
    {
      invariantKind: "absence",
      statement: "A specifier written into a page's prose is not read here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A `./+types/` specifier is resolved by tsconfig rootDirs, so it cannot be spelled from the root.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 20 },
} as const satisfies CodeCheck
