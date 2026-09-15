import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noRuleInTwoFiles = {
  id: "01a04ea7-b2ea-7085-ba99-952e24d4a8bb",
  type: "page-type/check-code",
  slug: "no-rule-in-two-files",
  definition: "the check refusing a function whose rule is spelled in another file as well",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule is read from a file of any name rather than from module code alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file with a rule spelled elsewhere as well is refused.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Mending one file leaves every other file with the rule refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names one other file with the rule and counts the rest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One file saying the same thing twice is passed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Which file should keep the rule is not said.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No file owns a rule by exporting that rule.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The two files are named alike and the writer picks.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Only a function is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A function that only passes names along is no rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A function joining its own names into a template is a naming rather than a rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two namings of one shape in two domains keep step with nothing and do not drift.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A body naming by a literal rather than by a template is not read as a naming.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Widening the naming exemption to take it in would narrow this check, which no one has approved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body with nothing to change cannot drift.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cast is passed over however many files write that cast.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty body is passed over the same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body built only out of literals is passed over the same way.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Two files holding one generated backtick string with no name in it are not refused.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A page's invariant saying two bodies are not one rule leaves both files refused here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rule a changed file spells is looked for in the files a search of the tree names as holding it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every run reads each file's rules out of that file rather than out of a filing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No index answers what a file spells.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change with no code file is refused nothing without the index being read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A rule in a file no page claims is left unread.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A rule spelled by an arrow held as an object property is left unread.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A rule spelled by a class method is left unread.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A rule spelled by a function handed straight to a call is left unread.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A rule spelled inside a template literal is left unread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rule in two files during a move from the first file to the second is a landing partway.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Widening a parameter's type takes a rule out from under this check.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A module-private name two files share reads as one rule, so never repeating one hides a duplicate.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Two files repeating one private name pair as one rule though each name reads a different thing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A body reading `import.meta` is one rule text naming a different file wherever that body sits.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Two bound names joined by one operator pair as one rule wherever both bodies spell that operator.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The word looked for is the longest run of a rule between spaces.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run written for a bound name is no word to look for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run holding a line break is no word to look for either.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Any file whose function spells that rule holds that word, so the search leaves none out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The word is matched as written letters rather than as a pattern.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files the change carries are read beside the files the search names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "How common a word is in the tree is weighed by nothing, so a common word narrows little.",
    },
  ],
  check: { maxCpuSeconds: 30 },
  audit: { maxCpuSeconds: 30 },
} as const satisfies CheckCode
