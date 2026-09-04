import type { Finding } from "../finding.page-type.ts"

export const akashaCarriesNoCommandNamedForAJavascriptKeyword = {
  id: "01a06231-8322-7b32-a8d7-564b141a7f51",
  pageTypeSlug: "finding",
  domainSlug: "workspace-package/command-system",
  slug: "akasha-carries-no-command-named-for-a-javascript-keyword",
  claim:
    "Alan asked for `akasha import health`. No page can carry the slug `import`, so the command landed as `akasha importing health` at 6c0d4bf605. The call was taken in Alan's absence and `akasha refactor --from importing --to <slug>` renames the command in one call once he rules. Every other command word akasha carries today is free of this, and the next one to hit it will be `class`, `delete`, `new` or `default`.",
  evidence:
    "Three layers refuse the word, each on its own.\n\n`const import = {}` is a SyntaxError, because `import` is a reserved word in a module. Bun answers `Expected identifier but found \"import\"`. So the ordinary page shape cannot be written at all.\n\n`page-named-as-stated.code-check.code.ts` reads the name a page's value is bound to and judges that name against `exportedAs(slug)`. Its own test at line 246 already names this case with the slug `import` and expects a refusal, and `slug.text-property.ts` carries the constraint that a slug which cannot become a page's export name is no slug.\n\nAn export alias gets past both and dies at the loader. `const theImport = {...}` beside `export { theImport as import }` loads under `bun` through `createRequire`, and `ts.transpileModule` emits `exports.import` for it, but the loader `akasha write` judges a page body with answered `is named as a page and its body would not load — Unexpected identifier 'as'`. Measured 2026-09-02 on the real page body.\n\nWidening the check alone was tried and reverted at b45e6435 and 3a8b8433, because it would let through a page akasha cannot load.\n\nA page bound to `theImport` also fails `identifier-matches-its-place`, which reads an unexported module constant as needing `upper-snake-case`.\n\n0 of the 13,228 slugs akasha carries today spell a reserved word. Two property slugs do, `class` and `default`, and those are read as keys rather than bound as names, so nothing there is at risk.",
} as const satisfies Finding
