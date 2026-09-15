import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const importRepointing = {
  id: "01a09b9b-449c-7564-9db1-2276ced91221",
  type: "module",
  slug: "import-repointing",
  definition: "a body rewritten so the paths it names follow the files that moved",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body names the generated declarations of that body by that body's folder and name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name with no leading dot lands against the folder of the body naming that name.",
    },
    {
      invariantKind: "departure",
      statement: "Such a name reading the same from where the body lands is left as it is spelled.",
    },
    {
      invariantKind: "departure",
      statement: "The paths that moved arrive as a plain object rather than as a map.",
    },
    {
      invariantKind: "departure",
      statement: "The map read off that object is kept against the object it was read off.",
    },
    {
      invariantKind: "departure",
      statement: "One caller repointing many bodies hands the same object down and reads it once.",
    },
    {
      invariantKind: "departure",
      statement: "A caller hands in the paths that moved or the folder that moved.",
    },
    {
      invariantKind: "departure",
      statement: "A caller handing in the folder states the folder it was and the folder it is.",
    },
    {
      invariantKind: "departure",
      statement: "A caller handing in both is read as having handed in the folder.",
    },
    {
      invariantKind: "departure",
      statement: "Where a path lands is one question asked the same way whichever was handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming the folder that moved, or a path under it, follows that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A name with no separator is a name rather than a path naming that folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run that is a path this repository has names that path rather than an ending of it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a path is one this repository has is asked of the world one path at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A world answering that nowhere reads every ending rather than stopping at one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier naming a package other than the root is left as it is whatever moved.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name opening with the root package spells a path from the root and follows what moved.",
    },
    {
      invariantKind: "departure",
      statement: "A way in is repointed at the file.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is respelled only where the path that specifier spells moved.",
    },
    {
      invariantKind: "absence",
      statement: "No manifest is read here.",
    },
    {
      invariantKind: "departure",
      statement: "The body is read from the path that body sits at once the caller has carried it.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text names no path.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not code is read as the runs of path characters that body holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading of such a run that is a whole path that moved takes the path that path landed at.",
    },
    {
      invariantKind: "departure",
      statement: "The rest of the run around that reading is left as the body spells it.",
    },
    {
      invariantKind: "departure",
      statement: "A name or a run closing on a separator closes on it once it is respelled.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run relative to the body landing on a path that moved is respelled from where the body sits.",
    },
    {
      invariantKind: "departure",
      statement: "A relative run is read that one way rather than by any shorter reading of it.",
    },
    {
      invariantKind: "absence",
      statement:
        "A run matching a path that moved only by an ending several such paths share is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which of those paths such a run names is unanswerable, and answering it would name one silently.",
    },
    {
      invariantKind: "gap",
      statement:
        "A relative run in a body that moved is respelled where that run names a path outside what moved.",
    },
    {
      invariantKind: "gap",
      statement:
        "A body that moved deeper climbs the right number of levels in every run it holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path a body builds off the folder that body sits in follows what moved, as a name does.",
    },
    {
      invariantKind: "departure",
      statement:
        "Such a path built out of anything but written letters refuses the change and is named.",
    },
    {
      invariantKind: "departure",
      statement: "Two rewrites of the same letters spelling one body are taken as one rewrite.",
    },
    {
      invariantKind: "departure",
      statement: "Two rewrites of the same letters spelling two bodies refuse the change.",
    },
    {
      invariantKind: "departure",
      statement: "A name opening with the root package is never respelled against a folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A string in code that is no path of its own is read as the runs that string holds.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is read as a whole path or as nothing rather than as runs.",
    },
    {
      invariantKind: "departure",
      statement: "A change wanting these edits reads them here rather than from another change.",
    },
  ],
} as const satisfies Module
