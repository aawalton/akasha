import type { Module } from "@akasha/code-system/module"
import type { Test } from "@akasha/code-system/module/test"
import type { PageType } from "@akasha/pages-system/page-type"
import type { SourceFile } from "typescript"

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
    "syntax-rule/no-akasha-command-from-code",
    "syntax-rule/no-angle-bracket-cast",
    "syntax-rule/no-body-read-beside-an-index",
    "syntax-rule/no-credential-in-script-text",
    "syntax-rule/no-double-cast",
    "syntax-rule/no-libc-by-name",
    "syntax-rule/no-local-midnight-parse",
    "syntax-rule/no-non-null-assertion",
    "syntax-rule/no-run-outside-the-runner",
    "syntax-rule/no-sops-on-dev-stdin",
    "syntax-rule/no-swallowed-read",
    "syntax-rule/no-void-return",
    "syntax-rule/no-void-self-in-object-method",
  ],
  extendsSlug: "page-type/module",
  loadedBySlug: "code-check/no-refused-syntax",
  properties: [{ pagePropertySlug: "test", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule is handed one file already parsed.",
    },
    {
      invariantKind: "departure",
      statement: "A rule is handed every file the check judges and narrows nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every rule judges every file.",
    },
    {
      invariantKind: "departure",
      statement: "A rule names the line the rule refuses.",
    },
    {
      invariantKind: "departure",
      statement: "A rule refusing nothing found nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A rule states its test.",
    },
    {
      invariantKind: "absence",
      statement: "A rule carries no status.",
    },
    {
      invariantKind: "absence",
      statement: "A rule not ready to judge is not written.",
    },
  ],
} as const satisfies PageType
