import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Definition } from "./properties/definition.text-property.ts"
import type { Directives } from "./properties/directives.record-property.ts"
import type { DomainSettled } from "./properties/domain-settled.boolean-property.ts"
import type { Expands } from "./properties/expands.boolean-property.ts"
import type { Invariants } from "./properties/invariants.record-property.ts"
import type { PartSlugs } from "./properties/part-slugs.relation-property.ts"
import type { PluralSlug } from "./properties/plural-slug.text-property.ts"

export type Domain = Page & {
  definition: Definition
  pluralSlug?: PluralSlug
  partSlugs?: PartSlugs
  invariants?: Invariants
  directives?: Directives
  settled?: DomainSettled
  expands?: Expands
}

export const domain = {
  id: "01a049c8-3ead-7c52-9ab6-88767954ed5f",
  partSlugs: [
    "boolean-property/domain-settled",
    "boolean-property/expands",
    "domain/domain-championing",
    "domain/domain-parent",
    "record-property/directives",
    "record-property/invariants",
    "relation-property/directive-kind",
    "relation-property/domain-slug",
    "relation-property/invariant-kind",
    "relation-property/part-slugs",
    "text-property/act",
    "text-property/aids",
    "text-property/definition",
    "text-property/invariant-statement",
    "text-property/name",
    "text-property/plural-slug",
    "text-property/warrant",
  ],
  pageTypeSlug: "page-type",
  slug: "domain",
  definition: "a bounded area of concern",
  pluralSlug: "domains",
  extendsSlug: "page-type/page",
  properties: [
    { pagePropertySlug: "definition", required: true, many: false },
    { pagePropertySlug: "plural-slug", required: false, many: false },
    { pagePropertySlug: "part-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "invariants", required: false, many: true, max: null },
    { pagePropertySlug: "directives", required: false, many: true, max: null },
    { pagePropertySlug: "domain-settled", required: false, many: false },
    { pagePropertySlug: "expands", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What makes a page a domain is its page type rather than the folder the page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "Everything a domain carries could matter to every domain beneath that domain.",
    },
    {
      invariantKind: "departure",
      statement: "A domain is never weighed against how many domains there are.",
    },
    {
      invariantKind: "departure",
      statement:
        "A slug and a definition is a whole domain rather than a stub waiting to be filled in.",
    },
    {
      invariantKind: "departure",
      statement: "A domain stays even when nothing needs it any more.",
    },
    {
      invariantKind: "departure",
      statement: "A domain goes only when it no longer fits the structure.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Alan Approves Directives",
      act: "Add a directive to a domain only where Alan has approved that directive.",
      warrant:
        "A directive binds every reader of a domain, and a wrong one is obeyed until noticed.",
      aids: [
        "Approving the initiative is not approving a directive.",
        "A directive replacing an old one still needs approval.",
        "Deleting one is changing it.",
        "A definition or an invariant needs none.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Single Authority",
      act: "Bind each claim from exactly one document.",
      warrant:
        "Where two documents bind one claim, their disagreement is a contradiction nothing can settle.",
      aids: [
        "Never summarise a claim another document binds.",
        "Delete the old line when you move a claim.",
      ],
    },
  ],
} as const satisfies PageType
