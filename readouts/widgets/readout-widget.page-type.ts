import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const readoutWidget = {
  id: "01a05480-1c86-7e95-b799-63b1c0152f62",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "readout-widget",
  definition: "one tile a person places on a phone",
  pluralSlug: "readout-widgets",
  parts: [
    "readout-widget/alanwalton-attribute-stoplights",
    "readout-widget/alanwalton-categorize",
    "readout-widget/alanwalton-claude-usage",
    "readout-widget/alanwalton-inbox-stoplights",
    "readout-widget/alanwalton-safety-level",
    "readout-widget/alanwalton-surplus",
    "readout-widget/alanwalton-upkeep-stoplights",
    "readout-widget/smilingjenny-categorize",
    "readout-widget/smilingjenny-safety-level",
    "readout-widget/smilingjenny-surplus",
    "instant-property/last-tapped-at",
    "number-property/taps",
    "relation-property/app",
    "relation-property/component",
    "text-property/caption",
    "text-property/families",
    "url-property/feed",
    "text-property/gallery-description",
    "text-property/gallery-name",
    "text-property/kind",
    "text-property/opens",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "relation-property/app", required: true, many: false },
    { pageProperty: "relation-property/component", required: true, many: false },
    { pageProperty: "text-property/kind", required: true, many: false },
    { pageProperty: "text-property/families", required: true, many: true, maxCount: null },
    { pageProperty: "url-property/feed", required: true, many: false },
    { pageProperty: "text-property/caption", required: false, many: false },
    { pageProperty: "text-property/gallery-name", required: true, many: false },
    { pageProperty: "text-property/gallery-description", required: true, many: false },
    { pageProperty: "text-property/opens", required: false, many: false },
    {
      pageProperty: "relation-property/groups",
      required: true,
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
      statement: "A widget has the words the gallery prints and nothing the tile draws.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The name a placed tile is bound to cannot change without the tile falling off the phone.",
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
