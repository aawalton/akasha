import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shellCalls = {
  id: "01a04eab-4522-7000-9e89-8627b48fbcc5",
  type: "page-type/module",
  slug: "shell-calls",
  definition: "a shell command line read into the calls and words it carries",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The line is read by a bash parser, `unbash`, rather than cut as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line continuation joins the two lines it parts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quoted run is one word, and that word is unquoted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A space inside one word reaches a hook as a mark rather than as a space.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tilde a quote keeps from the shell reaches a hook as a folder here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A newline parts two calls as a separator does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every separator form parts two calls too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body a heredoc has is written rather than run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body ends only at a line that is its whole delimiter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The call opening a body is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A redirect on the call opening a body is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body opening a heredoc of its own opens nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A herestring opens no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A substitution in a body opened bare is run, so the call it holds is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A redirect is read after the words of its call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A redirect on a group is read as a segment of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty segment is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call a substitution or backticks hold is read as a call on the line is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call a subshell or a group holds is read as a call on the line is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call an assignment's value holds is read as a call on the line is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A double-quoted substitution is read as the calls it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call a loop, a condition, a case, a test or a function holds is read as a call on the line is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script a shell is handed by `-c`, a heredoc or a herestring is read as calls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script handed to `eval` is read as calls on the line are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A variable the line assigns is read as its value.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A variable the line never assigns is read as that variable rather than its value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line the parser cannot read whole is read again one line at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every call either reading of that line finds is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word is matched by its basename.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prefix that only runs the call behind the prefix is stepped over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prefix's own flags are stepped over with the prefix.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prefix flag taking a value takes the word after that flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prefix takes the numbers the prefix is named as taking and no other word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prefix flag that asks rather than runs leaves no call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prefix behind a prefix is stepped over too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A variable assignment before a call is stepped over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No tool a hook guards is named here.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "This module reads a shell command line without being a shell.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A shell marks no word as a word that runs the call behind that word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every hook reads a command line the same way without saying how twice.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A prefix this module does not name hides the call behind that prefix from every hook.",
    },
  ],
} as const satisfies Module
