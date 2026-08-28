---
id: 01a045bf-7cd3-7147-97d0-7f378dda25c2
page-type-slug: initiative
slug: astra-page-naming
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- A page's name is a computed property, worked out by the formula language.
- No code decides a page's name.
- A page's name is unique among the pages of its page type.
- `named-for` and `unique-key` no longer exist.
- No page lands carrying a name another page of its type already has.

# Notes

**A page lives where its domain lives**, rather than under a page-type folder.

**A file's page type comes from the name it carries, settled 2026-08-27.** The glob no longer decides and goes away entirely. The frontmatter must agree with the kind and does not decide it, so a `.domain.md` whose frontmatter says `person` is a refusal rather than a third answer. `page-types-system` at `58fa00a` carries the three intents.

**Nothing in the data violates the new rule.** Zero of 61,153 markdown files disagree, so the ruling was a code ablation rather than a data migration.

**The glob's real cost is enumeration, not classification.** About thirty call sites list a page type's pages rather than identify one, and `pageTypeOf` cannot answer that, so they wait on the page index being trusted — Ablation's order rather than a blocker.

**`named-for` and `unique-key` both go away.** One computed `name` replaces them, drawn from a formula the page type may state, and the indexes key on that name. `formula` is the word, over `expression`.

**The expression language is rebuilt rather than patched.** One implementation, written from scratch under `pages-system/`, ported from neither evaluator now running, designed against `domain/language-design` and written down before an evaluator existed.

**`unique-key` is a notation nothing implements.** No file-side code renders it, so removing it takes away a spelling rather than a behaviour.

**A dotted name cannot be written as a formula.** Reaching another page's property is a `rollup`, which declares a relation and a target. No `named-for` value is dotted.

**A name formula is a property definition scoped to its page type.** A page type naming differently from the default declares its own `name` property definition.

**Nineteen page types declare a name formula, 2026-08-27.** A rule earns its place where it says what to call a page that does not exist yet — `{fingerprint}` on `error` — rather than reading back what somebody already chose, as `{slug}` does.

**The default name formula is `{slug} ?? {id}`.** No title arm: a title is not guaranteed to be a valid identifier.

**The formula language is fully specified, 2026-08-27.** `formula-language.domain.md` and the three lists beside it carry every ruling, so they are not restated here.

**A number reaches text through a computed property, settled 2026-08-27.** `text` stands outside a literal and answers a text, which a literal then references, so `"{app}-{n}"` is an `n-text: text({n})` beside a `"{app}-{n-text}"`. The language is not widened.

**A call takes a reference, never the other way round.** `text({seq})` is the spelling and `{text(seq)}` is refused at read, because braces hold a key rather than an expression. A call written inside a text literal is the same retracted shape.

**A case cites the spec, and the citation is tested.** `cases.unit.test.ts` opens each cited page and fails where the cited line no longer carries the quoted claim. A citation is typed rather than a string, so a claim resting on what a list leaves out names the section and the words that must not appear there, which makes an absence testable.

Filed as `page-property-computed/no-property-reaches-a-file-backed-reader-marked-computed`.

**A page states no name of its own, settled 2026-08-27.** Zero pages carry a bare `name:` key; the name index and the filename hold it as projections of the computed answer. The line is about frontmatter alone.

**The renaming sweep is held on a measurement, 2026-08-27.** Running `nameOf` over 59,000 pages found 476 divergences from the names on disk, not corrections; declaring `{slug}` on `character-build` took that to 305 and its collisions to zero. A sweep is authorised against that number, not before.

Filed as `pages-system/the-new-default-name-formula-is-wired-to-nothing`.

**A file's page type comes from one function, 2026-08-27.**

- `page-name-unique` carries `check-on-patch: false` and `check-on-worktree: false`, so a 495-file write reported zero checks. An unstated key runs, because `check-on-patch` states `default: true` and `checks-system/checks.ts:84` reads `said !== false`.
- Two functions are named `pageTypeOf`, one naming a file's page type and one building a record.
- Eleven sites read `pageNameOf().type` as a page-type answer, one of them feeding the page index's `type` column, so the index's answer is that function's answer with a cache in front.
- Filed as `temper/temper-player-holds-a-stray-uuid-in-title-and-owns-by-it`.
- Filed as `pages-system/ops-food-log-names-its-own-pages`.
- `book-chapter` is not a rename: 5,622 markdown links across 362 files address chapters by name, and no property tells the colliders apart.
- `page-property-computed`'s Design line says the formula language has no way to match a whole word. That fails of the language replacing it, which carries `hasWord`. The line goes when the cutover lands.
