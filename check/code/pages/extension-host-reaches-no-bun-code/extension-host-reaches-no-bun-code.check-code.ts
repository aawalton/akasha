import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const extensionHostReachesNoBunCode = {
  id: "01a08bad-b6e5-7ef8-a15c-48d03c50fc1c",
  type: "page-type/check-code",
  slug: "extension-host-reaches-no-bun-code",
  definition: "the check refusing bun code in the graph the editor's node host loads",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the extension's manifest sits is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The folder the editor is linked to is read from the page at the checkout root stating `linked-at`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page deeper in the tree states where its own folder is reached rather than the editor's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The graph is read from the entry the extension's manifest names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The graph the host loads is answered by a predicate rather than walked here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest naming no entry is refused rather than passed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A specifier naming a package lands where that package's manifest says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifests placing a package specifier are the ones the index names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A specifier landing on no file is passed over rather than thrown on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type-only import is erased before the editor loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing follows a type-only import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file reached only by a type-only import is no part of the graph the host loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dynamic import is followed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The host loads whatever a dynamic import names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the host loads that names a bun module is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the host loads that reads the Bun global is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the files the host reaches the refused file from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges whatever the bun server the host starts reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That server is named as a path rather than imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No graph reaches that server.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pure data crosses into the host freely.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pure data reaches no bun of its own.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
