import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const propertyCarrying = {
  id: "01a058d4-6546-7f65-8b92-9271477f905f",
  pageTypeSlug: "module",
  type: "module",
  slug: "property-carrying",
  definition: "the pages a page property reaches, and the record each is reached through",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which pages carry a property is one question asked here rather than composed by each caller.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration is a relation.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types declare a property is one read of the index.",
    },
    {
      invariantKind: "departure",
      statement: "The declarers of a property are answered apart from the pages with the property.",
    },
    {
      invariantKind: "departure",
      statement: "A declarer is answered with the page type that declarer is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type declaring a property carries the property to every type beneath that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "Descent is read from the reverse of `extends-type` rather than from a page type's body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property declared as a record's field is carried by the pages with that record.",
    },
    {
      invariantKind: "departure",
      statement: "A field is answered with the record the field is reached through.",
    },
    {
      invariantKind: "departure",
      statement: "A property nested deeper than one record is not reached.",
    },
    {
      invariantKind: "departure",
      statement: "A name naming more than one page property is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A name no page property has is refused rather than answered with no pages.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file is beside a property naming that file where a page with that property sits in its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file in another folder is beside nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The file's name decides nothing on its own.",
    },
    {
      invariantKind: "departure",
      statement: "Which properties naming a file are meant is the caller's to say.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind under a file property is read here rather than that one kind.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file is under a folder property naming that folder where a page with that property sits above it.",
    },
    {
      invariantKind: "departure",
      statement: "A folder claims every file beneath it rather than its own files alone.",
    },
    {
      invariantKind: "departure",
      statement: "A folder property naming endings is under only the files carrying one of them.",
    },
    {
      invariantKind: "departure",
      statement: "A folder property naming no endings is under every file beneath its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file outside every such folder is under nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind under a named folder property is read here rather than that one kind.",
    },
    {
      invariantKind: "departure",
      statement: "Which folder properties are meant is the caller's to say.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether the file at a path is generated is answered here rather than by each caller.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property naming no file says its section is generated only under the types carrying it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two properties sharing a section name are told apart by the page type the file's name has.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types carry a property is the question already answered here.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot answer that is a file that is not generated.",
    },
    {
      invariantKind: "departure",
      statement: "That question is answered from an index face as well as from a root.",
    },
    {
      invariantKind: "departure",
      statement: "A face answering it carries the readers a root's answer reaches.",
    },
    {
      invariantKind: "absence",
      statement: "No page body is read.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a page states the value is not answered here.",
    },
    {
      invariantKind: "departure",
      statement: "A face over a reading is answered on its own.",
    },
    {
      invariantKind: "departure",
      statement: "What a face says about every file property is worked out once for that face.",
    },
    {
      invariantKind: "departure",
      statement: "A second path asked of one face reads what the first path worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A face built again works it out again.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a tool resolves the paths in the file at a path is answered here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property naming no file says a tool resolves the paths in each file its section names.",
    },
    {
      invariantKind: "departure",
      statement: "A file a module property group writes is generated.",
    },
    {
      invariantKind: "departure",
      statement: "The property names the group rather than the group naming the property.",
    },
    {
      invariantKind: "departure",
      statement: "A page carries a group where that group's code sits beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether that code sits beside a page is read from the index rather than from the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A page without that code holds a file that is not generated.",
    },
    {
      invariantKind: "departure",
      statement: "The code a group writes a file from is answered here beside whether it does.",
    },
    {
      invariantKind: "departure",
      statement: "A file no group writes is answered with no such code rather than refusing.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing judges that a group's code writes the file the property names.",
    },
  ],
} as const satisfies Module
