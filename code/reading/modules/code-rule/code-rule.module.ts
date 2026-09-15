import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeRule = {
  id: "01a04ea7-b2ea-74df-8173-b596f1d191cc",
  type: "module",
  slug: "code-rule",
  definition: "what a function does, read so that renaming it or what it binds says nothing new",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Two functions say the same thing when their shapes match with each bound name read as its order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A name the function does not bind is read as written unless a name it binds is spelt the same.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name a destructuring pattern binds is read as its order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shorthand name in an object pattern is read as written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shorthand name names the property that pattern reads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether the file exports a function is answered beside its rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a function only passes names along is answered beside its rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body with a literal or an operator says something of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body holding no literal and no operator only passes names along.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a body is built only out of literals is answered beside its rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body is built that way where the body answers one literal and does nothing else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An object or an array is a literal where every key is a name and every value is a literal.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name held as a value leaves the body built out of more than literals.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A template joining names is no literal however many names that template joins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A backtick string with no name is a literal as a quoted string is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration with no body says no rule rather than saying an empty rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The source is parsed with parent links.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body spelling neither `function` nor `=>` is answered without a parse.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A function's export status is answered by climbing to the statement with that function.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Only a function is read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A rule spelled inline as an expression bound to nothing says no rule here whatsoever.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name bound to a call answering a function says no rule either.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Only a renaming is defeated, and not one onto a name the code cannot rename.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "The same rule written as a loop for a call or with statements reordered reads as another rule.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A rule is the thing the source says.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The use a rule is put to is answered elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A parameter's type annotation is a name the function does not bind and is read as written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A function's type predicate is read as part of that function's rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type predicate is read between the parameters and the body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name a type predicate narrows is read as its order.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A return type that is no type predicate is read as nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A type declared on the name a function is bound to is read as nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Two names for one type are two rules here.",
    },
  ],
} as const satisfies Module
