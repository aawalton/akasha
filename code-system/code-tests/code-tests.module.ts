import type { Module } from "../modules/module.page-type.ts"

export const codeTests = {
  id: "01a04eb6-9e5f-7000-9bb8-11bc82309d76",
  pageTypeSlug: "module",
  slug: "code-tests",
  definition:
    "a tree written for a change, the runs made over the tests named, and what those runs said",
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
      statement: "A run's answer carries nothing more.",
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
      statement: "A package the folder of installed modules holds is outside that folder.",
    },
    {
      invariantKind: "gap",
      statement: "A package outside the akasha folder is judged against the copy in the tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file reached through a package specifier and reached by a relative path is one file.",
    },
    {
      invariantKind: "departure",
      statement: "The packages a world answers sit at the world's root.",
    },
    {
      invariantKind: "departure",
      statement: "A world is at no commit.",
    },
    {
      invariantKind: "departure",
      statement: "A question the index answers only against HEAD cannot be answered in a world.",
    },
    {
      invariantKind: "departure",
      statement: "A world is held under `/var/tmp` rather than `/tmp`.",
    },
    {
      invariantKind: "departure",
      statement: "`/tmp` is memory this machine shares.",
    },
    {
      invariantKind: "departure",
      statement: "A tree left in `/tmp` is taken out of `/tmp`.",
    },
    {
      invariantKind: "departure",
      statement: "A world is swept by the caller that asked for the world.",
    },
    {
      invariantKind: "departure",
      statement:
        "A world that could not be made says which reach failed and the fault that reach threw.",
    },
    {
      invariantKind: "departure",
      statement: "That reach is named by the path handed in rather than by the fault alone.",
    },
    {
      invariantKind: "departure",
      statement: "A world that could not be made is swept.",
    },
    {
      invariantKind: "departure",
      statement: "A world that could not be made reaches no caller.",
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
      statement: "Which paths a world is written over is not answered here.",
    },
    {
      invariantKind: "absence",
      statement: "A caller hands in the paths and the bodies.",
    },
    {
      invariantKind: "absence",
      statement: "A world is made of the paths and the bodies alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here installs a package.",
    },
  ],
} as const satisfies Module
