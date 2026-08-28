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
- A page can live where its domain lives, or under a folder named for its page type.
- No page lands carrying a name another page of its type already has.

# Notes

**A page lives where its domain lives**, rather than under a page-type folder.

**A file's page type comes from its frontmatter, settled 2026-08-27.** The glob no longer decides and goes away entirely. The file kind must agree with the frontmatter, so a `.domain.md` file whose frontmatter says `person` is a refusal rather than a third answer. `page-types-system` at `58fa00a` carries the three intents.

**The authority was already written and nobody read it.** `page-type-slug`'s own definition settled where a page sits is incidental. Ten implementations were built without it, across five inputs, and both gates judging a page took the glob answer while required reading took the frontmatter one.

**Nothing in the data violates the new rule.** Zero of 61,153 markdown files disagree, so the ruling was a code ablation rather than a data migration.

**The glob's real cost is enumeration, not classification.** About thirty of the call sites list a page type's pages rather than identify one — `pagesOf`, `placesIn`, `scanIn`, `scanSpanning`, `reposOf`, `relPathFor`, `nameFromAt`. `pageTypeOf` cannot answer that question, so they wait on the page index being trusted, which is Ablation's order rather than a blocker. `reposOf` alone says which repo a page type's pages live in.

**`named-for` and `unique-key` both go away.** One computed `name` replaces them, drawn from a formula the page type may state, and the indexes key on that name. `formula` is the word, over `expression`.

**The expression language is rebuilt rather than patched.** One implementation, written from scratch under `pages-system/`, ported from neither evaluator now running, designed against `domain/language-design` and written down before an evaluator existed.

**`unique-key` is a notation nothing implements.** No file-side code renders it and four of its six stated values carry holes no naming regex can match, so removing it takes away a spelling rather than a behaviour.

**A dotted name cannot be written as a formula.** Reaching another page's property is a `rollup`, which declares a relation and a target. No `named-for` value is dotted.

**A name formula is a property definition scoped to its page type.** A page type naming differently from the default declares its own `name` property definition.

**Nineteen page types declare a name formula, 2026-08-27.** Thirty-six were thought to need one; ten fell away because the backfill had already written their name into `slug`, and three with a retracted call spelling. The fifteen that stay have a rule their slug merely agrees with: `{fingerprint}` says what to call an `error` page that does not exist yet, where `{slug}` only reads back what somebody already chose.

**Five page types still have no rule.** `temper-account-character` names 29 pages off the stem of a `title` and carries no slug on any of them, its `named-for` describing nothing that happened; `temper-player` names 3 pages by `id` while carrying a different uuid as `title`; `step` cycles on `{name}`; `temper-build-version` names `build` and `version-number`, which are declared nowhere; `mobile-cut` has no pages.

**The default name formula is `{slug} ?? {id}`.** No title arm: a title is not guaranteed to be a valid identifier.

**The formula language is fully specified, 2026-08-27.** Every question raised against it is ruled and written as a line on a page; `formula-language.domain.md` and the three lists beside it carry the answers, so they are not restated here.

**A number reaches text through a computed property, settled 2026-08-27.** `text` stands outside a literal and answers a text, which a literal then references, so `"{app}-{n}"` is an `n-text: text({n})` beside a `"{app}-{n-text}"`. Proved end to end. The language is not widened.

**A call takes a reference, never the other way round.** `text({seq})` is the spelling and `{text(seq)}` is refused at read, because braces hold a key rather than an expression. A call written inside a text literal is the same retracted shape.

**The two halves of the language were built blind to each other, and it worked.** Of 302 cases 22 disagreed: 20 the evaluator's, 1 the corpus's, 1 the specification's silence. Eighteen were one defect repeated, refusals naming the step rather than the value. An implementation checked against itself could not have found them.

**A case cites the spec, and the citation is tested.** `cases.unit.test.ts` opens each cited page and fails where the cited line no longer carries the quoted claim. Proved by mutation: one inserted line failed 119 of 290 tests. A citation is typed rather than a string, so a claim resting on what a list leaves out names the section and the words that must not appear there, which makes an absence testable.

**The slug backfill is done, 2026-08-27.** 6,799 pages took a slug from their filename stem across fourteen commits with zero index misses. It wrote a slug only where doing so provably moved no name, which is why 33 pages whose declared rule filled to something other than their stem were left alone.

**A property's `type` names what it holds, settled 2026-08-27.** Never how the value is produced. 74 property definitions said `type: formula` with a separate `returnType` carrying the held type, and `page-property-definition-type`'s own definition already said `type` is "what kind of value a property holds" — the authority was written and the data ignored it, exactly as with `page-type-slug`. A property is computed if and only if it carries an `expression`.

