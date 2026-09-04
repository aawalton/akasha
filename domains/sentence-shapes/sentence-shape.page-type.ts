import type { Module } from "@akasha/code-system/module"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Allowed } from "./properties/allowed.boolean-property.ts"
import type { Reason } from "./properties/reason.text-property.ts"
import type { Rules } from "./properties/rules.text-property.ts"
import type { ShapePattern } from "./properties/shape-pattern.text-property.ts"

export type SentenceShape = Module & {
  test: NonNullable<Module["test"]>
  allowed?: Allowed
  rules?: readonly Rules[]
  pattern?: ShapePattern
  reason?: Reason
}

export const sentenceShape = {
  id: "01a05da1-60fc-76ca-8503-b43deb6d5f53",
  pageTypeSlug: "page-type",
  slug: "sentence-shape",
  definition: "one shape a sentence takes, and whether akasha writes in it",
  pluralSlug: "sentence-shapes",
  extendsSlug: ["page-type/module"],
  partSlugs: [
    "boolean-property/allowed",
    "text-property/reason",
    "text-property/rules",
    "text-property/shape-pattern",
    "sentence-shape/closing-count",
    "sentence-shape/lone-determiner",
    "sentence-shape/lone-pronoun",
    "sentence-shape/lone-quantifier",
    "sentence-shape/partitive-quantifier",
  ],
  properties: [
    { pagePropertySlug: "test", required: true, many: false },
    { pagePropertySlug: "allowed", required: false, many: false },
    { pagePropertySlug: "rules", required: false, many: true, max: null },
    { pagePropertySlug: "shape-pattern", required: false, many: false },
    { pagePropertySlug: "reason", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shape akasha refuses is written down rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "A shape is found by the predicate the shape's own code holds.",
    },
    {
      invariantKind: "departure",
      statement: "A predicate reads the dependency tree rather than the words themselves.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shape's test names a sentence the predicate finds and a sentence the predicate passes over.",
    },
    {
      invariantKind: "departure",
      statement: "A shape akasha refuses says the fact that shape is refused on.",
    },
    {
      invariantKind: "departure",
      statement: "Alan approves every shape akasha writes in.",
    },
    {
      invariantKind: "departure",
      statement: "A shape refused or not yet weighed needs no approval.",
    },
    {
      invariantKind: "departure",
      statement: "A shape stating no `allowed` is admitted until that shape is decided.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shape is weighed by the load the shape costs a reader rather than by how the shape reads.",
    },
    {
      invariantKind: "departure",
      statement: "A shape no rewrite beats is not thereby allowed.",
    },
    {
      invariantKind: "absence",
      statement: "A shape says nothing about what a sentence means.",
    },
    {
      invariantKind: "gap",
      statement: "The check reads the predicate every refused shape holds.",
    },
    {
      invariantKind: "stopgap",
      statement: "The rules and the pattern are kept until the grammar those two fed goes.",
    },
    {
      invariantKind: "departure",
      statement: "No shape states rules.",
    },
    {
      invariantKind: "departure",
      statement: "The grammar built from rules refuses nothing.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Alan Approves Sentence Shapes",
      act: "Set `allowed` true on a sentence shape only where Alan has approved that shape.",
      warrant:
        "An approved shape enters the grammar, and every sentence written after it is judged by it.",
      aids: [
        "A shape refused or undecided lands without approval.",
        "A shape inferred from a past answer is not approved.",
        "A yes to a plan holding an approval is not that approval.",
        "Approving one shape is not approving another.",
      ],
    },
    {
      directiveKind: "rule",
      name: "A Simpler Rewrite Refuses",
      act: "Refuse a shape whose sentences can consistently be rewritten simpler, plainer and clearer.",
      warrant:
        "A shape kept where a rewrite always beats it spends reader load on every sentence written in it.",
      aids: [
        "One better rewrite is evidence rather than a decision.",
        "Consistently means ten cases akasha holds, or all of them where akasha holds fewer.",
        "A rewrite losing a fact has not beaten the shape.",
        "A rewrite the grammar refuses has not beaten the shape.",
        "Repeating a noun is not a cost.",
      ],
    },
  ],
} as const satisfies PageType
