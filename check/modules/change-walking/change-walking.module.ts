import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const changeWalking = {
  id: "01a0583c-9b26-78cf-972c-3801c6b1ad94",
  type: "module",
  slug: "change-walking",
  definition: "how a check reaches the text it judges",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here loads a check.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A selector says the input a check takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page types are changes is read from what each page type extends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type extending a change through another page type is a change too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body read as code is named `.ts` or `.tsx`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body read as a stylesheet is named `.css`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check judging both reaches code and stylesheets through one selector.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A selector takes as input every path the selector hands over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a change holds the input a check takes is answered here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A runner carrying an input is run only over a change holding a path it takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A selector names a path before reading it, so a path it drops is never opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A selector over texts is told the index the change leaves as well as the path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page an entry file sits beside is answered here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which section names an entry file is read from the index rather than listed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page an entry file sits beside is composed out of that file's own name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page composed that way is answered only where that page is there to read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A selector over pages and their entry files takes both as input.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check judging a path the change takes away walks the change itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that is there and will not open refuses the check reading that body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal for a body that will not open names the path that body is at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path nothing sits at reads as nothing rather than as unreadable.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path a folder sits at reads as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder has no body a check judges.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Git tracks the link a package is reached by.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "That link leads to a folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A walk over everything takes the files in the tree rather than the files the index names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which files those are is `tree-searching`'s listing rather than a walk of git's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That listing answers the paths git answers, and answers them sooner.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A root that is no tree refuses the walk rather than taking nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A root no file sits under is what that refusal rests on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is opened rather than looked for and then opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that is not text refuses the check reading that body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal for a body that is not text names the path that body is at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit reading each text in the tree reads that text through this module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check refusing a body that is not text reads that body through this module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check reading a body leniently reaches `body-text` rather than this module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change held over a run reads each path once and answers from that read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path taken away after that read is answered with the body that read got.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that will not open refuses the run rather than being held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The index is no file of the tree's, however git holds it, and is walked by nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A selector over bodies is told the index the change leaves as well as the path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A selector hands each body over as it is read rather than reading every body first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change naming no path is what a run judging the whole tree is opened with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a change walks nothing, so a run wanting no walk pays for none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages of named types are collected by searching for the names those pages have.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That search is made by ripgrep, which answers the paths git would answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A search finding no page answers no path rather than refusing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Naming no type collects nothing, and asks for no search.",
    },
  ],
} as const satisfies Module