**`returnType` has never worked on the browser path.** `file-property-defs.ts:88-101` builds the config the browser reads and never sets `expression`, while `formulaConfigSchema` requires it, so the parse fails for all 74, the resolved type stays `formula`, and every computed column badges, filters and sorts as text. Nobody noticed because values are worked out server-side and arrive already computed. The ablation fixes it, so its claim is not "nothing changes" but "the file and query paths are unchanged and the browser path changes from wrong to right".

**A page states no name of its own, settled 2026-08-27.** Zero pages carry a bare `name:` key. The name index writes the name into an `at` field and the filename carries it too, so the name is stored twice over — as projections of the computed answer rather than as anything the page states. The line is about frontmatter alone.

**The renaming sweep is held on a measurement, 2026-08-27.** Running `nameOf` over 59,000 pages found 476 divergences from the names on disk, not corrections. `character-build` collapsed eight distinct builds onto one path, and every one already carried the right answer in its own `slug` — so its declared rule had never once named its own pages, and the collision suffixer in `file-name.ts` papered over it. Declaring `{slug}` there took collisions to zero and divergences to 305. Reading the code could not have found this; running it over the corpus did. A sweep is authorised against that number, not before.

**The live default is not `{slug} ?? {id}`.** `page/name/naming/naming.ts:85` falls through rule, then slug, then `pageStem(title)`, then id. The `{slug} ?? {id}` default lives in `pages-system/name/`, which zero of 380 page types reach — it is built and wired to nothing. Nine page types declaring no rule are named by the title step today, so the new default would rename 233 of them wrongly.

**A file's page type comes from one function, 2026-08-27.** 29 call sites repointed onto `pageTypeOf`; `claiming`, `claimant`'s frontmatter-first branch and `domainKindTest`'s composite deleted. Equivalence proved directly over 61,152 files at zero disagreements rather than against a tree moving 189 commits per half hour. Five sites still read frontmatter first, two of them inverting the settled rule. `suffix.ts:57` genuinely disagrees, calling `a.b.domain.md` no domain at all.

**The uniqueness intent came off `page-name`'s Design section**, where it was written as an invariant that holds. It does not: 391 names collide across 2,851 pages, each collision inside one repository.

- 2,176 pages hold no slug because they sit inside a pre-existing name-collision group — 2,012 `persona-day`, 95 `idle-persona-card`, 66 `finding`, 2 `persona-craft-day`, 1 `story-chapter-royal-road`, across 157 groups. They wait on the uniqueness intent.
- `kindsIn` sees 382 page types and `registryOf` sees 393. Eleven page types filed beside their own domains are invisible to one of them, and `page-derive` consumes the short list. `globsIn` decides which answer it gives by whether `tree.roots` is set, so the staged tree a gate builds takes the other path.
- `page-name-unique` carries `check-on-patch: false` and `check-on-worktree: false`, so a 495-file write reported zero checks. `page-named-as-stated` does guard a write: it refused a finding on 2026-08-28 whose title and file stem disagreed, naming both. An unstated key runs, because `check-on-patch` states `default: true` and `checks-system/checks.ts:84` reads `said !== false`.
- `tools/tests/formula-conformance` holds the corpus for the language being replaced, sixteen files. Under Ablation it goes once the new corpus and evaluator are proven.
- 2,266 pages still carry no slug across 14 page types. Two are live regressions rather than backfill leftovers: the seat composer drops `slug` every time it rewrites `agent/seat/*.seat.md`, and the `code-editor-*` family is 100% slugless across all four types after being fully covered at the backfill.
- Two functions are named `pageTypeOf`, one naming a file's page type and one building a record.
- Eleven sites read `pageNameOf().type` as a page-type answer, one of them feeding the page index's `type` column, so the index's answer is that function's answer with a cache in front.
- `type: aggregate` on 4 pages and `type: rollup` on 3 name a mechanism, which the settled rule on `type` reaches but Alan has not ruled on.
- `temper-player` presses `title` into service as its ownership relation, so `title` holds a uuid naming nothing. Of 12 page types carrying `owner-slug`, only it and `temper-account` use `title`.
- `ops food log` names its own pages: its own stemmer at `tools/commands/food/log.ts:123`, its own `-2` suffix at `:146`, and a write through the query client rather than the naming path.
- `finding` cannot take a flat name while `tools/audits/findings-sorted.ts` refuses a name of one segment, which would refuse all 3,456 findings.
- `book-chapter` is not a rename: 5,622 markdown links across 362 files address chapters by name, and no property tells the colliders apart.
- `page-property-computed`'s Design line says the formula language has no way to match a whole word. That fails of the language replacing it, which carries `hasWord`. The line goes when the cutover lands.
