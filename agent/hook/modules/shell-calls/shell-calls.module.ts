import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shellCalls = {
  id: "01a04eab-4522-7000-9e89-8627b48fbcc5",
  type: "module",
  slug: "shell-calls",
  definition: "a shell command line cut into the segments and words it carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line continuation is joined before the line is cut.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A quoted run with one bare word is unquoted before the cut.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other quoted run is taken out before the cut.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A newline cuts as a separator does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body a heredoc has is written rather than run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body is taken out from the line opening that body to the line ending that body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The line opening a body is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A redirect on the line opening a body is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body opening a heredoc of its own opens nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An opening the text never ends takes no line out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A herestring opens no body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every separator form cuts too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty segment is dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Leading space is taken off the ones kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word is matched by its basename.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prefix that only runs the call behind the prefix is stepped over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prefix's own flags are stepped over with the prefix.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prefix flag taking a value takes the word after that flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prefix takes the numbers the prefix is named as taking and no other word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prefix flag that asks rather than runs leaves no call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prefix behind a prefix is stepped over too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A variable assignment before a call is stepped over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The text is cut here rather than read for the text's meaning.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No tool a hook guards is named here.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "This module reads a shell command line without being a shell.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A shell marks no word as a word that runs the call behind that word.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Every hook cuts a command line the same way without saying how twice.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A prefix this module does not name hides the call behind that prefix from every hook.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "An assignment whose value the shell rewrites hides the call in that value from every hook.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A substitution in command position is read as part of the command word.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A subshell's opening parenthesis is read as part of the command word.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A variable in command position is read as that variable rather than its value.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A double-quoted substitution is taken out whole, leaving the line no segment.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A call a substitution, a subshell or a variable holds is found as a call on the line is.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A call a prefix or an assignment's value holds is found as a call on the line is.",
    },
  ],
} as const satisfies Module
