import type { CodeCheck } from "akasha/check/code/check-code.page-type.types.ts"

export const noRuleInTwoFiles = {
  id: "01a04ea7-b2ea-7085-ba99-952e24d4a8bb",
  type: "code-check",
  slug: "no-rule-in-two-files",
  definition: "the check refusing a function whose rule is spelled in another file as well",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule is read from a file of any name rather than from module code alone.",
    },
    {
      invariantKind: "departure",
      statement: "Every file with a rule spelled elsewhere as well is refused.",
    },
    {
      invariantKind: "constraint",
      statement: "Mending one file leaves every other file with the rule refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names one other file with the rule and counts the rest.",
    },
    {
      invariantKind: "departure",
      statement: "One file saying the same thing twice is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "Which file should keep the rule is not said.",
    },
    {
      invariantKind: "absence",
      statement: "No file owns a rule by exporting that rule.",
    },
    {
      invariantKind: "absence",
      statement: "The two files are named alike and the writer picks.",
    },
    {
      invariantKind: "absence",
      statement: "Only a function is read.",
    },
    {
      invariantKind: "departure",
      statement: "A function that only passes names along is no rule.",
    },
    {
      invariantKind: "departure",
      statement: "A function joining its own names into a template is a naming rather than a rule.",
    },
    {
      invariantKind: "departure",
      statement: "Two namings of one shape in two domains keep step with nothing and do not drift.",
    },
    {
      invariantKind: "absence",
      statement: "A body naming by a literal rather than by a template is not read as a naming.",
    },
    {
      invariantKind: "absence",
      statement:
        "Widening the naming exemption to take it in would narrow this check, which no one has approved.",
    },
    {
      invariantKind: "departure",
      statement: "A body with nothing to change cannot drift.",
    },
    {
      invariantKind: "departure",
      statement: "A cast is passed over however many files write that cast.",
    },
    {
      invariantKind: "departure",
      statement: "An empty body is passed over the same way.",
    },
    {
      invariantKind: "departure",
      statement: "A body built only out of literals is passed over the same way.",
    },
    {
      invariantKind: "absence",
      statement:
        "Two files holding one generated backtick string with no name in it are not refused.",
    },

    {
      invariantKind: "absence",
      statement:
        "A page's invariant saying two bodies are not one rule leaves both files refused here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule a changed file spells is looked for in the files a search of the tree names as holding it.",
    },
    {
      invariantKind: "departure",
      statement: "A landing files the rules a changed file spells under those rules.",
    },
    {
      invariantKind: "departure",
      statement: "A run at change reads those filed rules rather than parsing every file named.",
    },
    {
      invariantKind: "absence",
      statement: "A typed path the index names and has not read is parsed by nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The filed rules are read only where the reader that filed them is the one asking.",
    },
    {
      invariantKind: "absence",
      statement: "A file written outside a landing has its rules filed by nothing until a rebuild.",
    },
    {
      invariantKind: "departure",
      statement:
        "Such a file is refused against the filed rules of others and makes no other file refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run the filing reader did not file for parses the files that search names instead.",
    },
    {
      invariantKind: "departure",
      statement:
        "An audit parses every file its change carries rather than reading the filed rules.",
    },
    {
      invariantKind: "departure",
      statement: "A filed rule string is the one the code-rule reader spells.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing works a rule string out a second time to file it.",
    },

    {
      invariantKind: "departure",
      statement: "A change with no code file is refused nothing without the index being read.",
    },
    {
      invariantKind: "absence",
      statement: "A rule in a file no page claims is left unread.",
    },
    {
      invariantKind: "absence",
      statement: "A rule spelled by an arrow held as an object property is left unread.",
    },
    {
      invariantKind: "absence",
      statement: "A rule spelled by a class method is left unread.",
    },
    {
      invariantKind: "absence",
      statement: "A rule spelled by a function handed straight to a call is left unread.",
    },
    {
      invariantKind: "absence",
      statement: "A rule spelled inside a template literal is left unread.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule in two files during a move from the first file to the second is a landing partway.",
    },
    {
      invariantKind: "absence",
      statement: "Widening a parameter's type takes a rule out from under this check.",
    },
    {
      invariantKind: "absence",
      statement:
        "A module-private name two files share reads as one rule, so never repeating one hides a duplicate.",
    },
    {
      invariantKind: "absence",
      statement:
        "Two files repeating one private name pair as one rule though each name reads a different thing.",
    },
    {
      invariantKind: "absence",
      statement:
        "A body reading `import.meta` is one rule text naming a different file wherever that body sits.",
    },
    {
      invariantKind: "absence",
      statement:
        "Two bound names joined by one operator pair as one rule wherever both bodies spell that operator.",
    },
    {
      invariantKind: "departure",
      statement: "The word looked for is the longest run of a rule between spaces.",
    },
    {
      invariantKind: "departure",
      statement: "A run written for a bound name is no word to look for.",
    },
    {
      invariantKind: "departure",
      statement: "A run holding a line break is no word to look for either.",
    },
    {
      invariantKind: "departure",
      statement:
        "Any file whose function spells that rule holds that word, so the search leaves none out.",
    },
    {
      invariantKind: "departure",
      statement: "The word is matched as written letters rather than as a pattern.",
    },
    {
      invariantKind: "departure",
      statement: "The files the change carries are read beside the files the search names.",
    },
    {
      invariantKind: "absence",
      statement:
        "How common a word is in the tree is weighed by nothing, so a common word narrows little.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 30 },
} as const satisfies CodeCheck
