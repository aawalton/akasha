import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noRuleInTwoFiles = {
  id: "01a04ea7-b2ea-7085-ba99-952e24d4a8bb",
  type: "page-type/check-code",
  slug: "no-rule-in-two-files",
  definition: "the check refusing a function whose rule is spelled in another file as well",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule is read from a file of any name rather than from module code alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file with a rule spelled elsewhere as well is refused.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Mending one file leaves every other file with the rule refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names one other file with the rule and counts the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One file saying the same thing twice is passed over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Which file should keep the rule is not said.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No file owns a rule by exporting that rule.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The two files are named alike and the writer picks.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Only a function is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function that only passes names along is no rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function joining its own names into a template is a naming rather than a rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two namings of one shape in two domains keep step with nothing and do not drift.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A body naming by a literal rather than by a template is not read as a naming.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Widening the naming exemption to take it in would narrow this check, which no one has approved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body with nothing to change cannot drift.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cast is passed over however many files write that cast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty body is passed over the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body built only out of literals is passed over the same way.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Two files holding one generated backtick string with no name in it are not refused.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement:
        "A page's decision saying two bodies are not one rule leaves both files refused here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule a changed file spells is looked for in the files a search of the tree names as holding it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every run reads each file's rules out of that file rather than out of a filing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No index answers what a file spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change with no code file is refused nothing without the index being read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A rule in a file no page claims is left unread.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A rule spelled by an arrow held as an object property is left unread.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A rule spelled by a class method is left unread.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A rule spelled by a function handed straight to a call is left unread.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A rule spelled inside a template literal is left unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule in two files during a move from the first file to the second is a landing partway.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Widening a parameter's type takes a rule out from under this check.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A module-private name two files share reads as one rule, so never repeating one hides a duplicate.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Two files repeating one private name pair as one rule though each name reads a different thing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A body reading `import.meta` is one rule text naming a different file wherever that body sits.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Two bound names joined by one operator pair as one rule wherever both bodies spell that operator.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The word looked for is the longest run of a rule between spaces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run written for a bound name is no word to look for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run holding a line break is no word to look for either.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Any file whose function spells that rule holds that word, so the search leaves none out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The word is matched as written letters rather than as a pattern.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files the change carries are read beside the files the search names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "How common a word is in the tree is weighed by nothing, so a common word narrows little.",
    },
  ],
  check: { maxCpuSeconds: 30 },
  audit: { maxCpuSeconds: 120 },
} as const satisfies CheckCode
