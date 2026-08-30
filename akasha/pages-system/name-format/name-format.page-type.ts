import type { Module } from "../../code-system/module/module.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type NameFormat = Module

export const nameFormat = {
  id: "01a04eaf-67bf-7b05-9aef-8137a7c25513",
  pageTypeSlug: "page-type",
  slug: "name-format",
  definition: "how a name's parts are joined and capitalized",
  pluralSlug: "name-formats",
  partSlugs: [
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
  extendsSlug: "page-type/module",
  loadedBySlug: "module/format-reaching",
  properties: [{ pagePropertySlug: "test", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name format both judges a name and writes one.",
    },
    {
      invariantKind: "departure",
      statement: "The formats are the pages of this type, never a list written in a check.",
    },
    {
      invariantKind: "departure",
      statement: "A format holds the words of a name unchanged, and says only how they are joined.",
    },
    {
      invariantKind: "gap",
      statement:
        "Converting between lower-kebab-case and lower-camel-case is owned by their pages rather than by loose modules.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Same Words Everywhere",
      act: "Give a name the same words in every place, in the format that place uses.",
      warrant: "The words carry the meaning; the format belongs to the place.",
      aids: [
        "Change a name's format where it crosses over.",
        "Never change its words to fit a format.",
      ],
    },
  ],
} as const satisfies PageType
