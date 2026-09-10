import type { PageType } from "@akasha/pages/page-type"

export const persona = {
  id: "01a0532a-a54d-76e7-98f5-57ff3efc6492",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "persona",
  definition: "a part of Alan's life personified as someone who answers for it",
  pluralSlug: "personas",
  extends: ["page-type/domain"],
  detailConfig: {
    display: "persona",
    frame: {
      autoScroll: {
        loadScroll: "end",
      },
    },
  },
  parts: [
    "computed-property/persona-relationship-level",
    "file-property/appearance",
    "file-property/desktop-wallpaper",
    "file-property/mobile-wallpaper",
    "file-property/portrait",
    "relation-property/championed-domain",
    "relation-property/origin",
    "text-property/history",
    "text-property/last-messaged-at",
    "text-property/purpose",
    "text-property/voice-instruction",
    "text-property/voice-reference-sha256",
    "number-property/green-day-points",
  ],
  properties: [
    { pageProperty: "text-property/purpose", required: false, many: false },
    { pageProperty: "file-property/portrait", required: false, many: false },
    { pageProperty: "file-property/appearance", required: false, many: false },
    { pageProperty: "relation-property/role", required: false, many: false },
    { pageProperty: "text-property/value-slug", required: false, many: false },
    { pageProperty: "relation-property/origin", required: false, many: false },
    { pageProperty: "email-address-property/email-address", required: false, many: false },
    { pageProperty: "phone-number-property/phone", required: false, many: false },
    { pageProperty: "relation-property/championed-domain", required: false, many: false },
    { pageProperty: "text-property/voice-instruction", required: false, many: false },
    { pageProperty: "text-property/voice-reference-sha256", required: false, many: false },
    { pageProperty: "number-property/green-day-points", required: false, many: false },
    {
      pageProperty: "number-property/points-before-today",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "number-property/points-today",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "number-property/points-total",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "computed-property/persona-relationship-level",
      required: false,
      many: false,
    },
    { pageProperty: "text-property/history", required: false, many: false },
    {
      pageProperty: "text-property/last-messaged-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pageProperty: "file-property/desktop-wallpaper", required: false, many: false },
    { pageProperty: "file-property/mobile-wallpaper", required: false, many: false },
  ],
  worked: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A persona is alone in a folder.",
    },
    {
      invariantKind: "departure",
      statement: "Her portrait is a file beside her page.",
    },
    {
      invariantKind: "departure",
      statement: "A persona's appearance is a second file beside that persona's page.",
    },
    {
      invariantKind: "departure",
      statement: "The default persona personifies nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A seat has a persona other than the default only when its principal is a person.",
    },
    {
      invariantKind: "departure",
      statement: "Every seat whose principal is a person has a persona other than the default.",
    },
    {
      invariantKind: "departure",
      statement: "No persona sits in two seats that are not a handler's.",
    },
    {
      invariantKind: "departure",
      statement: "The rules on addressing Alan do not reach a persona's own words.",
    },
    {
      invariantKind: "departure",
      statement: "The rules on plain words do not reach a persona's own voice.",
    },
    {
      invariantKind: "departure",
      statement:
        "A persona's total points and the rung those points reach are carried on her own page.",
    },
    {
      invariantKind: "departure",
      statement: "A persona earns one point for every hundred messages Alan writes her.",
    },
    {
      invariantKind: "departure",
      statement: "Every persona earns her points the same way.",
    },
    {
      invariantKind: "absence",
      statement: "A persona's conversation is not kept as a page.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Only Hers",
      act: "Obey a persona's directives only when you are her.",
      warrant: "Persona pages are read across the cast, so hers reach seats that are not her.",
      aids: [
        "Reading her page is not being handed her voice.",
        "Writing her directives is not taking them on.",
      ],
    },
  ],
  types: "ts",
} as const satisfies PageType
