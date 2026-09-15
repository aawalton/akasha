import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pathClaiming = {
  id: "01a08205-e6f0-73c3-9c32-f05a518dd3f3",
  type: "module",
  slug: "path-claiming",
  definition: "the paths a page's value claims, and the page a path is claimed by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which paths a page claims is worked out here for whatever files them.",
    },
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
      statement: "A page claims that sops file only where that file is there.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose type declares an uncommitted value claims the uncommitted file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims that uncommitted file only where that file is there.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose type gives a file property a default claims that property's file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "That property's file is claimed only where that file is there.",
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
      statement: "A page states nothing for such a property.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose type declares a file property group claims a file beside the page for each member.",
    },
    {
      invariantKind: "departure",
      statement: "A member's file is claimed only where that file is there.",
    },
    {
      invariantKind: "departure",
      statement: "Each member's file is named by the group's slug and then the member's slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "A member the group declares uncommitted is claimed under the name an uncommitted file has.",
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
      statement:
        "A property the page states is claimed under its uncommitted name where its type holds it so.",
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
      statement: "A page claims a file it does not state only where that file is there.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims a file it states whether or not that file is there.",
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
      invariantKind: "departure",
      statement: "A page claims a folder whether or not that folder is there.",
    },
    {
      invariantKind: "gap",
      statement: "A folder a build writes is told apart here from a folder that is not.",
    },
    {
      invariantKind: "departure",
      statement: "The page claiming a path is answered from that path rather than from an index.",
    },
    {
      invariantKind: "departure",
      statement: "A path the naming grammar reads as a page of a known type is its own page.",
    },
    {
      invariantKind: "departure",
      statement: "A path named for a page is claimed by that page in the same folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path no grammar names is claimed by whichever page type declares that name outright.",
    },
    {
      invariantKind: "departure",
      statement: "Such a name is read against each folder above the path in turn.",
    },
    {
      invariantKind: "departure",
      statement:
        "The claimant is the page of that type sitting in the folder the name is read against.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no page of that type leaves the path claimed by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages sit in a folder is handed in rather than read here.",
    },
    {
      invariantKind: "departure",
      statement: "A caller judging an answer hands in the pages as that answer leaves them.",
    },
    {
      invariantKind: "departure",
      statement:
        "The names page types declare are gathered once for a set of types rather than once for each path.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller holding a reading asks here for a claimant rather than gathering the answers itself.",
    },
    {
      invariantKind: "departure",
      statement: "The answers a reading gives for claiming are gathered once for that reading.",
    },
  ],
} as const satisfies Module
