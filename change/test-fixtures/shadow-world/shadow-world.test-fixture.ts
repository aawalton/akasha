import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const shadowWorld = {
  id: "01a0a22a-719b-7c23-993c-0df7b2eb43dd",
  type: "test-fixture",
  slug: "shadow-world",
  definition: "the worlds, reaches and answers a change's tests are set up with",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A world over bodies held in memory is built here rather than by each test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A world over bodies written into an indexed repo is built here rather than by each test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That world lists the paths its bodies are held under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A world whose index answers what a page type carries is built here rather than by each test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One such property is built here rather than by each test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A world reaching one address is built here rather than by each test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reach gathering what it was asked is built here rather than by each test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reach refusing at one address gathers what it was asked before refusing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A world answering one page and one body is built here rather than by each test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A ledger whose index answers for one page type, its properties and values is built here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That ledger's index answers the shapes a test states, and no shape otherwise.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A world recording the change reached rather than running it is built here rather than by each test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That world answers the answer the test states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test stating no answer is answered an answer with no edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index face is built here from the answers a test states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A face answers nothing where the test states no answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer with one edit is read here for the body that edit leaves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer is read here for the body that answer leaves at a path named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer that refused is caught here before the body it left is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reaching built here refuses every address that reaching was not built for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refusal is read here whether the change said the refusal or the replay found the refusal.",
    },
  ],
} as const satisfies TestFixture
