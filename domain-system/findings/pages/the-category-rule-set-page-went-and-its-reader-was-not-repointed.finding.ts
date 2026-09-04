import type { Finding } from "../finding.page-type.ts"

export const theCategoryRuleSetPageWentAndItsReaderWasNotRepointed = {
  id: "01a0675e-6da8-7000-80ec-6608db5bb8b4",
  pageTypeSlug: "finding",
  slug: "the-category-rule-set-page-went-and-its-reader-was-not-repointed",
  domainSlug: "domain/akasha-migration",
  claim:
    "`pages/rules-engine-rule-set/category-rule.rules-engine-rule-set.md` was ablated with the rules it described, and `tools/lib/category-rule-set.ts` still reads it. Every caller of `ruleFolders()` now throws ``no rule set stands for `category-rule```. The break is in `tools/` rather than in monarch, and monarch is only the caller that noticed.",
  evidence:
    "Measured 2026-09-03 at 008d5cb145.\n\n`AKASHA_ROOT=$PWD bun -e 'const m = await import(\"./tools/lib/category-rule.ts\"); m.ruleFolders()'` throws ``no rule set stands for `category-rule```, raised from `tools/lib/rules-engine-rule-set.ts:30`. `tools/lib/category-rule-set.ts:5-11` looks the rule set up by the slug `category-rule` through `globsOf` and `ruleSetOf`, both of which search the `rules-engine-rule-set` pages for it.\n\nThe folder `pages/rules-engine-rule-set/` was not removed and still holds `email-rule.rules-engine-rule-set.md`. Only the monarch entry went, at `e022df28b2`, alongside `pages/category-rule-code/` (104 pages), `pages/category-rule-agent/` (1) and `pages/category-rule-merchant/` (1). The backup at `/var/home/walton/repos/akasha-backup-2026-09-02/pages/rules-engine-rule-set/` holds both files, so what was deleted can be read.\n\nRestoring the file would answer the throw and still be wrong. The page carried `path-pattern: ^pages/category-rule-(?<kind>agent|code)/...`, which names folders that no longer exist: the rules are TypeScript pages under `akasha/alan/harness/monarch/category-rules/`, each carrying a `matches` list rather than a `# Match` body.\n\nWhat this reaches inside `monarch/`: `agree.ts` throws when it is imported, and `rule-documents.ts`, `propose.ts`, `apply.ts`, `categorize-recent.ts` and `eval/run.ts` throw when they load rules. `monarch-sync` finishes every phase, agrees with Monarch on all three counts, and then fails on this alone. Whether any caller outside `monarch/` reaches `ruleFolders()` was not measured.",
} as const satisfies Finding
