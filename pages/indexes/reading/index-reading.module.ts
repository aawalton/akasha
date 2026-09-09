import type { Module } from "@akasha/code/module"

export const indexReading = {
  id: "01a04bdd-596c-7b76-9978-92ebfa6a20e4",
  pageTypeSlug: "module",
  type: "module",
  slug: "index-reading",
  definition: "the answers the index gives back, each one a file read",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The value every page has is answered as one map from path to value.",
    },
    {
      invariantKind: "departure",
      statement: "An answer about one page is one file read or one directory listed.",
    },
    {
      invariantKind: "departure",
      statement: "The files sitting in one folder are one directory listed.",
    },
    {
      invariantKind: "departure",
      statement: "The folders sitting in one folder are that same directory listed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name saying no page type costs one read for each page type the name might be filed under.",
    },
    {
      invariantKind: "departure",
      statement: "A directory listed is one page type's own.",
    },
    {
      invariantKind: "departure",
      statement: "A directory listed grows with that type and not with the pages.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index names is answered as a path rather than as the entry.",
    },
    {
      invariantKind: "departure",
      statement: "A page an address names is answered under the page type that address states.",
    },
    {
      invariantKind: "departure",
      statement: "A page unique within a scope is answered under that scope's property and value.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no page is filed under is answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "A question is refused only where the index the question reads is not there.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the index is there is asked at the root of the index by every read here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder with no file is a population with no members rather than an unwritten index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tree missing beneath an index that stands is an empty answer rather than a refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "An address stating no page type is answered under the page type its caller names.",
    },
    {
      invariantKind: "departure",
      statement: "Every path the index files is answered by reading the one file with them.",
    },
    {
      invariantKind: "departure",
      statement: "Those paths come back in the order they were filed rather than sorted again.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is the pages themselves.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks a tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "The importers of a file are refused when the index and HEAD differ in a path that makes an edge.",
    },
    {
      invariantKind: "departure",
      statement: "A caller filing a change reads those importers without that refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A caller filing a change names no root.",
    },
    {
      invariantKind: "departure",
      statement: "An index's path under the root is said here alone.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages name a page is read from the index the asking names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller naming an index in a refusal says the path reached rather than spelling that path again.",
    },
    {
      invariantKind: "departure",
      statement: "A reader here takes the repository root or a reading of the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "The slug a page type's pages are filed under is answered from that page type's id.",
    },
    {
      invariantKind: "departure",
      statement: "That slug is read off the name of the file with the id.",
    },
    {
      invariantKind: "departure",
      statement: "The value every page of one page type carries is one file read.",
    },
    {
      invariantKind: "departure",
      statement: "The pages of one page type are answered by path as one map.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer about the pages of one page type is drawn from that one read.",
    },
    {
      invariantKind: "departure",
      statement: "A line that will not read is left out rather than refusing the rest.",
    },
    {
      invariantKind: "absence",
      statement: "An answer about one page reads no stamp.",
    },
    {
      invariantKind: "departure",
      statement: "An answer drawn from one reading is answered once for that reading and held.",
    },
    {
      invariantKind: "departure",
      statement:
        "The value the pages of one page type carry is held for the reading and that page type together.",
    },
    {
      invariantKind: "departure",
      statement: "An answer held is let go when the reading it was drawn from is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller naming a root is answered afresh, that root building a reading of its own each ask.",
    },
  ],
} as const satisfies Module
