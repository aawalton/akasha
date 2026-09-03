import type { Finding } from "../finding.page-type.ts"

export const monarchSFiftyCodeFilesStillReadTheMarkdownPagesSystem = {
  id: "01a0657f-0c53-7001-844d-06a4e0de71dd",
  pageTypeSlug: "finding",
  slug: "monarch-s-fifty-code-files-still-read-the-markdown-pages-system",
  domainSlug: "domain/monarch",
  claim:
    "The Monarch data is inside akasha and the Monarch code is not. All 50 files under `monarch/` remain outside, and they cannot simply move: they read their rules and transactions through the markdown pages system that is being removed, and through a `Rule` shape that no longer matches the pages the rules now stand in.",
  evidence:
    "The 50 files are flat under `monarch/` plus `monarch/eval/`. Their imports outside themselves are `../page/page-types.ts` (3), `../page/document/parse.ts` (2), `../page/page-file.ts` (1), `../page/property/registry.ts` (1), `../tools/lib/category-rule.ts` (3), `../tools/lib/rules-normalizer.ts` (1), `../tools/lib/tool-argv.ts` (1), and already `@akasha/pages-system/checkout-roots` (3) and `@akasha/pages-system/markdown-document` (2).\n\nThe four that must be rewritten rather than moved are `rule-pages.ts`, `rule-documents.ts`, `domain-files.ts` and `files.ts`. They glob `pages/category-rule-*/**.md`, parse frontmatter and walk a `# Match` body. Those files no longer exist: the rules are now TypeScript pages at `akasha/alan/harness/monarch/category-rules/category-rule-codes/pages/*.category-rule-code.ts`, each carrying a `matches` list of `{ key, comparison, values }`.\n\nThe field names also moved. `rule-clauses.ts` reads `merchantIs`, `merchantContains`, `statementContains`, `descriptionContains` and `accountIs` as five separate arrays; the migrated pages carry one `matches` list keyed by `merchant`, `sign`, `account`, `amount`, `month` and `date`. `statementContains` and `descriptionContains` have no clause key at all in the 104 pages, so either the loader invented them or they are unused.\n\nA fair reading is that `monarch/` becomes a workspace package of modules under `akasha/alan/harness/monarch/`, and that the rule loader is written new against the pages system rather than ported.",
} as const satisfies Finding
