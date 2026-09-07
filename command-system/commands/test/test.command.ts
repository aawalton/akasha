import type { Command } from "../command.page-type.ts"

export const test = {
  id: "01a04ea6-15a3-7000-830d-4cdb1779e81f",
  pageTypeSlug: "command",
  slug: "test",
  definition: "the command running one test file and saying whether its tests passed",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--file-path <path>", takes: "the one test file whose tests run" },
    { said: "--named <text>", takes: "the whole name of the one test that runs" },
  ],
  helpNotes: [
    "--file-path names one test file, and a call naming none is refused.",
    "--file-path given a second time is refused.",
    "--file-path naming a folder is refused.",
    "--file-path naming a file that is no test file is refused.",
    "The checks run every test in this repository.",
    "--named narrows the run to one test inside the file named.",
    "--named matches a whole test name rather than a pattern or a part of one.",
    "--named naming no test runs nothing rather than refusing.",
    "--named carries what the runner said about the test rather than a pointer back here.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run reaches no test outside this repository.",
    },
    {
      invariantKind: "departure",
      statement: "One call runs the tests in one file.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming a second file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming a folder is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming a file that is no test file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a call naming no file names `--file-path`.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal points at the checks for running every test in this repository.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a file that is no test file names the test beside that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The verdict is read from the output the run printed rather than from its exit code alone.",
    },
    {
      invariantKind: "departure",
      statement: "A run reaching no test file has failed rather than passed.",
    },
    {
      invariantKind: "departure",
      statement: "A failing run names each test that failed under the file holding that test.",
    },
    {
      invariantKind: "departure",
      statement: "A test's name is carried without the time the runner printed beside the name.",
    },
    {
      invariantKind: "departure",
      statement: "A run printing no summary carries the tail of the output the runner printed.",
    },
    {
      invariantKind: "departure",
      statement: "A run the runner died on names the signal that killed the runner.",
    },
    {
      invariantKind: "departure",
      statement: "That tail is bounded in lines and in bytes alike.",
    },
    {
      invariantKind: "departure",
      statement: "A whole line goes rather than part of a line.",
    },
    {
      invariantKind: "departure",
      statement: "A run printing no summary names no test.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming a test runs the one test whose whole name that is.",
    },
    {
      invariantKind: "departure",
      statement: "A name is matched whole rather than as a pattern or as a part of a name.",
    },
    {
      invariantKind: "departure",
      statement: "A name is matched inside the file named rather than across this repository.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming a test no test is called runs nothing rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming a test is not weighed against the test file named.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming one test carries the output the runner printed about that test.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run naming no test points at naming a test rather than carrying the output the runner printed.",
    },
    {
      invariantKind: "departure",
      statement: "The output a named run carries is bounded in lines and in bytes alike.",
    },
    {
      invariantKind: "departure",
      statement: "A named run carries the head of the output the runner printed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The runner prints an assertion's expectation on the stream its markers are not on.",
    },
  ],
} as const satisfies Command
