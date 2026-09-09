import type { Module } from "@akasha/code/module"

export const widgetTapAnswering = {
  id: "01a078aa-cea1-71ff-8aa2-0b3766623b39",
  pageTypeSlug: "module",
  type: "module",
  slug: "widget-tap-answering",
  definition: "what a route answers when the app says a widget was tapped",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The test proving this code sits beside the route serving this code.",
    },
    {
      invariantKind: "departure",
      statement: "A tap is admitted on the account the caller is signed in as.",
    },
    {
      invariantKind: "departure",
      statement: "A caller who is not signed in is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming no widget is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no widget page has is answered as no widget rather than as a tap.",
    },
    {
      invariantKind: "departure",
      statement: "The answer has the count the tap left.",
    },
    {
      invariantKind: "departure",
      statement: "An answer to the native shell has the cross-origin headers that shell needs.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a link.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the page store.",
    },
  ],
} as const satisfies Module
