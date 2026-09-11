import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const extensionHostReachesNoBunCode = {
  id: "01a08bad-b6e5-7ef8-a15c-48d03c50fc1c",
  type: "code-check",
  slug: "extension-host-reaches-no-bun-code",
  definition: "the check refusing bun code in the graph the editor's node host loads",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the extension's manifest sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "The folder the editor is linked to is read from the page stating `linked-at`.",
    },
    {
      invariantKind: "departure",
      statement: "The graph is read from the entry the extension's manifest names.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming no entry is refused rather than passed.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier naming a package lands where that package's manifest says.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier landing on no file is passed over rather than thrown on.",
    },
    {
      invariantKind: "departure",
      statement: "A type-only import is erased before the editor loads.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing follows a type-only import.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file reached only by a type-only import is no part of the graph the host loads.",
    },
    {
      invariantKind: "departure",
      statement: "A dynamic import is followed.",
    },
    {
      invariantKind: "departure",
      statement: "The host loads whatever a dynamic import names.",
    },
    {
      invariantKind: "departure",
      statement: "A file the host loads that names a bun module is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file the host loads that reads the Bun global is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the files the host reaches the refused file from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whatever the bun server the host starts reaches.",
    },
    {
      invariantKind: "departure",
      statement: "That server is named as a path rather than imported.",
    },
    {
      invariantKind: "departure",
      statement: "No graph reaches that server.",
    },
    {
      invariantKind: "departure",
      statement: "Pure data crosses into the host freely.",
    },
    {
      invariantKind: "departure",
      statement: "Pure data reaches no bun of its own.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
