import type { ContextWarrant } from "../context-warrant.page-type.types.ts"

export const changeTabooTerms = {
  id: "01a05968-4c31-7a5e-9f02-6b1d38c4e770",
  pageTypeSlug: "context-warrant",
  type: "context-warrant",
  slug: "change-taboo-terms",
  definition: "what a seat must read for the taboo terms its change writes",
  code: "ts",
  test: "ts",
  runsOnRead: false,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A taboo term whose pattern finds the text a change adds is warranted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A taboo term whose pattern finds that text split at its camelCase seams is warranted too.",
    },
    {
      invariantKind: "departure",
      statement: "A seam opens between a lower letter and an upper letter.",
    },
    {
      invariantKind: "departure",
      statement: "A seam opens between a digit and an upper letter.",
    },
    {
      invariantKind: "departure",
      statement: "A seam opens where a run of upper letters gives way to a word.",
    },
    {
      invariantKind: "departure",
      statement: "An underscore or a hyphen is left as that character is.",
    },
    {
      invariantKind: "departure",
      statement: "The split copy is a matching aid rather than text the change wrote.",
    },
    {
      invariantKind: "departure",
      statement:
        "The text owed for a term found only in the split copy says the term is inside a camelCase name.",
    },
    {
      invariantKind: "absence",
      statement: "The split text itself is never quoted back.",
    },
    {
      invariantKind: "departure",
      statement: "Text a change leaves unchanged is not text the change adds.",
    },
    {
      invariantKind: "departure",
      statement: "A term warrants nothing of the page stating the term.",
    },
    {
      invariantKind: "departure",
      statement: "A term warrants nothing of a page whose type runs no taboo check.",
    },
    {
      invariantKind: "departure",
      statement: "Which page type a path names is read off that path's own name.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's own file is warranted whatever that page type says of its pages.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a page is warranted as that page is.",
    },
    {
      invariantKind: "departure",
      statement: "A file whose property has bytes rather than text is read by no term here.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a property has bytes is read off that property's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The text owed names every sense the term bars and the wording written instead.",
    },
    {
      invariantKind: "departure",
      statement: "The text owed names every sense the term keeps as well.",
    },
    {
      invariantKind: "departure",
      statement:
        "The text owed says of each list whether the list has kept senses or barred senses.",
    },
    {
      invariantKind: "departure",
      statement:
        "The text owed for a term naming no kept sense names only the senses the term bars.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern that does not compile finds nothing rather than refusing the change.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges which sense was meant.",
    },
    {
      invariantKind: "departure",
      statement: "A change handed no bodies warrants nothing.",
    },
  ],
} as const satisfies ContextWarrant
