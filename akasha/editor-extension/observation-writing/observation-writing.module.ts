import type { Module } from "../../code-system/modules/module.page-type.ts"

export const observationWriting = {
  id: "01a0680d-8b31-7000-8e0a-6ad615fa9461",
  pageTypeSlug: "module",
  slug: "observation-writing",
  definition:
    "the bun child a window's writes are handed to over pipes, and what each write is answered",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One child is held per writing rather than one for the whole host.",
    },
    {
      invariantKind: "departure",
      statement: "Two writings share no child.",
    },
    {
      invariantKind: "departure",
      statement: "The child is started at the first ask rather than when the writing is built.",
    },
    {
      invariantKind: "departure",
      statement:
        "Asks arriving during a start wait on that start rather than each spawning a child.",
    },
    {
      invariantKind: "departure",
      statement: "An ask to a child already up is written in the tick the ask was made.",
    },
    {
      invariantKind: "departure",
      statement:
        "The write onto the child happens as the ask is made rather than when it is awaited.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer comes back on the fourth pipe rather than on stdout or stderr.",
    },
    {
      invariantKind: "departure",
      statement: "A child is up once it has said hello on the fourth pipe.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the child says on stdout or stderr is an answer.",
    },
    {
      invariantKind: "constraint",
      statement: "A child saying no hello within the start timeout is killed and the ask refused.",
    },
    {
      invariantKind: "constraint",
      statement: "An ask unanswered within the write timeout retires the child and is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every ask waiting on a lost child is refused by name rather than left waiting.",
    },
    {
      invariantKind: "departure",
      statement: "A lost child is no lost writing, and the next ask starts another child.",
    },
    {
      invariantKind: "constraint",
      statement: "An ask made after a dispose is refused and starts no child.",
    },
    {
      invariantKind: "departure",
      statement: "A child started during a dispose is killed and the ask behind it refused.",
    },
    {
      invariantKind: "departure",
      statement: "Disposing closes the child's stdin and waits for the child to exit.",
    },
    {
      invariantKind: "constraint",
      statement: "A child still running after the drain timeout is killed.",
    },
    {
      invariantKind: "departure",
      statement: "A write onto a pipe the child no longer holds is reported on the stdin stream.",
    },
    {
      invariantKind: "departure",
      statement: "A line on the answer pipe that is no JSON object is thrown away as noise.",
    },
    {
      invariantKind: "departure",
      statement: "The child's entry is found from the checkout root rather than from this file.",
    },
    {
      invariantKind: "absence",
      statement: "The child's pid is read off the hello and kept from the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a write means.",
    },
    {
      invariantKind: "departure",
      statement: "Every test here runs against a real child over real pipes rather than a stub.",
    },
  ],
} as const satisfies Module
