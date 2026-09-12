import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const readoutWidget = {
  id: "01a05480-1c86-7e95-b799-63b1c0152f62",
  type: "page-type",
  slug: "readout-widget",
  definition: "one tile a person places on a phone",
  pluralSlug: "readout-widgets",
  parts: [
    "instant-property/last-tapped-at",
    "number-property/taps",
    "readout-widget/alanwalton-attribute-stoplights",
    "readout-widget/alanwalton-categorize",
    "readout-widget/alanwalton-claude-usage",
    "readout-widget/alanwalton-cost",
    "readout-widget/alanwalton-inbox-stoplights",
    "readout-widget/alanwalton-safety-level",
    "readout-widget/alanwalton-surplus",
    "readout-widget/alanwalton-upkeep-stoplights",
    "readout-widget/smilingjenny-categorize",
    "readout-widget/smilingjenny-cost",
    "readout-widget/smilingjenny-safety-level",
    "readout-widget/smilingjenny-surplus",
    "readout-widget/smilingjenny-upkeep-stoplights",
    "relation-property/app",
    "relation-property/component",
    "text-property/caption",
    "text-property/families",
    "text-property/gallery-description",
    "text-property/gallery-name",
    "text-property/kind",
    "text-property/opens",
    "url-property/feed",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "relation-property/app", required: true, many: false },
    { pageProperty: "relation-property/component", required: true, many: false },
    { pageProperty: "text-property/kind", required: true, many: false },
    { pageProperty: "text-property/families", required: true, many: true, maxCount: null },
    { pageProperty: "url-property/feed", required: false, many: false },
    { pageProperty: "text-property/caption", required: false, many: false },
    { pageProperty: "text-property/gallery-name", required: true, many: false },
    { pageProperty: "text-property/gallery-description", required: true, many: false },
    { pageProperty: "text-property/opens", required: false, many: false },
    {
      pageProperty: "relation-property/groups",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/place", required: true, many: false },
    { pageProperty: "number-property/taps", required: false, many: false, uncommitted: true },
    {
      pageProperty: "instant-property/last-tapped-at",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A widget names the component the widget is drawn in rather than the file's path.",
    },
    {
      invariantKind: "departure",
      statement: "A widget draws groups rather than readings.",
    },
    {
      invariantKind: "departure",
      statement: "A tile drawing what the tiles themselves are doing names no feed and no group.",
    },
    {
      invariantKind: "departure",
      statement: "A widget has the words the gallery prints and nothing the tile draws.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The name a placed tile is bound to cannot change without the tile falling off the phone.",
    },
    {
      invariantKind: "constraint",
      statement: "A tile is granted forty to seventy reloads a day.",
    },
    {
      invariantKind: "constraint",
      statement: "The reloads a tile is granted move with how often that tile is looked at.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Each placed tile is granted reloads of its own rather than reloads an app shares out.",
    },
    {
      invariantKind: "constraint",
      statement: "A tile's entries cost that tile nothing and its reloads alone are counted.",
    },
    {
      invariantKind: "constraint",
      statement: "A tile is not reloaded twice inside five minutes however near its next entry is.",
    },
    {
      invariantKind: "constraint",
      statement: "A reload asked for while the app is in front is not counted against the grant.",
    },
    {
      invariantKind: "constraint",
      statement: "A tile asked to reload is not promised a reload.",
    },
    {
      invariantKind: "constraint",
      statement: "A push reloading a tile is rationed apart from that tile's own reloads.",
    },
    {
      invariantKind: "constraint",
      statement: "Time is the only thing a tile redraws while nothing of the tile's is running.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A tile under WidgetKit developer mode reloads at a rate the phone will not grant.",
    },
    {
      invariantKind: "departure",
      statement: "Every tile of an app is reloaded when that app comes forward.",
    },
    {
      invariantKind: "departure",
      statement: "A widget's link names that widget in the link's fragment.",
    },
    {
      invariantKind: "departure",
      statement: "A widget carries how many taps that widget has taken.",
    },
    {
      invariantKind: "departure",
      statement: "A widget carries when that widget was last tapped.",
    },
    {
      invariantKind: "departure",
      statement: "The taps a widget has taken are carried outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A tap is counted by reading the count and writing the count back.",
    },
    {
      invariantKind: "stopgap",
      statement: "A tap arriving while another tap is being recorded is lost.",
    },
    {
      invariantKind: "gap",
      statement: "Every tap a widget takes is counted.",
    },
  ],
  types: "ts",
} as const satisfies PageType
