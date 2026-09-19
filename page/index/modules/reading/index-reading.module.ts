import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const indexReading = {
  id: "01a04bdd-596c-7b76-9978-92ebfa6a20e4",
  type: "page-type/module",
  slug: "index-reading",
  definition: "the answers the index gives back, each one a file read",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The value every page has is answered as one map from path to value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer about one page is one file read or one directory listed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A directory listed is one page type's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages of one page type are read from where that type's slugs are filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type whose slug is unique within a scope has one folder for each scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The slugs one page type's pages carry are those same folders listed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those folders are answered to a caller wanting to watch where a type is filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder answered that way is a path under the repository root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A directory listed grows with that type and not with the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the index names is answered as a path rather than as the entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page an address names is answered under the page type that address states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is a lower uuid is looked for under its last two characters first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value no such folder answers for is looked for under the key without it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page unique within a scope is answered under that scope's property and value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type no page is filed under is answered empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A read answers what the index holds rather than asking whether the index is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question the index holds no file for is answered empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A folder with no file is a population with no members rather than an unwritten index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tree missing beneath an index that stands is an empty answer rather than a refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An address stating no page type is answered under the page type its caller names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here walks a tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller filing a change names no root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An index's path under the root is said here alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which pages name a page is read from the index the asking names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller naming an index in a refusal says the path reached rather than spelling that path again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal names the directory the reading read from rather than a path under a root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader here takes the repository root or a reading of the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The slug a page type's pages are filed under is answered from that page type's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That slug is read off the name of the file with the id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The value every page of one page type carries is read from those pages' own bodies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape every page property of one page type has is one file read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That file sits beside the page type rather than under the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape every page property has is that file read for each page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages of one page type are answered by path as one map.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every answer about the pages of one page type is drawn from that one read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that will not read is left out rather than refusing the rest.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An answer about one page reads no stamp.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer drawn from one reading is answered once for that reading and held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The value the pages of one page type carry is held for the reading and that page type together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape the page properties of one page type have is held the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer held is let go when the reading it was drawn from is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller naming a root is answered for the index as it is at that call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value one page carries is read from that page's own body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That value is read once for a path and a reading together, and held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path whose body is not typescript carries no value, and that body is not read.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Reading a body no typescript parser admits costs the square of how many lines it has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The one page of a page type carrying a slug is answered with the value that page carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no page of that page type carries refuses that answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page carrying no value refuses that answer too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fixture files a shape's kind as a page type once for each root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fixture files the page type such a kind extends as a page type too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fixture files every field a shape carries rather than a chosen few.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field left out of that filing has a test read a default as what was filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fixture files no shape for a page stating no property slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fixture files a relation beside the page named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The naming page's id is the id that line carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fixture naming no id files a relation carrying none.",
    },
  ],
} as const satisfies Module
