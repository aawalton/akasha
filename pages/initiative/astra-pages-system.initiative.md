---
id: 1e0c0902-1f88-4d18-83c5-9d2c2ff07386
page-type-slug: initiative
slug: astra-pages-system
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: aine-global
---

# Intent

- A page's name is a computed property, worked out by the formula language.
- No code decides a page's name.
- A page's name is unique among the pages of its page type.
- `named-for` and `unique-key` no longer exist.
- A page can live where its domain lives, or under a folder named for its page type.
- No page lands carrying a name another page of its type already has.
- A page index file is named for one page.
- Each line of a page index file is one page location.
- Every file in the page index is an index file.
- The page index is made right by reconciling it, never by writing it again from nothing.
- No page index update drops what another wrote.
- No reader sees a half-written page index file.
- A reader trusts the page index without checking it.
- The page index is checked against the pages every day.
- Every file specific to the pages system domain lives under `pages-system/`.
- All users of the pages system call into `pages-system/`.
- Every entry point into the pages system is one Alan approved.

# Notes

Opened 2026-08-27. Intents are settled with Alan one at a time and written here as each is approved.

**The line between clean and unclean is a root `akasha/pages-system/` folder**, and Alan approves each entry point that moves through the door. Living in the folder is not by itself what makes a piece clean.

**The page index is a derived cache, never authoritative.** It can always be rebuilt from the pages, so it may be eventually consistent, and a torn write is a fault to detect and repair rather than one to prevent. A miss must never render as an absence.

**SQLite is refused deliberately.** Its decisive advantage was transactions, which a derived cache does not need. What is left is opacity to ripgrep and a schema to migrate, against File First and Search First.

**The index is one file per handle with a one-line body** — not sha1 buckets, and not the destination encoded in the filename. Measured on btrfs: 857 bytes for a one-line file against 1,007 for an empty file with a long name, because a filename is held twice and an inline body once.

**Directories name the index; the filename names the page.** A page type is an attribute of the thing indexed rather than a dimension of the index, so it belongs in the filename.

**A page lives where its domain lives**, rather than under a page-type folder.

**The index validity strategy.** The index updates as part of every change that runs through the ops tools, and no change runs outside them. One command checks an index for validity without changing it, and another rebuilds one. The check runs daily as an audit, and a gap it finds is traced to its root cause. Validity is never checked when the index is queried.

**A file's page type comes from its frontmatter, settled 2026-08-27.** The glob no longer decides and goes away entirely. The file kind must agree with the frontmatter, so a `.domain.md` file whose frontmatter says `person` is a refusal rather than a third answer. `page-types-system` at `58fa00a` carries the three intents.

**The authority was already written and nobody read it.** `page-type-slug`'s own property definition says "Where a page sits is incidental: the page type it states is what it is." Ten independent implementations were built without it, across five distinct inputs: frontmatter, the `files:` glob, the filename suffix, hardcoded folder globs in `page/page-types.ts:15-31`, and the page index. The two gates judging a page's shape and its properties both take the glob answer while required reading takes the frontmatter one.

**Nothing in the data violates the new rule.** Over 61,153 markdown files across both roots: zero whose frontmatter disagrees with the file kind, zero naming a page type nothing declares, zero carrying one without the other. The ruling is a code ablation and not a data migration.

**The glob's real cost is enumeration, not classification.** Roughly 125 call sites reach the routes, of which about thirty use a glob to list a page type's pages rather than to identify one — `pagesOf`, `placesIn`, `scanIn`, `scanSpanning`, `reposOf`, and the write path's `relPathFor` and `nameFromAt`. Those cannot go until the page index is trusted, which is Ablation's order rather than a blocker. `reposOf` is the only thing that says which repo a page type's pages live in.

**`named-for` and `unique-key` both go away.** One computed `name` replaces them, drawn from a formula the page type may state, and the indexes key on that name. `formula` is the word, over `expression`.

**The expression language is rebuilt rather than patched.** One implementation, written from scratch under `pages-system/`, ported from neither evaluator now running, designed against `domain/language-design` and written down before an evaluator existed.

**`unique-key` is a notation nothing implements.** No file-side code renders it, and four of the six stated values carry holes no naming regex can match. Removing it takes away a spelling rather than a behaviour.

