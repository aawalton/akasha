import type { Finding } from "../finding.page-type.ts"

export const monarchSFiftyCodeFilesStillReadTheMarkdownPagesSystem = {
  id: "01a0657f-0c53-7001-844d-06a4e0de71dd",
  pageTypeSlug: "finding",
  slug: "monarch-s-fifty-code-files-still-read-the-markdown-pages-system",
  domainSlug: "domain/monarch",
  claim:
    "The Monarch code is inside akasha with its data. 52 modules stand under `akasha/alan/harness/monarch/` and the root `monarch/` directory is gone. The four loaders that globbed `pages/category-rule-*/**.md` and walked a `# Match` body were written new against the pages system rather than ported, because the rules they read are now TypeScript pages: 104 of them at `akasha/alan/harness/monarch/category-rules/category-rule-codes/pages/*.category-rule-code.ts`, each carrying a `matches` list of `{ key, comparison, values }`.",
  evidence:
    'The clause shape moved with the rules, and a reader written against the old one finds nothing rather than failing. The old loader read `merchantIs`, `merchantContains`, `statementContains`, `descriptionContains` and `accountIs` as five separate arrays. A migrated page carries one `matches` list keyed by `merchant`, `sign`, `account`, `amount`, `month` and `date`; `adam-proffit-yard-work.category-rule-code.ts` is the plain case, `matches: [{ key: "merchant", comparison: "is", values: ["adam proffit"] }]`.\n\n`statementContains` and `descriptionContains` have no clause key at all across the 104 pages, so either the old loader invented them or nothing used them. Whoever needs either one has to add a key rather than look for where it went.\n\nThe rules and transactions are read through the pages system now rather than through the markdown pages system. What the old files reached for outside themselves -- `page/page-types.ts`, `page/document/parse.ts`, `page/page-file.ts`, `page/property/registry.ts` -- is inside akasha as `@akasha/markdown-pages`, so nothing here is waiting on a directory to move.',
} as const satisfies Finding
