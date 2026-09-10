import type { CodeCheck } from "../../code-check.page-type.ts"

export const extensionHostReachesNoBunCode = {
  id: "01a08bad-b6e5-7ef8-a15c-48d03c50fc1c",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "extension-host-reaches-no-bun-code",
  definition: "the check refusing bun code in the graph the editor's node host loads",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
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
      statement: "A type-only import is erased before the editor loads, so nothing follows one.",
    },
    {
      invariantKind: "departure",
      statement: "A file reached only by a type-only import is no part of what the host loads.",
    },
    {
      invariantKind: "departure",
      statement: "A dynamic import is followed, the host loading what that import names.",
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
      statement: "Nothing here judges what the bun server the host starts reaches.",
    },
    {
      invariantKind: "departure",
      statement: "That server is named as a path rather than imported, so no graph reaches it.",
    },
    {
      invariantKind: "departure",
      statement: "Pure data crosses into the host freely, reaching no bun of its own.",
    },
  ],
} as const satisfies CodeCheck
