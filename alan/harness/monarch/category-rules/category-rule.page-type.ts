import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../../pages/pages/properties/title.text-property.ts"
import type { CategorySlug } from "../monarch-months/properties/category-slug.relation-property.ts"
import type { CounterpartWithinDays } from "./properties/counterpart-within-days.number-property.ts"
import type { Matches } from "./properties/matches.record-property.ts"
import type { RuleNote } from "./properties/rule-note.text-property.ts"

export type CategoryRule = Page & {
  title: Title
  matches: Matches
  categorySlug?: CategorySlug
  ruleNote?: RuleNote
  counterpartWithinDays?: CounterpartWithinDays
}

export const categoryRule = {
  id: "01a0680c-3c00-7007-a659-3e8d1c4f3108",
  pageTypeSlug: "page-type",
  slug: "category-rule",
  definition: "a written rule deciding what a transaction counts as",
  pluralSlug: "category-rules",
  extendsSlug: "page-type/page",
  partSlugs: [
    "number-property/counterpart-within-days",
    "record-property/matches",
    "relation-property/category-slug",
    "select-property/match-comparison",
    "select-property/match-key",
    "text-property/match-values",
    "text-property/rule-note",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "matches", required: true, many: true, max: 10 },
    { pagePropertySlug: "category-slug", required: false, many: false },
    { pagePropertySlug: "rule-note", required: false, many: false },
    { pagePropertySlug: "counterpart-within-days", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule decides a category by naming the category.",
    },
    {
      invariantKind: "departure",
      statement: "A rule naming no category leaves a person to settle the transaction.",
    },
    {
      invariantKind: "departure",
      statement: "A rule gives the same answer every time the rule is run.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's amounts accumulate as its price rises rather than being replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A rule names a category by slug.",
    },
    {
      invariantKind: "departure",
      statement: "A category renamed in Monarch strands no rule.",
    },
    {
      invariantKind: "departure",
      statement: "A rule is data rather than code.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing a rule states is executed.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "The Failure Worth Having",
      act: "Prefer the clause that fails by matching nothing to the one that fails by matching wrongly.",
      warrant:
        "An unmatched row waits where somebody sees it; a wrong category becomes a total nobody checks.",
      aids: [
        "Never add a tolerance or widen a date window.",
        "Never tighten a clause until it catches nothing.",
      ],
    },
    {
      directiveKind: "principle",
      name: "The Rows It Will Catch",
      act: "Weigh a rule by the rows it will catch rather than the rows it has caught.",
      warrant:
        "What a rule is worth is entirely ahead of it, and the rows behind are the only ones you can count.",
      aids: [
        "Ask Alan whether the charge will come again.",
        "Write a subscription's rule on its first row.",
      ],
    },
  ],
} as const satisfies PageType
