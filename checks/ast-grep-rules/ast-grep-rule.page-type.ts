import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Rule } from "./properties/rule.file-property.ts"

export type AstGrepRule = Domain & {
  rule: Rule
}

export const astGrepRule = {
  id: "01a08192-1dcf-73c5-a1af-d500aa2b0925",
  pageTypeSlug: "page-type",
  slug: "ast-grep-rule",
  definition: "one syntax pattern ast-grep refuses a source file for matching",
  pluralSlug: "ast-grep-rules",
  partSlugs: ["file-property/rule"],
  extendsSlug: ["page-type/domain"],
  properties: [{ pagePropertySlug: "file-property/rule", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The id a rule is reported under is stated in the rule file rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A rule matching no file is a violation of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A rule file is found by the config naming the directory that rule file is in.",
    },
  ],
} as const satisfies PageType