**A dotted name cannot be written as a formula.** Reaching another page's property is a `rollup`, which declares a relation and a target. No `named-for` value is dotted.

**A name formula is a property definition scoped to its page type.** A page type naming differently from the default declares its own `name` property definition.

**Nineteen page types declare a name formula, 2026-08-27.** Thirty-six were thought to need one. Ten fell away because their slug already equals their name on all 240 of their pages, so the default names them — the backfill had got there first, folding even `character-build`'s `-2` collision suffix and `person-authority`'s trailing `*` into the slug. Three more fell away with the retracted call spelling. The fifteen that stay have a rule their slug merely agrees with: `{fingerprint}` says what to call an `error` page that does not exist yet, where `{slug}` only reads back what somebody already chose. Parsimony compares a piece against having none of it, and having none of `{fingerprint}` leaves nothing to name the next page.

**Five page types still have no rule.** `temper-account-character` names 29 pages off the stem of a `title` and carries no slug on any of them, its `named-for` describing nothing that happened; `temper-player` names 3 pages by `id` while carrying a different uuid as `title`; `step` cycles on `{name}`; `temper-build-version` names `build` and `version-number`, which are declared nowhere; `mobile-cut` has no pages.

**The default name formula is `{slug} ?? {id}`.** No title arm: a title is not guaranteed to be a valid identifier.

**The formula language is fully specified, 2026-08-27.** Every question raised against it has been ruled and written as a line on a page. The case form is `case(`, rows separated by commas, `)`, with `->` between a row's test and its value and the bare word `otherwise` where the last row's test would be; there is no `end`. Parentheses group. A call is `name(a, b)`. Operators short circuit — one that can answer from its left alone does not work out its right. Equal binding groups to the left. Negation is a `-` with nothing to its left, binding tightest. Comparison reaches numbers only. `hoursBetween` is a magnitude. `hasWord` folds case and bounds a word by anything that is not a letter or a digit. A text literal answers absent where any reference in it is absent. A function that reaches an absent value answers absent. A computed property's declared type is a contract its formula must meet.

**A number reaches text through a computed property, settled 2026-08-27.** `text` stands outside a literal and answers a text, which a literal then references like any other, so `"{app}-{n}"` is written as an `n-text: text({n})` beside a `"{app}-{n-text}"`. Proved end to end against the package: `temper` and `412` give `temper-412`, a fractional number gives absent, an absent one gives absent. The count that settled it — `workflow` wants `text` outside a literal only, `persona-cover-image` and `temper-inventory-chunk` are named by their own slug on all 38 and 455 pages, and `mobile-cut` alone would want the join and has no pages at all. The language is not widened.

**A call takes a reference, never the other way round.** `text({seq})` is the spelling and `{text(seq)}` is refused at read, because braces hold a key rather than an expression. A call written inside a text literal is the same retracted shape.

**The two halves of the language were built blind to each other, and it worked.** One agent wrote an evaluator from the spec pages; another wrote a conformance corpus from the same pages, forbidden to read the evaluator or either language it replaces. A third, who wrote neither, ran them together. Of 302 cases, 22 disagreed: **20 the evaluator's fault, 1 the corpus's, 1 the specification's silence.** Eighteen of the twenty were one defect repeated — every refusal named the step rather than the value, against `language-failure`'s "Name the value missing, not the step that broke." An implementation checked against itself could not have found it. Four more were lines ruled after the evaluator was written. One was a rule the evaluator invented that no line states: it refused a case whose only row is `otherwise`.

**A case cites the spec, and the citation is tested.** `cases.unit.test.ts` opens each cited page and fails where the cited line no longer carries the quoted claim, naming the case and the citation rather than a count. Proved by mutation: one inserted line failed 119 of 290 tests. A citation is typed rather than a string, so a claim resting on what a list leaves out names the section and the words that must not appear there, which makes an absence testable.

**The formula package answers to the repo's folder and export checks.** `folder-matches-a-shape` wants a folder to be single-entrance — exactly one code file imported from outside it, and none beneath a subfolder imported from outside. `export-declared-here` refuses a barrel, `import-reach` refuses an import resolving outside the repo, and `file-length` cuts at 15,000 bytes. A test sits beside the file it tests, suffixed `.unit.test.ts`. A whole-suite `bun test` is refused. The audit is `ops checks audit <slug>`.

