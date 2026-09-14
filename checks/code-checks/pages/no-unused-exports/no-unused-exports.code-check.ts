import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const noUnusedExports = {
  id: "01a09577-1c6e-70ac-9225-958238aed3c2",
  type: "code-check",
  slug: "no-unused-exports",
  definition: "the check refusing a file exporting a value no other file names",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is reached where another file names that value in an import.",
    },
    {
      invariantKind: "departure",
      statement: "A value named nowhere but inside the file exporting it is reached by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names one export rather than the file the export sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A name exported more than once in a file is judged once.",
    },
    {
      invariantKind: "departure",
      statement: "A file no file imports has every value it exports refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import or import expression taking every name a file exports leaves that file unrefused.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier named by a string constant in the same file is read as that string.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier a local function was handed is read one hop back to what the caller named.",
    },
    {
      invariantKind: "departure",
      statement: "A file exporting every name of another file is judged by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The export a page file is named for is reached by that page being loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A page file is judged for every export beside the one that file is named for.",
    },
    {
      invariantKind: "departure",
      statement: "The files importing one file are read from the index rather than looked for.",
    },
    {
      invariantKind: "gap",
      statement: "A type a file exports is judged by nothing.",
    },
    {
      invariantKind: "gap",
      statement: "A value exported as the default is judged by nothing.",
    },
    {
      invariantKind: "gap",
      statement: "A specifier naming a package rather than a path reads as reaching no file.",
    },
    {
      invariantKind: "gap",
      statement: "A value reached only from files nothing runs reads as reached.",
    },
    {
      invariantKind: "departure",
      statement: "A value its own file never names and only a test names is unreached.",
    },
    {
      invariantKind: "departure",
      statement: "A value its own file names is reached even where only a test imports it.",
    },
    {
      invariantKind: "gap",
      statement: "A value only an unreached value in its own file names reads as reached.",
    },
    {
      invariantKind: "departure",
      statement: "A value a test names in a test-fixtures file is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a test-fixture page is a test-fixtures file.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture's value only a fixture's own test names is unreached.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture another fixture names is reached, and judged on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a value only a test names says so rather than saying nothing does.",
    },
    {
      invariantKind: "gap",
      statement: "A file a page names as the code that page runs is judged as any other file.",
    },
    {
      invariantKind: "gap",
      statement:
        "A change taking away the last import of a value is judged at audit rather than at change.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is judged while this page states `experimental`.",
    },
    {
      invariantKind: "departure",
      statement: "`experimental` comes off this page where Alan has settled what counts as unused.",
    },
    {
      invariantKind: "upkeep",
      statement:
        "A value this check refuses is taken away only where nothing a person reaches goes with it.",
    },
    {
      invariantKind: "departure",
      statement: "Alan settles every removal that would leave a person short of something.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value its own file names elsewhere is refused for the `export` rather than the value.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value no file names at all, the file exporting it included, is refused for the value.",
    },
    {
      invariantKind: "departure",
      statement: "A tag a browser draws itself names no value the file exports.",
    },
    {
      invariantKind: "departure",
      statement: "The value a page's uncommitted body holds is spared.",
    },
    {
      invariantKind: "departure",
      statement: "A name React Router reaches a route module by is spared rather than refused.",
    },
    {
      invariantKind: "gap",
      statement: "A value only a request from outside this repository reaches reads as unreached.",
    },
    {
      invariantKind: "departure",
      statement: "The name a lualib page states as its lua export is reached by the compiler.",
    },
    {
      invariantKind: "departure",
      statement: "The name made from a page's slug is reached in that page's code by its loader.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types name a loader is read from the index rather than listed here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `work` a computed property's code exports is reached by the engine working it.",
    },
    {
      invariantKind: "departure",
      statement: "The `runGuard` a change guard's code exports is reached by the change loader.",
    },
    {
      invariantKind: "departure",
      statement: "The `runService` a service's running code exports is reached by its runner.",
    },
    {
      invariantKind: "departure",
      statement: "The name made from a check's slug is reached in its check code and audit code.",
    },
    {
      invariantKind: "departure",
      statement: "The `mark` a syntax rule's code exports is reached by its loader.",
    },
    {
      invariantKind: "departure",
      statement: "The `HOLDS` a folder shape's code exports is reached by its loader.",
    },
    {
      invariantKind: "departure",
      statement: "The `bodyIn` a group's code exports is reached by the group writing its file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `Drawing` a component group's code exports is reached by whatever draws that page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which groups write a file and which draw a page are read from the index rather than listed here.",
    },
    {
      invariantKind: "departure",
      statement: "The `carriedIn` the carried-file module exports is reached by a container stage.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `activate` and `deactivate` an extension entry exports are reached by the editor.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `rollupNutritionForDay` the nutrition-points module exports is reached by the food command.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `serving` the run-serving module exports is reached by the relay spawning it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `statesLanded` the state-writing module exports is reached by the editor's landing.",
    },
    {
      invariantKind: "departure",
      statement: "The content hash an addon bundle is tagged with is read out of its own body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A spare keyed on a module's slug leaves the export that module's page is named for.",
    },
    {
      invariantKind: "gap",
      statement: "A module states for itself which of its values a runner reaches by path.",
    },
    {
      invariantKind: "departure",
      statement: "A route's code, a root route and an app layout are route modules.",
    },
    {
      invariantKind: "departure",
      statement: "A value a route module exports under another name is judged as any other value.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `routes` a tunnel routes file exports is reached by the tunnel route discovery.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `BUILD_ENV` a manifest's code exports is reached by the deploy building that app.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `measured` a performance's code exports is reached by the command measuring it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `asking` and `keeping` a model test's code exports are reached by its runner.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name made from a model test's slug is reached by the model check compiling it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `generateTypes` and `couldTurn` a type generator exports are reached by landing.",
    },
  ],
  check: { maxCpuSeconds: 30 },
  audit: { maxCpuSeconds: 120 },
  experimental: true,
} as const satisfies CodeCheck
