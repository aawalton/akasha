import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const workTreeAssigning = {
  id: "01a0a582-5ba1-718f-b298-f2395686421a",
  type: "module",
  slug: "work-tree-assigning",
  definition:
    "the initiative Alan assigns in the work tree named to the command and to the panel holding it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An initiative is assigned from the menu the editor draws over that row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An initiative row is offered the assign item the manifest hangs on the work view.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No row that is no initiative is offered that item.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row's initiative is read off that row by the module deleting an initiative.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row that is no initiative assigns nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether that seat takes the initiative is settled by the command rather than here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The seat an initiative goes to is named by the module naming that seat off the slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "That seat is named here for the panel to hold the initiative in that seat's color.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel is told an initiative is being assigned before the command is called.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel is told the landing answered once the command answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel is told the initiative stayed where the command is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refusal saying that seat answers to that initiative already is told that same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel's watch is handed in rather than imported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether that seat is available is settled by the command rather than here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The command's first line is shown to Alan, and every line is written to the channel.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An assignment that failed is said to Alan once and written to the panel's channel.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An assignment waits the ceiling the harness names rather than a ceiling named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The editor is handed in rather than imported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The harness call is handed in rather than imported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The command asked is named by reading the slug off that command's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refusal saying a body moved between the read and the write is said to Alan as one sentence.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal is known by the module knowing a drop's refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other refusal reaches Alan in the words that refusal was made in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Alan is not asked to confirm before an initiative is assigned.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a seat's page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here draws a row.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a color or reads the fleet.",
    },
  ],
} as const satisfies Module
