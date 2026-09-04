import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const languageDesign = {
  id: "01a06600-0000-7000-8000-000000000003",
  pageTypeSlug: "domain",
  slug: "language-design",
  definition: "how a language is shaped",
  partSlugs: ["workspace-package/lua-compiler"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A program is found wrong at reading it or at checking its names or at running it.",
    },
    {
      invariantKind: "constraint",
      statement: "A program that reads and checks and runs can still mean what its writer did not.",
    },
    {
      invariantKind: "absence",
      statement: "No failure catches a program meaning what its writer did not.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Least Power",
      act: "Give a language the least power that does the job.",
      warrant:
        "Every power a language gains is taken from what can be known about a program unrun.",
      aids: [
        "Ask what a new power stops you knowing.",
        "Never widen a language to avoid a special case.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Reads As It Looks",
      act: "Make a program mean what its reader would take it to mean.",
      warrant:
        "Nothing checks a reading against the grammar, so looking at the program is the only check.",
      aids: [
        "Take the reading a stranger would give it.",
        "Never let a spelling suggest the wrong meaning.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Declared Not Guessed",
      act: "Take a value's type from what declared it, never from how it is written.",
      warrant:
        "Text that looks like a number is still text, and reading it as one loses the writer's meaning.",
      aids: [
        "Ask what declared a value, not what it looks like.",
        "Never let a value's shape choose its type.",
      ],
    },
    {
      directiveKind: "principle",
      name: "One Value Model",
      act: "Give a language one set of values, whatever holds them.",
      warrant:
        "A language taking its values from what stores them has as many meanings as it has stores.",
      aids: [
        "Settle what a value is before what operators do.",
        "Never let where a value sits change what it is.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Caught Early",
      act: "Find a wrong program at the earliest moment it can be found.",
      warrant: "The later a fault is found, the more has been built on it and the less says why.",
      aids: [
        "Check what a program says before what it does.",
        "Never leave to run time what parsing could catch.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Refuse Not Convert",
      act: "Refuse a value the program cannot use, rather than making one it can.",
      warrant:
        "A made value answers in place of the one meant, and nothing after it can tell which it got.",
      aids: [
        "Let one absent value stop the whole answer.",
        "Never add a conversion to make two types meet.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Name The Cause",
      act: "Make a refusal say what was wrong and where, in the terms the program was written in.",
      warrant: "A refusal is the one part of a language its reader meets while already lost.",
      aids: [
        "Name the value missing, not the step that broke.",
        "Never report a fault in the evaluator's terms.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Rewrite Not Widen",
      act: "Change the programs with the language wherever they are all yours.",
      warrant:
        "Syntax kept so old programs still run is power the language keeps forever and never needed.",
      aids: [
        "Find every program before you change a meaning.",
        "Never add syntax to spare yourself a rewrite.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Meaning Outside Code",
      act: "Write what a program means somewhere other than the code that runs it.",
      warrant:
        "Where the implementation is a language's only statement, every bug it has is the specification.",
      aids: [
        "Write the meaning before the evaluator.",
        "Never settle a question by reading the code.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Held To The Words",
      act: "Hold every implementation to the written meaning, never to another implementation.",
      warrant:
        "Implementations checked against each other agree on their shared mistakes and call it agreement.",
      aids: [
        "Check each implementation against the words alone.",
        "Never make one implementation the reference.",
      ],
    },
  ],
} as const satisfies Domain
