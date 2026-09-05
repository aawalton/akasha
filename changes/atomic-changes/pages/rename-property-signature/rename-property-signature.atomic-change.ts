import type { AtomicChange } from "../../atomic-change.page-type.ts"

export const renamePropertySignature = {
  id: "01a07312-42ab-7ae4-b3a5-b3ecceb263fc",
  pageTypeSlug: "atomic-change",
  slug: "rename-property-signature",
  definition: "one property a type declares spelled anew wherever the checker resolves to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property is named by the type declaring it rather than by its own name alone.",
    },
    {
      invariantKind: "departure",
      statement: "Only a property the named type declares among its own members is renamed.",
    },
    {
      invariantKind: "departure",
      statement: "A type written as an intersection declares the members of each part it spells.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files name the declaring file is asked of the index rather than walked for.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot answer refuses the change rather than narrowing its reach.",
    },
    {
      invariantKind: "departure",
      statement: "A property declared outside the named file as well is refused, being two things.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shorthand filling the renamed property is spelled out so the name it named is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A property reached through a string keeps its quotes.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies are answered rather than written, so the caller lands them as one.",
    },
    {
      invariantKind: "gap",
      statement: "A class member implementing the renamed property is not respelled.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A body reaching the type through a re-export is out of reach, and `no-re-export` bars one.",
    },
  ],
} as const satisfies AtomicChange
