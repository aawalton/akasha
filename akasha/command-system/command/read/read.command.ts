import type { Command } from "../command.page-type.ts"

export const read = {
  id: "01a04bec-10b4-7e86-aeae-ed252396f186",
  pageTypeSlug: "command",
  slug: "read",
  definition: "the command returning the whole body of each akasha file it is named",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A read returns the whole file, or says the agent read that body already, and never part of it.",
    },
    {
      invariantKind: "departure",
      statement: "A body the agent's record already holds comes back as one line saying so.",
    },
    {
      invariantKind: "departure",
      statement: "`--full` returns the body whatever the record holds.",
    },
    {
      invariantKind: "departure",
      statement: "A read of a body that is not UTF-8 text returns what it is instead of the body.",
    },
    {
      invariantKind: "absence",
      statement: "A read takes no line range.",
    },
    {
      invariantKind: "departure",
      statement: "A read too big for one answer returns fewer files and how to ask for the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A body past what one answer holds returns what it is, and no call returns it.",
    },
    {
      invariantKind: "departure",
      statement: "A read reaches no file outside the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement: "The line numbers a read prints are not part of the file.",
    },
    {
      invariantKind: "departure",
      statement: "The call for what is left over is priced as it is printed.",
    },
    {
      invariantKind: "departure",
      statement: "A read records the body that reached the agent it was for.",
    },
    {
      invariantKind: "departure",
      statement: "A read whose output is thrown away returns nothing and records nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A read for an agent nothing identifies returns the body and records nothing.",
    },
  ],
} as const satisfies Command
