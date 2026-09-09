import type { Module } from "@akasha/code/module"
import type { PageType } from "../types/page-type.page-type.ts"

export type NameFormat = Module

export const nameFormat = {
  id: "01a04eaf-67bf-7b05-9aef-8137a7c25513",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "name-format",
  definition: "how a name's parts are joined and capitalized",
  pluralSlug: "name-formats",
  parts: [
    "module/format-reaching",
    "module/name-matching",
    "name-format/lower-camel-case",
    "name-format/lower-kebab-case",
    "name-format/lower-snake-case",
    "name-format/lower-uuid",
    "name-format/sentence-case",
    "name-format/start-case",
    "name-format/title-case",
    "name-format/upper-camel-case",
    "name-format/upper-snake-case",
    "name-format/upper-uuid",
  ],
  extends: ["page-type/module"],
  loadedBy: "module/format-reaching",
  properties: [{ pageProperty: "code-file-property/test", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name format judges a name and writes a name.",
    },
    {
      invariantKind: "departure",
      statement: "The formats are the pages of this type rather than a list written in a check.",
    },
    {
      invariantKind: "departure",
      statement: "A format has the words of a name unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A format says only how the words are joined.",
    },
    {
      invariantKind: "gap",
      statement:
        "Converting between lower-kebab-case and lower-camel-case is owned by their pages alone.",
    },
    {
      invariantKind: "departure",
      statement: "A key in a format akasha defines is lower camel case.",
    },
    {
      invariantKind: "departure",
      statement: "A key in a format another system defines is spelled that system's way.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Same Words Everywhere",
      act: "Give a name the same words in every place, in the format that place uses.",
      warrant: "The words have the meaning; the format belongs to the place.",
      aids: [
        "Change a name's format where it crosses over.",
        "Never change its words to fit a format.",
      ],
    },
  ],
} as const satisfies PageType
