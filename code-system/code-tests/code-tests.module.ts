import type { Module } from "../modules/module.page-type.ts"

export const codeTests = {
  id: "01a04eb6-9e5f-7000-9bb8-11bc82309d76",
  pageTypeSlug: "module",
  slug: "code-tests",
  definition:
    "standing a change up as a tree of its own, running the tests in it, and reading what the run said",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run's answer carries what the run exited.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries what the run printed.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries the summary read out of what the run printed.",
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
      statement: "What that file preloads is handed to the run of that group alone.",
    },
    {
      invariantKind: "departure",
      statement: "A preload named by a path is read against the folder holding its bunfig.toml.",
    },
    {
      invariantKind: "departure",
      statement: "The bunfig.toml at the root is left out of what is handed over.",
    },
    {
      invariantKind: "departure",
      statement: "The runner reads that one from the folder the runner runs in.",
    },
    {
      invariantKind: "departure",
      statement: "A group is one run.",
    },
    {
      invariantKind: "departure",
      statement: "What every run printed is read as one answer.",
    },
    {
      invariantKind: "departure",
      statement: "A run answers the first non-zero code a group exited.",
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
        "A run reaching fewer files than stand under what was named is short rather than a pass.",
    },
    {
      invariantKind: "departure",
      statement: "Color is taken out before the summary is read.",
    },
    {
      invariantKind: "departure",
      statement:
        "The test standing beside a file is named by the same rule that names any file beside a page.",
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
      statement: "Which test does sit beside the file is settled by whoever asked.",
    },
    {
      invariantKind: "departure",
      statement:
        "A world is written out of bodies handed in rather than read off the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "A world carries the index the change leaves rather than the tree's own.",
    },
    {
      invariantKind: "departure",
      statement: "A world's index starts as a copy of the tree's index.",
    },
    {
      invariantKind: "departure",
      statement: "What the change files is written over that copy.",
    },
    {
      invariantKind: "departure",
      statement: "What the change files is written by the rule a landing files by.",
    },
    {
      invariantKind: "departure",
      statement: "A world asked for no index carries no index.",
    },
    {
      invariantKind: "departure",
      statement: "A world borrows what a run is configured by from that tree.",
    },
    {
      invariantKind: "departure",
      statement: "A world borrows a link to each module the world does not hold.",
    },
    {
      invariantKind: "departure",
      statement: "A world borrows nothing else from that tree.",
    },
    {
      invariantKind: "departure",
      statement: "What is borrowed is skipped where what is borrowed is not there.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package a specifier names is answered from the world where the world holds that package.",
    },
    {
      invariantKind: "departure",
      statement: "The world holds a package where the world holds that package's manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A package standing outside the akasha folder is answered from that tree.",
    },
    {
      invariantKind: "departure",
      statement: "No world is written over a path outside the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package inside the akasha folder the world does not hold is answered by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A package the folder of installed modules holds stands outside that folder.",
    },
    {
      invariantKind: "gap",
      statement:
        "A package outside the akasha folder is judged against the copy standing in the tree.",
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
      statement: "A world stands at no commit.",
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
      statement: "A world is swept by whoever asked for the world.",
    },
    {
      invariantKind: "departure",
      statement: "A world that could not be made says which reach failed and what that reach said.",
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
      statement: "A world that could not be made was given to no one else to sweep.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which tests inside a file run.",
    },
    {
      invariantKind: "absence",
      statement: "A run is named by path.",
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
      statement: "What is printed belongs to whoever asked for the run.",
    },
    {
      invariantKind: "absence",
      statement:
        "How much of what is printed a caller may hold belongs to whoever asked for the run.",
    },
    {
      invariantKind: "absence",
      statement: "What a refusal says belongs to whoever asked for the run.",
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
      statement: "A world is only what is made of the paths and the bodies.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here installs a package.",
    },
  ],
} as const satisfies Module
