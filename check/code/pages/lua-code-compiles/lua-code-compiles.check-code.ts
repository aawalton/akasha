import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const luaCodeCompiles = {
  id: "01a0d459-d5bc-71c9-b017-1f958fd74948",
  type: "page-type/check-code",
  slug: "lua-code-compiles",
  definition: "the check refusing lua code that does not compile",
  parts: ["module/addon-programs"],
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Lua code here is a lua runtime library or an addon.",
    },
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
      statement: "A library's mirror has each file that library's configs name and those configs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name of the akasha package resolves inside the mirror.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other package resolves to the one the checkout running this installs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A file a library's named files import that no config names is not in the mirror.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A library is compiled by the `typescript` package rather than the one typecheck runs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a setting for a library, so a config's own settings bind.",
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
      statement: "An addon is compiled by the Lua compiler an addon build runs.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The `typescript` package lets through what the Lua compiler refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon is compiled under the settings `addon-compiler-config` writes for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The settings name the mirror as the repository root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The compiler is told to write no Lua, and anything it writes stays in the mirror.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change reaches an addon through its page, its manifest, its bundle entry or the base config.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change reaches an addon through any file that addon's settings include.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change reaches an addon through a file importing the change however far that the settings include.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The files importing a change are worked out as `typecheck` works out the files it judges.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An addon the change does not reach is not compiled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit compiles every addon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The addons a change reaches share one mirror holding each file their programs hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An error two addons report is said once, naming both addons.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An error an addon reports naming no file is said against that addon's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon naming no bundle entry is compiled by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon whose bundle entry is not there is refused against its page.",
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
  check: { maxCpuSeconds: 300 },
  audit: { maxCpuSeconds: 400 },
} as const satisfies CheckCode
