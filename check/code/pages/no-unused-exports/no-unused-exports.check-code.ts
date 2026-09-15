import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noUnusedExports = {
  id: "01a09577-1c6e-70ac-9225-958238aed3c2",
  type: "page-type/check-code",
  slug: "no-unused-exports",
  definition: "the check refusing a file exporting a value no other file names",
  parts: ["module/recent-landing"],
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is reached where another file names that value in an import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value named nowhere but inside the file exporting it is reached by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names one export rather than the file the export sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name exported more than once in a file is judged once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file no file imports has every value it exports refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An import or import expression taking every name a file exports leaves that file unrefused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A specifier named by a string constant in the same file is read as that string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A specifier a local function was handed is read one hop back to what the caller named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file exporting every name of another file is judged by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The export a page file is named for is reached by that page being loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page file is judged for every export beside the one that file is named for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files importing one file are read from the index rather than looked for.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A type a file exports is judged by nothing.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A value exported as the default is judged by nothing.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A specifier naming a package rather than a path reads as reaching no file.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A value reached only from files nothing runs reads as reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value its own file never names and only a test names is unreached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value its own file names is reached even where only a test imports it.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A value only an unreached value in its own file names reads as reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value a test names in a test-fixtures file is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file beside a test-fixture page is a test-fixtures file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value a test names in a change runner's code is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change runner's code no file names at all is unreached as any other code is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fixture's value only a fixture's own test names is unreached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fixture another fixture names is reached, and judged on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal for a value only a test names says so rather than saying nothing does.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A file a page names as the code that page runs is judged as any other file.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A change taking away the last import of a value is judged at audit rather than at change.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement:
        "A value this check refuses is taken away only where nothing a person reaches goes with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan settles every removal that would leave a person short of something.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value its own file names elsewhere is refused for the `export` rather than the value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value no file names at all, the file exporting it included, is refused for the value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tag a browser draws itself names no value the file exports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value a page's uncommitted body holds is spared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name React Router reaches a route module by is spared rather than refused.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A value only a request from outside this repository reaches reads as unreached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name a lualib page states as its lua export is reached by the compiler.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name made from a page's slug is reached in that page's code by its loader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which page types name a loader is read from the index rather than listed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The `work` a computed property's code exports is reached by the engine working it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The `runChange` and `takes` a change's code exports are reached by the change loader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which page types are changes is read from what they extend rather than listed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The `runService` a service's running code exports is reached by its runner.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name made from a check's slug is reached in its check code and audit code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The `mark` a syntax rule's code exports is reached by its loader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The `HOLDS` a folder shape's code exports is reached by its loader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The name made from a sentence shape's slug is reached by the check reading its predicate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The `bodyIn` a group's code exports is reached by the group writing its file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The `Drawing` a component group's code exports is reached by whatever draws that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which groups write a file and which draw a page are read from the index rather than listed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The content hash an addon bundle is tagged with is read out of its own body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A spare keyed on a module's slug leaves the export that module's page is named for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module states for itself which of its values a runner reaches by path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which values a module says a runner reaches by path is read from the index rather than listed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route's code, a root route and an app layout are route modules.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value a route module exports under another name is judged as any other value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The `routes` a tunnel routes file exports is reached by the tunnel route discovery.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The `BUILD_ENV` a manifest's code exports is reached by the deploy building that app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The `measured` a performance's code exports is reached by the command measuring it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The `asking` and `keeping` a model test's code exports are reached by its runner.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The name made from a model test's slug is reached by the model check compiling it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The `generateTypes` and `couldTurn` a type generator exports are reached by landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a commit inside the last day holds is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file no commit holds at all is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The day is measured back from a file's last commit rather than from the working tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file last committed before that day is judged as any other file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change, the deploy and the audit pass over the same files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a file a refusal already names is asked after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree git answers nothing for keeps every refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ratchet waits on a file until that file's last landing is a day old.",
    },
  ],
  check: { maxCpuSeconds: 30 },
  audit: { maxCpuSeconds: 120 },
} as const satisfies CheckCode
