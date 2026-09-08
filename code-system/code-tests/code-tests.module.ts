import type { Module } from "../modules/module.page-type.ts"

export const codeTests = {
  id: "01a04eb6-9e5f-7000-9bb8-11bc82309d76",
  pageTypeSlug: "module",
  slug: "code-tests",
  definition: "the runs made over the tests a change names, and what those runs said",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run's answer carries the code the run exited.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries the signal the run died on where a signal ended the run.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries the output the run printed.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries the summary read out of the output the run printed.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries the verdict that follows.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries the processor seconds every batch of that run spent.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries the files that spent more than one file may.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "One test file may spend five processor seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A batch is given the seconds the files that batch holds may spend together.",
    },
    {
      invariantKind: "departure",
      statement: "A batch reaching that budget is ended by the kernel rather than run to its end.",
    },
    {
      invariantKind: "departure",
      statement: "A run spending more than the files it named may is judged file by file.",
    },
    {
      invariantKind: "departure",
      statement: "A run whose batch died on a signal is judged file by file as well.",
    },
    {
      invariantKind: "departure",
      statement: "That second judging runs each file the first run named on its own.",
    },
    {
      invariantKind: "departure",
      statement: "Each file in that judging is given the ceiling one file may spend.",
    },
    {
      invariantKind: "departure",
      statement: "A file the kernel ended there is over the ceiling whatever that file spent.",
    },
    {
      invariantKind: "departure",
      statement: "The seconds answered for such a file are the seconds before the kernel ended it.",
    },
    {
      invariantKind: "departure",
      statement: "A file is bounded together with every process that file starts.",
    },
    {
      invariantKind: "departure",
      statement: "A file spending its seconds in the commands it runs is bounded like any other.",
    },
    {
      invariantKind: "gap",
      statement: "A machine bounding no run judges a file by the seconds that run answers.",
    },
    {
      invariantKind: "departure",
      statement: "The ceiling that judging holds each file to is the caller's to state.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller stating no ceiling holds each file to the five seconds one file may spend.",
    },
    {
      invariantKind: "departure",
      statement: "A file over the ceiling is answered by name beside the seconds that file spent.",
    },
    {
      invariantKind: "departure",
      statement: "A run holding a file over the ceiling is slow.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run that failed or fell short or crashed is answered as that rather than as slow.",
    },
    {
      invariantKind: "departure",
      statement: "A run judged anything but clean is judged file by file for no ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "Every caller reads one answer rather than repeating how the answer is read.",
    },
    {
      invariantKind: "departure",
      statement: "Each test file is grouped by the nearest bunfig.toml above that file.",
    },
    {
      invariantKind: "departure",
      statement: "The preloads that file names are handed to the run of that group alone.",
    },
    {
      invariantKind: "departure",
      statement: "A preload named by a path is read against the folder holding its bunfig.toml.",
    },
    {
      invariantKind: "departure",
      statement: "The bunfig.toml at the root is left out of the preloads handed over.",
    },
    {
      invariantKind: "departure",
      statement: "The runner reads the root bunfig.toml from the folder the runner runs in.",
    },
    {
      invariantKind: "departure",
      statement: "A group is run in batches.",
    },
    {
      invariantKind: "departure",
      statement: "A batch is one run.",
    },
    {
      invariantKind: "departure",
      statement: "A batch holds the test files of one group alone.",
    },
    {
      invariantKind: "departure",
      statement: "A batch is bounded so one run reaches the end of every batch.",
    },
    {
      invariantKind: "departure",
      statement: "The output every batch printed is read as one answer.",
    },
    {
      invariantKind: "departure",
      statement: "A run answers the first non-zero code a batch exited.",
    },
    {
      invariantKind: "departure",
      statement: "A batch that died on a signal answers that signal and that batch's code instead.",
    },
    {
      invariantKind: "departure",
      statement: "The first batch to die on a signal is the batch answered.",
    },
    {
      invariantKind: "departure",
      statement: "The batches after a batch that died still run.",
    },
    {
      invariantKind: "departure",
      statement: "A group is answered in the order of the first path the group holds.",
    },
    {
      invariantKind: "departure",
      statement: "A path named twice over is run once.",
    },
    {
      invariantKind: "departure",
      statement: "A run marks the child the run spawns.",
    },
    {
      invariantKind: "departure",
      statement: "A test reaching for this stops where the mark says a run is already going.",
    },
    {
      invariantKind: "departure",
      statement: "A run printing no summary is a crash whatever the run exited.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run reaching fewer files than are under the paths named is short rather than a pass.",
    },
    {
      invariantKind: "departure",
      statement: "The folder of installed modules holds no test of this repository's.",
    },
    {
      invariantKind: "departure",
      statement: "The git folder holds no test of this repository's.",
    },
    {
      invariantKind: "departure",
      statement: "Color is taken out before the summary is read.",
    },
    {
      invariantKind: "departure",
      statement:
        "The test sitting beside a file is named by the same rule that names any file beside a page.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding one page property is answered with the tests beside that page.",
    },
    {
      invariantKind: "departure",
      statement: "A test is written in `.ts` or in `.tsx`.",
    },
    {
      invariantKind: "departure",
      statement: "A file is answered with every test that could sit beside the file.",
    },
    {
      invariantKind: "departure",
      statement: "Which test does sit beside the file is settled by the caller that asked.",
    },
    {
      invariantKind: "departure",
      statement: "A run is handed the serving of a change's bodies or nothing at all.",
    },
    {
      invariantKind: "departure",
      statement: "A serving reaches the runner as one more preload.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is named to the runner by the path its serving hands over.",
    },
    {
      invariantKind: "departure",
      statement: "A test file no serving hands a path over for is named by its own path.",
    },
    {
      invariantKind: "departure",
      statement: "A run is named by path.",
    },
    {
      invariantKind: "departure",
      statement: "A run given a name is named by that test's whole name too.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaches the runner escaped and anchored.",
    },
    {
      invariantKind: "departure",
      statement: "A run whose name matched no test is read as no tests rather than as a crash.",
    },
    {
      invariantKind: "absence",
      statement: "The runner chooses the rest.",
    },
    {
      invariantKind: "absence",
      statement: "How a run is reported is not answered here.",
    },
    {
      invariantKind: "absence",
      statement: "The output printed belongs to the caller that asked for the run.",
    },
    {
      invariantKind: "absence",
      statement:
        "How much of the output printed a caller may hold belongs to the caller that asked for the run.",
    },
    {
      invariantKind: "absence",
      statement: "The words a refusal says belong to the caller that asked for the run.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a tree for a run to read.",
    },
  ],
} as const satisfies Module
