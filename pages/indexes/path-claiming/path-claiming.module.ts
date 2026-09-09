import type { Module } from "@akasha/code/module"

export const pathClaiming = {
  id: "01a08205-e6f0-73c3-9c32-f05a518dd3f3",
  pageTypeSlug: "module",
  type: "module",
  slug: "path-claiming",
  definition: "the paths a page's value claims",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page states its own path and the file each file property of the page names.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims everything the page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page claims the sops file beside the page only where the page's type declares a secret.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose type declares an uncommitted value claims the uncommitted file beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose type gives a file property a default claims that property's file beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "That file is claimed from the page's type rather than from the values the page states.",
    },
    {
      invariantKind: "departure",
      statement: "That file is held under the extension its declaration states as a default.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration fixing a file property's value claims that file the same way.",
    },
    {
      invariantKind: "departure",
      statement: "A page states nothing for such a property, so its type is the only source.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose type declares a file property group claims a file beside the page for each member.",
    },
    {
      invariantKind: "departure",
      statement: "Each member's file is named by the group's slug and then the member's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page of a group's own page type claims no member's file beside that page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file property declared uncommitted is claimed under the name an uncommitted file has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file property declared with a default alone is claimed under the name a committed file has.",
    },
    {
      invariantKind: "departure",
      statement:
        "The numbered files of an uncommitted property are claimed as the files of a stated property are.",
    },
    {
      invariantKind: "departure",
      statement: "A property whose file is named outright is claimed once rather than twice.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property a page states and its type defaults is claimed once rather than twice.",
    },
    {
      invariantKind: "departure",
      statement: "The naming grammar lets no other page claim either file.",
    },
    {
      invariantKind: "departure",
      statement: "A type declares every property every type above that type declares.",
    },
    {
      invariantKind: "departure",
      statement: "Which types declare a secret is answered here rather than by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims a numbered file of a property only where that file is there.",
    },
    {
      invariantKind: "departure",
      statement: "A file that a page claims without stating is not asked to be there.",
    },
    {
      invariantKind: "absence",
      statement: "Which properties a page type holds in a file is not answered here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page claims a folder beside the page under the name that folder's property states.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims a folder only where the page states that the page has it.",
    },
    {
      invariantKind: "gap",
      statement: "A folder a build writes is told apart here from a folder that is not.",
    },
  ],
} as const satisfies Module
