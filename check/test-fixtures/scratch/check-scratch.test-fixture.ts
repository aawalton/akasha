import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const checkScratch = {
  id: "01a04fd0-8a9a-7915-a355-32d5432a7f11",
  type: "page-type/test-fixture",
  slug: "check-scratch",
  definition:
    "what a check's test judges: an index set up in a scratch root, and the change read against it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Where an index sits is reached through the composer that says where the index is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry is one line of JSON in a file named for the question the entry answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The path a relation points at is handed in rather than assumed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scratch index says its schema.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Identity is filed only under the properties a `unique` names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading naming nothing refuses rather than answering empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change is read as the bodies the change proposes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change falls back to the body on disk.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No root is made or swept here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A test says where its scratch sits and how long the scratch lives.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "This module only writes into the scratch.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No test is written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The properties a page type declares are read from that page type's value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Typing a page type files that page type's value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type sits where the shapes of its page properties are written beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page claimed here has its body written and is filed by its type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page filed here is filed by its id as well as by its type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose body is already written is left as that body is.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Typing a page type writes a body stating that page type's `id` and `pageTypeSlug`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type files the types above that page type as a list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That list is empty where the page type names no type above.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The scratch here is set up by the check tests that reach for the scratch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A schema line written here states every field the index writes in that order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shadow that will not cast throws rather than answering no refusals.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The scratch declares the property descent is walked down.",
    },
  ],
} as const satisfies TestFixture
