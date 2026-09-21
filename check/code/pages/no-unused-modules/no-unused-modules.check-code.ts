import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noUnusedModules = {
  id: "01a0c660-9eec-7000-9740-2457fdcae980",
  type: "page-type/check-code",
  slug: "no-unused-modules",
  definition: "the check refusing a module nothing reaches",
  parts: ["module/bundle-reaching", "module/module-gathering", "module/slug-spelling"],
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module another file imports is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module an addon's bundle entry point reaches is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module another file names by spelling that module's slug is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "All three are asked before a module is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the module's page rather than any one file that module holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files importing one file are read from the index rather than looked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import from the module's own files reaches nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module only its own test imports is reached by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a page whose type is a module is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type that extends a module writes its own ending and is judged by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle entry points are reached once for the whole run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run where every module is already reached builds no program at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree is searched for a slug only where the other two routes found nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module a commit inside the last day holds any file of is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module the head commit is missing a file of is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An uncommitted file beside a module is left out of that reckoning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day is measured back from a file's last commit rather than from the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change, the deploy and the audit judge the same modules.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The grace the check for unused exports keeps is the grace kept here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The check runs where a change names a file belonging to a module.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A change taking away the last import of a module is judged at audit rather than at change.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A module the test runner preloads by path reads as unreached.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A module a manifest names by path reads as unreached.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A module whose slug some unrelated body spells reads as reached.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "A module this check refuses is taken away only where Alan settles that removal.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This check takes nothing away.",
    },
  ],
  check: { maxCpuSeconds: 30 },
  audit: { maxCpuSeconds: 60 },
} as const satisfies CheckCode
