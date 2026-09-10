import type { CodeCheck } from "../../code-check.page-type.ts"

export const specifierNamesAPackage = {
  id: "01a0882d-745e-766d-9fde-17b088d08fbf",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "specifier-names-a-package",
  definition: "the check refusing a specifier that reaches by a package name no manifest states",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The packages are found in the index under every page type descending from `workspace-package`.",
    },
    {
      invariantKind: "departure",
      statement: "A package name is read from the manifest as the change leaves that manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest that is absent or will not parse states no package name.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is read from the parse rather than from the text.",
    },
    {
      invariantKind: "departure",
      statement: "The package a specifier names is its scope and the one segment after that scope.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier opening with no scope names no package judged here.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier whose scope no package name shares is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The scopes judged are read off the package names rather than listed here.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the package the specifier spells and says no manifest states it.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is filed at the body that spells the name.",
    },
    {
      invariantKind: "departure",
      statement: "One name spelled many times in one body is refused once.",
    },
    {
      invariantKind: "departure",
      statement: "A body is parsed only where its text spells a scoped name no manifest states.",
    },
    {
      invariantKind: "departure",
      statement: "The scan deciding whether to parse reads the text rather than the parse.",
    },
    {
      invariantKind: "departure",
      statement: "This check judges on no phase until Alan has approved it.\n",
    },
    {
      invariantKind: "departure",
      statement:
        "Audit is the phase this check is for, as the body that strands is no body a fold carries.\n",
    },
    {
      invariantKind: "absence",
      statement:
        "Whether a name a manifest states resolves through `node_modules` is not read here.",
    },
    {
      invariantKind: "absence",
      statement: "Which way into a package a specifier names is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "A specifier written into a page's prose is not read here.",
    },
    {
      invariantKind: "absence",
      statement: "A package no specifier spells is not judged here.",
    },
    {
      invariantKind: "gap",
      statement: "A specifier spelled with an escape is not found by the scan deciding to parse.",
    },
  ],
  check: { maxCpuSeconds: 10 },
} as const satisfies CodeCheck
