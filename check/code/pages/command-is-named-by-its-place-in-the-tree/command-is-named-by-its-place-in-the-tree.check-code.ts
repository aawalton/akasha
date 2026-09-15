import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const commandIsNamedByItsPlaceInTheTree = {
  id: "01a08d69-0b2e-7025-abd3-c4abe10799be",
  type: "check-code",
  slug: "command-is-named-by-its-place-in-the-tree",
  definition:
    "the check refusing a command, a namespace or a module misplaced or misnamed in the command tree",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The command tree and the folder tree under `command/` are one tree said twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command and a namespace are judged here rather than every page under a domain.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page above one judged is the page naming it among its parts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page under `command/` is input here though that page is no level of the tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change to a page's parts leaves every page that page names judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page the `command` page type names sits in a folder directly in `command/pages/`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Any other page judged sits in a folder directly inside its parent's own folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder is named for what its page's slug adds to the parent's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose slug opens with anything but its parent's slug is refused for that.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command's slug is its path under `command/pages` with a hyphen for each slash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level's own name is the folder that level sits in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level of the command tree names itself with no name of a level above it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A command or a namespace is named among the parts of a namespace or of the `command` page type.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Whether a namespace names an area worth narrowing by is judged by its writer rather than here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A module under `command/pages` sits under the lowest level every page reaching it sits under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page reaching a module counts at the lowest level that page sits under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the change adds counts among the pages reaching a module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level the change adds is a level of the tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The levels and the modules of the tree are read from the index the change leaves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The files of a module's own folder are what git carries there as the change leaves it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A module reached from two levels with no level above both sits in `command/modules`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A module no page under `command/pages` reaches sits in `command/modules` as well.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A page outside `command/pages` reaching a module is counted by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A change to a body under `command/` leaves every module under `command/pages` judged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page type is named here beyond the command, the namespace and the module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module under `command/` is named among the parts of a page under `command/`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A module under `command/pages` is named among the parts of the command or the namespace beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A module under `command/pages` sits in a folder directly inside the folder of the page naming it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A module's own name is judged by nothing here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A body mentioning or implementing the tree is judged by a syntax rule rather than here.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
