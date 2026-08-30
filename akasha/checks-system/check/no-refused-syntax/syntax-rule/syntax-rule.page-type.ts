import type { SourceFile } from "typescript"
import type { Module } from "../../../../code-system/module/module.page-type.ts"
import type { Test } from "../../../../code-system/module/properties/test.file-property.ts"
import type { PageType } from "../../../../pages-system/page-type/page-type.page-type.ts"

export type SyntaxRule = Module & {
  test: Test
}

export type Standing = {
  readonly path: string
  readonly source: SourceFile
}

export type Refusal = {
  readonly line: number
  readonly reason: string
}

export type Judging = (standing: Standing) => readonly Refusal[]

export const syntaxRule = {
  id: "01a0500d-738b-79f3-8932-7d947cd9b51b",
  pageTypeSlug: "page-type",
  slug: "syntax-rule",
  definition: "a pattern a source file may not carry",
  pluralSlug: "syntax-rules",
  partSlugs: [
    "syntax-rule/exhaustive-dispatch",
    "syntax-rule/no-credential-in-script-text",
    "syntax-rule/no-double-cast",
    "syntax-rule/no-libc-by-name",
    "syntax-rule/no-local-midnight-parse",
    "syntax-rule/no-sops-on-dev-stdin",
    "syntax-rule/no-swallowed-read",
    "syntax-rule/no-void-return",
    "syntax-rule/no-void-self-in-object-method",
  ],
  extendsSlug: "page-type/module",
  loadedBySlug: "check/no-refused-syntax",
  properties: [{ pagePropertySlug: "test", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A rule is handed one file already parsed, so every rule reads a file the once and none parses it again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule is handed every file the check judges and narrows nothing, so what a rule passes over stands in its own code rather than in a skip nobody reads.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every rule judges every file, so one rule refusing a file never stops another from refusing it too.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule names the line it refuses, because a reason without a place in the file is not something a reader can act on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule refusing nothing found nothing, so a file every rule passed over is clean rather than unjudged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule states its test, because a rule judging every file in the corpus is wrong quietly.",
    },
    {
      invariantKind: "absence",
      statement:
        "A rule carries no status. A rule that stands is a rule that judges, and one not ready to judge is not written.",
    },
  ],
} as const satisfies PageType
