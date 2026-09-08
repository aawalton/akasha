import type { Module } from "../modules/module.page-type.ts"

export const testBodies = {
  id: "01a08093-d0fd-7000-b952-6be67a9d255b",
  pageTypeSlug: "module",
  slug: "test-bodies",
  definition:
    "serving a change's bodies to a test run in place of the bodies those paths hold on disk",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path the change carries is loaded from the body the change hands over.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change carries resolves whether or not a file is there.",
    },
    {
      invariantKind: "departure",
      statement: "A body served is loaded under the path the change files that body at.",
    },
    {
      invariantKind: "departure",
      statement: "An import inside a served body is read against the folder of that path.",
    },
    {
      invariantKind: "departure",
      statement: "An import inside a served body reaching no served path is left to the runner.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The runner spells a served body's path with a slash before the mark when that body runs.",
    },
    {
      invariantKind: "departure",
      statement: "The mark comes off a served body's path however the runner spelled that path.",
    },
    {
      invariantKind: "departure",
      statement: "An import a served body makes as it runs is read as one written in that body.",
    },
    {
      invariantKind: "constraint",
      statement: "A bare specifier reaching no package the change moves is left to the runner.",
    },
    {
      invariantKind: "departure",
      statement: "A body the change moves is served at the path the runner still resolves to.",
    },
    {
      invariantKind: "departure",
      statement: "An import inside a moved body is spelled against the folder it moves to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier the change's manifest brings is spelled back to the one the runner resolves.",
    },
    {
      invariantKind: "departure",
      statement: "One way in going and one arriving is a move; more than one is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A way in arriving at a file the change does not bring is no move.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change taking one way in away and bringing another unrelated one moves neither.",
    },
    {
      invariantKind: "departure",
      statement:
        "One manifest going and one arriving is a package that moved folder; more than one is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest carried at the path that manifest already sat at is a package edited in place.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest's ways in are read against the folder that manifest sits in.",
    },
    {
      invariantKind: "departure",
      statement: "The ways into a package that moved folder are read from the manifest arriving.",
    },
    {
      invariantKind: "departure",
      statement: "A way in is answered at the path inside the folder that package moved to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A way in a manifest brings where its package stayed put is answered from the change.",
    },
    {
      invariantKind: "departure",
      statement: "A way in the manifest already carried is left to the runner.",
    },
    {
      invariantKind: "departure",
      statement:
        "A way in reaching a file the change does not carry is answered from that file on disk.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The runner matches a hook filtered by specifier only where that specifier carries a dot or a colon.",
    },
    {
      invariantKind: "departure",
      statement:
        "A way in is a module of its own, which the runner matches a bare specifier whole against.",
    },
    {
      invariantKind: "departure",
      statement: "A filter spelling more than the ceiling matches every path instead.",
    },
    {
      invariantKind: "departure",
      statement: "A hook decides for the path handed in rather than trusting its filter.",
    },
    {
      invariantKind: "departure",
      statement: "A body reached by a way in is loaded at the path that way in lands on.",
    },
    {
      invariantKind: "departure",
      statement: "The ways in a serving found reach the run in the preload that serving writes.",
    },
    {
      invariantKind: "departure",
      statement: "An import reaching a path the change takes away is refused.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The runner loads a body handed over as JavaScript, TypeScript or their JSX and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "The form a body is read as follows the extension its path carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body under a form the runner will not load is served as JavaScript answering that body's text.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies are read back out of one file of JSON.",
    },
    {
      invariantKind: "departure",
      statement: "The preload text names a serving and the file the bodies were written to.",
    },
    {
      invariantKind: "departure",
      statement:
        "The serving the preload names is this module's carried body where the change carries one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A carried body the preload names is written beside the preload with its imports spelled absolute.",
    },
    {
      invariantKind: "gap",
      statement:
        "A module the preload reaches beyond this one is read from disk rather than from the change.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a body off the working tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spawns a runner.",
    },
    {
      invariantKind: "departure",
      statement: "A serving writes the bodies and the preload under one folder of its own.",
    },
    {
      invariantKind: "departure",
      statement: "That folder sits under `/var/tmp` rather than `/tmp`.",
    },
    {
      invariantKind: "departure",
      statement: "A serving is swept by the caller that asked for the serving.",
    },
    {
      invariantKind: "departure",
      statement: "A serving that could not be made is swept and reaches no caller.",
    },
    {
      invariantKind: "departure",
      statement: "A body handed in that would not be read names the path it was handed in for.",
    },
    {
      invariantKind: "departure",
      statement: "A test file the change brings and no file is there for is given a shim to run.",
    },
    {
      invariantKind: "departure",
      statement: "A shim imports that test file by the path the change files it at.",
    },
    {
      invariantKind: "departure",
      statement: "A test file already on disk is named to the runner by its own path.",
    },
    {
      invariantKind: "departure",
      statement: "A body served over a file that is there is loaded at that file's own path.",
    },
    {
      invariantKind: "departure",
      statement: "A body loaded at a file's own path answers `import.meta` as that file.",
    },
  ],
} as const satisfies Module
