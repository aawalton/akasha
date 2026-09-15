import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyCarrying = {
  id: "01a058d4-6546-7f65-8b92-9271477f905f",
  type: "module",
  slug: "property-carrying",
  definition: "the pages a page property reaches, and the record each is reached through",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which pages carry a property is one question asked here rather than composed by each caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration is a relation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page types declare a property is one read beside that property's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The declarers of a property are answered apart from the pages with the property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declarer is answered with the page type that declarer is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type declaring a property carries the property to every type beneath that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Descent is read from the reverse of `extends-type` rather than from a page type's body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A property declared as a record's field is carried by the pages with that record.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field is answered with the record the field is reached through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property nested deeper than one record is not reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name naming more than one page property is refused rather than chosen between.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name no page property has is refused rather than answered with no pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file is beside a property naming that file where a page with that property sits in its folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file in another folder is beside nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file's name decides nothing on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which properties naming a file are meant is the caller's to say.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every kind under a file property is read here rather than that one kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file is under a folder property naming that folder where a page with that property sits above it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder claims every file beneath it rather than its own files alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file outside every such folder is under nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every kind under a named folder property is read here rather than that one kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which folder properties are meant is the caller's to say.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which folders one list of folder properties names is worked out once for it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path is answered from the folders above it rather than from every folder named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether the file at a path is generated is answered here rather than by each caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A property naming no file says its section is generated only under the types carrying it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Two properties sharing a section name are told apart by the page type the file's name has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page types carry a property is the question already answered here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index that cannot answer that is a file that is not generated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That question is answered from an index face as well as from a root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A face answering it carries the readers a root's answer reaches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page body is read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether a page states the value is not answered here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A face over a reading is answered on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a face says about every file property is worked out once for that face.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A second path asked of one face reads what the first path worked out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A face built again works it out again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a tool resolves the paths in the file at a path is answered here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A property naming no file says a tool resolves the paths in each file its section names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file a module property group writes is generated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The property names the group rather than the group naming the property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page carries a group where that group's code sits beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether that code sits beside a page is read from the tree rather than from the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A face reading a tree of its own is asked of that tree rather than of the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A face reading no tree of its own is asked of the disk under its root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page without that code holds a file that is not generated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The code a group writes a file from is answered here beside whether it does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file no group writes is answered with no such code rather than refusing.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing judges that a group's code writes the file the property names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether a group writes the file at a path is answered from that path's name alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That answer holds for a path no folder the index knows sits above.",
    },
  ],
} as const satisfies Module
