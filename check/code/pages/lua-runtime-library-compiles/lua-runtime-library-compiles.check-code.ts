import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const luaRuntimeLibraryCompiles = {
  id: "01a0d459-d5bc-71c9-b017-1f958fd74948",
  type: "page-type/check-code",
  slug: "lua-runtime-library-compiles",
  definition: "the check refusing a lua runtime library whose configs do not compile",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a lua runtime library's config names is compiled here by that config.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every config beside a library is compiled when a change reaches that library.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change reaches a library through its page, its configs, or a file they name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named file reaches its library whether the change writes it or takes it away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit compiles the configs of every library.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The compiler reads a mirror written out of the bodies the change leaves rather than the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mirror has each file a library's configs name and those configs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name of the akasha package resolves inside the mirror.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A file the named files import that no config names is not in the mirror.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The compiler is the `typescript` package rather than the one typecheck runs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a compiler setting, so a config's own settings bind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An error two configs report is said once, naming both configs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An error naming no file is said against the config that reported it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run the compiler could not finish is unmeasured rather than refusing.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The mirror is swept whatever the compiler said.",
    },
  ],
  check: { maxCpuSeconds: 60 },
  audit: { maxCpuSeconds: 60 },
} as const satisfies CheckCode
