import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageWriting = {
  id: "01a05abd-fe05-794d-8493-811846971bf6",
  type: "page-type/module",
  slug: "page-writing",
  definition: "a write handed to the pages, and the commit it lands as",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A writer is stated as the name and address git takes as an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path standing outside `akasha` is refused before anything is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bodies a write puts and the paths that write takes away are stated apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every body a write puts and every path a write takes away lands through a change page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write putting the body a path already holds writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path taken away that has no body refuses the write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch is authored by the writer whose write arrived first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every writer a batch has is named in the message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two writes in one batch reaching one path leave the later one standing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch refused is refused whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page written as new is refused where its page type has a page at that slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That is judged as the batch lands, against the pages landed and the writes before it in the batch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write refused that way is refused alone, and the rest of its batch lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write refused that way is answered once the rest of its batch has landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write may state the commit its bodies were read against.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit a write states is taken by any name git resolves to a commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit a write states is carried through to the landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write stating a commit is refused where a path no longer has the body that commit had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write stating a commit lands in a batch of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write stating no commit is refused where it changes or takes away a body already there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal says to read the page and send the commit the read answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal is the caller's fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write stating no commit may create a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write stating no commit may put the body a path already holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write stating no commit may keep values outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a write states as new is left to the check on pages written as new.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a body is already there is judged as the batch lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body a write before it in the batch put is a body already there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write refused for stating no commit is refused alone, and the rest of its batch lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment states no commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a write creates has the values its page type generates.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is formatted before the body lands.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value kept outside the commit is merged onto the values its page already keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two writes in one batch keeping one page merge in the order the writes arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value kept outside the commit is written after the commit its write landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write refused commits nothing and keeps nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write refused over a path moved since it was read is refused as a race.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write refused over what it names or a slug already taken is refused as the caller's fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other write refused is refused as the service's fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write that throws is refused naming the paths that write carried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write that threw after it committed names that commit beside those paths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write carrying only values kept outside the commit lands no commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file kept outside the commit is written whole before the values naming it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file kept outside the commit and no longer filled is taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of two writes in one batch reaching one such file, the later one remains.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a value is kept for is judged for its path as a body would be.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An act handed to the writer alone runs between batches, and no batch lands while it runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Acts handed in alone run one at a time, in the order they arrived.",
    },
  ],
} as const satisfies Module
