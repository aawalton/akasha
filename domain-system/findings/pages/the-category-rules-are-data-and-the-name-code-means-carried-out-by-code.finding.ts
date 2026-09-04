import type { Finding } from "../finding.page-type.ts"

export const theCategoryRulesAreDataAndTheNameCodeMeansCarriedOutByCode = {
  id: "01a0657f-0c53-7000-aacc-5fbfb4971be1",
  pageTypeSlug: "finding",
  slug: "the-category-rules-are-data-and-the-name-code-means-carried-out-by-code",
  domainSlug: "domain/monarch",
  claim:
    "The 104 `category-rule-code` pages hold no code. Every one is a `# Match` list of clauses over six keys and four comparisons, and the word `code` in the page type's name distinguishes a rule a program carries out from one an agent carries out. They were migrated as data carrying a `matches` record rather than as akasha modules, and nothing about them is executed.",
  evidence:
    'The whole corpus is 24,485 bytes across 104 files. Counted mechanically, the bodies hold exactly 224 clause lines over the keys merchant (104), sign (76), account (31), amount (6), month (3) and date (4), and the comparisons `is`, `is not`, `on or after` and `is before`. No file holds a fenced code block: `grep -h \'^```\' pages/category-rule-code/*.md` returned nothing across all 104. No file holds a line outside the four shapes `# Match`, `- **key** comparison`, `  - \\`value\\`` and blank.\n\nThe evaluator is `monarch/rule-clauses.ts`, which takes a `Rule` record and reads `rule.merchantIs`, `rule.accountIs`, `rule.statementContains`, `rule.note`, `rule.counterpart` and `rule.outcome` as fields, throwing where a rule narrows to nothing. There is no `eval`, no `new Function` and no dynamic import of a rule anywhere under `monarch/`. The rules are parsed into records and interpreted.\n\nThe legacy page type said it outright: `pages/page-type/category-rule-code.page-type.md` defined it as "a category rule carried out by code" and `category-rule-agent.page-type.md` as "a category rule carried out by an agent". The two are the same data with different settlers.\n\nHad they been code, `page-type/module` would have been the home, since a module is a page whose code stands in a file beside it. They are not, so they are pages whose clauses stand in the page.',
} as const satisfies Finding
