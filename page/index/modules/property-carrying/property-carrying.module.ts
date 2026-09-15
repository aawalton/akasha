import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyCarrying = {
  id: "01a058d4-6546-7f65-8b92-9271477f905f",
  type: "page-type/module",
  slug: "property-carrying",
  definition: "the pages a page property reaches, and the record each is reached through",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which pages carry a property is one question asked here rather than composed by each caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration is a relation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which page types declare a property is one read beside that property's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The declarers of a property are answered apart from the pages with the property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declarer is answered with the page type that declarer is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type declaring a property carries the property to every type beneath that page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Descent is read from the reverse of `extends-type` rather than from a page type's body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property declared as a record's field is carried by the pages with that record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field is answered with the record the field is reached through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property nested deeper than one record is not reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name naming more than one page property is refused rather than chosen between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name no page property has is refused rather than answered with no pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file is beside a property naming that file where a page with that property sits in its folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file in another folder is beside nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file's name decides nothing on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which properties naming a file are meant is the caller's to say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind under a file property is read here rather than that one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file is under a folder property naming that folder where a page with that property sits above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder claims every file beneath it rather than its own files alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file outside every such folder is under nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind under a named folder property is read here rather than that one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which folder properties are meant is the caller's to say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which folders one list of folder properties names is worked out once for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path is answered from the folders above it rather than from every folder named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether the file at a path is generated is answered here rather than by each caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property naming no file says its section is generated only under the types carrying it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two properties sharing a section name are told apart by the page type the file's name has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A folder property saying its folder is generated says that of every file beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which page types carry a property is the question already answered here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An index that cannot answer that is a file that is not generated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That question is answered from an index face as well as from a root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face answering it carries the readers a root's answer reaches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page body is read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Whether a page states the value is not answered here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face over a reading is answered on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a face says about every file property is worked out once for that face.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second path asked of one face reads what the first path worked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face built again works it out again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face works that out as it is built rather than as it is first asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller holding a reading builds a face over that reading rather than over a root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face over a reading names the root the tree beside a page is read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a tool resolves the paths in the file at a path is answered here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property naming no file says a tool resolves the paths in each file its section names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a module property group writes is generated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The property names the group rather than the group naming the property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page carries a group where that group's code sits beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether that code sits beside a page is read from the tree rather than from the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face reading a tree of its own is asked of that tree rather than of the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face reading no tree of its own is asked of the disk under its root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page without that code holds a file that is not generated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code a group writes a file from is answered here beside whether it does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file no group writes is answered with no such code rather than refusing.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Nothing judges that a group's code writes the file the property names.",
    },
  ],
} as const satisfies Module