**The slug backfill is done, 2026-08-27.** 6,799 pages took a slug from their filename stem across fourteen commits, with zero index misses and no concurrent write clobbered — the final batch was verified as 495 files, 495 insertions, zero deletions. Every resolver already computes `stated slug ?? file stem`, so writing the stem into `slug:` produces a byte-identical key and resolves nothing differently. `page-name-unique` does not use the computed name at all: it groups on `type/stem` off the filename, so a slug write could never move it.

**Loose ends, found 2026-08-27.** Taken as they block an intent or come up alongside one.

- 2,176 pages hold no slug because they sit inside a pre-existing name-collision group — 2,012 `persona-day`, 95 `idle-persona-card`, 66 `finding`, 2 `persona-craft-day`, 1 `story-chapter-royal-road`, across 157 groups. They wait on the uniqueness intent.
- `kindsIn` sees 382 page types and `registryOf` sees 393. Eleven page types filed beside their own domains are invisible to one of them, and `page-derive` consumes the short list. `globsIn` decides which answer it gives by whether `tree.roots` is set, so the staged tree a gate builds takes the other path.
- `ops write` gated `cases.ts` three times and never caught that it failed `biome check`. A formatting fault lands and surfaces later, far from its cause.
- `page-named-as-stated` and `page-name-unique` carry `check-on-patch: false` and `check-on-worktree: false`, so a 495-file write reported zero checks. Neither guards a write.
- The page index dropped writes twice more under load, refusing with "the page index was not built over `code-editor`". That is the same fault as `formula-absent-value` at `0163fe9`, now with a reproducible signature and a known remedy in `ops index refresh`.
- The page index stores the filename suffix rather than the frontmatter type, at `page/index/identity/identity.ts:148`. Refreshing it will not make it agree with the new rule; what it writes has to change.
- `tools/tests/formula-conformance` holds the corpus for the language being replaced, sixteen files. Under Ablation it goes once the new corpus and evaluator are proven.
- Six `message` pages under `change-harness-cluster-operator` carry no rule, no slug, no title and no id, so nothing gives them a name. One `finding` page carries no `id:` at all.
- The live seat composer rewrites `agent/seat/*.seat.md` and drops `slug`.
- 569 folders across the repo fail `folder-matches-a-shape` and 17 files fail `import-reach`, so neither reads as a clean signal for a new package.
- Twenty-five pages carry a stem cut at the old ceiling of 71.
- `ops food log` names its own pages: its own stemmer at `tools/commands/food/log.ts:123`, its own `-2` suffix at `:146`, and a write through the query client rather than the naming path.
- `vocabulary` and `rows-homes` are cached under a mark taken over the page shape alone, while both read the registry, which reads the index. Only `registry` carries an index stamp.
- 2,633 pages exist byte-identically in both `akasha` and `books`.
- `finding` cannot take a flat name while `tools/audits/findings-sorted.ts` refuses a name of one segment, which would refuse all 3,456 findings.
- `story-chapter-royal-road` is written by `services/royal-road-sync.ts` as a raw path rather than through the pages API.
- `book-chapter` is not a rename: 5,622 markdown links across 362 files address chapters by name, and no property tells the colliders apart.
- `keepNamedIn` removes an emptied identity file but never its directory.
- `page-property-computed`'s Design line says the formula language has no way to match a whole word. That fails of the language replacing it, which carries `hasWord`. The line goes when the cutover lands.
- `ops write` takes its body from a file, so writing that file is itself a write with no `ops write` to make it. Every agent on this initiative bootstrapped through a scratch file off the one write path, and each said so.
- `tools/tests/page-shape-declaration.on-demand.test.ts:7` imports a `scan` that `page/page-types.ts` does not export. Broken independently of this work.

**The graph answer cache under `.git/answers` is out of scope**, being the graph system's rather than the pages system's.

**The uniqueness intent came off `page-name`'s Design section**, where it was written as an invariant that holds. It does not: 391 names collide across 2,851 pages, each collision inside one repository.
