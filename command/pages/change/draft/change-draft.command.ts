import type { Command } from "akasha/command/command.page-type.types.ts"

export const changeDraft = {
  id: "01a08179-3176-7aa0-8d0b-d07d8da49eb2",
  type: "command",
  slug: "change-draft",
  definition: "the command answering one change and keeping its edits rather than landing them",
  code: "ts",
  test: "ts",
  timeout: 300,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The change to answer is named by the first word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no change is refused rather than reaching every change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal names every change a draft runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The arguments the change takes are read from standard input.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An argument is a line `key: value` or `key <fence>` opening a body `<fence>` alone closes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fence is the caller's to pick.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body opened `key <fence> no-newline` keeps no newline on its last line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key `at` names a path, read against the repository root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two drafts leave two sets of edits in the order the runs were made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The edits answered are kept beside the calling agent's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft lands nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft names where the edits are kept and the call that lands them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key `message` is refused rather than carried into a commit that is not made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key `draft` is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key `measure` is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word naming an act over the edits kept is read here as a change to answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft is handed the world the edits kept before that draft leave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft that refuses keeps nothing and says why the draft refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft whose writer owes reading is refused before that draft's edits are kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No check runs over a draft.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No flag other than the help flag is said on the command line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The help flag is answered with what a draft does and what a draft takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The help flag is read before the arguments are, so nothing need be piped in.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft's answer names every page written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft that threw after keeping its edits names those edits in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft that threw before keeping anything says nothing of what it kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft names each thing it did in the order it did them.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No redirect carries that answer to a file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft is ended at the ceiling on the wall clock its page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft ended that way keeps nothing and says nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change past the processor seconds its page allows keeps nothing.",
    },
  ],
  name: "draft",
  arguments: [{ argument: "argument/change", saidAs: "word" }],
} as const satisfies Command
