import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Definition } from "./properties/definition.standard-agent-english-property.ts"
import type { Directives } from "./properties/directives.record-property.ts"
import type { Expands } from "./properties/expands.boolean-property.ts"
import type { Invariants } from "./properties/invariants.record-property.ts"
import type { PartSlugs } from "./properties/part-slugs.relation-property.ts"
import type { Parts } from "./properties/parts.relation-property.ts"
import type { PluralSlug } from "./properties/plural-slug.text-property.ts"

export type Domain = Page & {
  definition: Definition
  pluralSlug?: PluralSlug
  partSlugs?: PartSlugs
  invariants?: Invariants
  directives?: Directives
  expands?: Expands
  parts?: Parts
}

export const domain = {
  id: "01a049c8-3ead-7c52-9ab6-88767954ed5f",
  partSlugs: [
    "boolean-property/expands",
    "record-property/directives",
    "record-property/invariants",
    "relation-property/directive-kind",
    "relation-property/page-domain",
    "relation-property/invariant-kind",
    "relation-property/part-slugs",
    "standard-agent-english-property/act",
    "standard-agent-english-property/aids",
    "standard-agent-english-property/definition",
    "standard-agent-english-property/invariant-statement",
    "text-property/name",
    "text-property/plural-slug",
    "standard-agent-english-property/warrant",
    "relation-property/parts",
  ],
  pageTypeSlug: "page-type",
  slug: "domain",
  definition: "a bounded area of concern",
  pluralSlug: "domains",
  extends: ["page-type/page"],
  properties: [
    { pagePropertySlug: "standard-agent-english-property/definition", required: true, many: false },
    { pagePropertySlug: "text-property/plural-slug", required: false, many: false },
    {
      pagePropertySlug: "relation-property/part-slugs",
      required: false,
      many: true,
      maxCount: null,
    },
    { pagePropertySlug: "record-property/invariants", required: false, many: true, maxCount: null },
    { pagePropertySlug: "record-property/directives", required: false, many: true, maxCount: null },
    { pagePropertySlug: "boolean-property/expands", required: false, many: false },
    { pagePropertySlug: "relation-property/parts", required: false, many: true, maxCount: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is a domain by its page type rather than by the folder the page sits in.",
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
      statement: "A domain stays even when nothing needs that domain any more.",
    },
    {
      invariantKind: "departure",
      statement: "A domain goes only when that domain no longer fits the structure.",
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
