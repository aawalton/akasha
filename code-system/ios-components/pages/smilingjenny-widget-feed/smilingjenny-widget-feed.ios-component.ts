import type { IosComponent } from "../../ios-component.page-type.types.ts"

export const smilingjennyWidgetFeed = {
  id: "01a05835-69dc-778f-bb4b-dd897c3cb3e7",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "smilingjenny-widget-feed",
  definition: "the fetch every tile of Jenny's app draws from",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The credential is baked into the build rather than read as the tile is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A feed names the moment its tile changes on its own or names no moment.",
    },
    {
      invariantKind: "departure",
      statement: "A feed naming no moment is given the one entry and the one refresh it had.",
    },
    {
      invariantKind: "departure",
      statement: "A feed naming a moment still to come is given a second entry at that moment.",
    },
    {
      invariantKind: "departure",
      statement: "The second entry is the payload already in hand held against a later date.",
    },
    {
      invariantKind: "absence",
      statement: "The second entry fetches nothing and is no refresh.",
    },
    {
      invariantKind: "departure",
      statement: "A moment already past is given no entry rather than an entry in the past.",
    },
    {
      invariantKind: "departure",
      statement: "The refresh stays fifteen minutes out however near the named moment is.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A widget is granted fewer reloads a day than a refresh every fifteen minutes asks.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A surplus falling thirty-two an hour reaches the rung four under it in seven minutes.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Refreshing at each moment named would spend in one costly block a whole day of reloads.",
    },
    {
      invariantKind: "absence",
      statement: "A moment named carries no word on whether the server's reading changed.",
    },
  ],
} as const satisfies IosComponent
