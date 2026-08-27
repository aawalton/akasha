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

Settled with Alan on 2026-08-27, before any intent was written:

**The line between clean and unclean is a root `akasha/pages-system/` folder**, and Alan approves each entry point that moves through the door. Living in the folder is not by itself what makes a piece clean.

**The page index is a derived cache, never authoritative.** It can always be rebuilt from the pages, so it may be eventually consistent, and a torn write is a fault to detect and repair rather than one to prevent. A miss must never render as an absence.

**SQLite is refused deliberately.** Its decisive advantage was transactions, which a derived cache does not need. What is left is opacity to ripgrep and a schema to migrate, against File First and Search First.

**The index is one file per handle with a one-line body** — not sha1 buckets, and not the destination encoded in the filename. Measured on btrfs: 857 bytes for a one-line file against 1,007 for an empty file with a long name, because a filename is held twice and an inline body once.

**Directories name the index; the filename names the page.** A page type is an attribute of the thing indexed rather than a dimension of the index, so it belongs in the filename.

**A page lives where its domain lives**, rather than under a page-type folder. The domain dimension matters more than the page-type dimension.

**`named-for` and `unique-key` both go away.** One computed `name` replaces them, drawn from a formula the page type may state, and the indexes key on that name. `formula` is the word, over `expression`, because the pages system already carries it.

**The index validity strategy, settled 2026-08-27.** The index updates as part of every change that runs through the ops tools, and no change runs outside them. One command checks an index for validity without changing it, and another rebuilds one. The check runs daily as an audit, and a gap it finds is traced to its root cause. Validity is never checked when the index is queried.

**The expression language is rebuilt rather than patched, settled 2026-08-27.** One implementation, written from scratch under `pages-system/`, ported from neither evaluator now running. It is designed against `domain/language-design` and written down before an evaluator exists.

**`unique-key` is a notation nothing implements.** No file-side code renders it, and four of the six stated values carry holes no naming regex can match, so nothing ever did. Removing it takes away a spelling rather than a behaviour.

**A dotted name cannot be written as a formula.** The file side refuses a path step whose head is not an object, and a page's frontmatter holds only text. Reaching another page's property is a `rollup`, which declares a relation and a target rather than a formula. No `named-for` value is dotted, so no naming translation needs this.

**A name formula is a property definition scoped to its page type, settled 2026-08-27.** A page type naming differently from the default declares its own `name` property definition, carrying the formula. A property definition already scopes to a page type, so naming takes no mechanism of its own. Thirty-six page types need one.

**The default name formula is `{slug} ?? {id}`, settled 2026-08-27.** No title arm: a title is not guaranteed to be a valid identifier.

**The syntax rulings reached the spec, 2026-08-27.** `formula-language` at `63ac1a5` states the case form, the call spelling, parentheses grouping, and the short circuit. A case is `case(`, rows separated by commas, then `)`, with `->` between a row's test and its value and the bare word `otherwise` where the last row's test would be. There is no `end`.

**Operators short circuit, settled 2026-08-27.** An operator that can answer from its left side alone does not work out its right. With no `||` in the language that is three situations: `false && x`, `absent && x`, and `x ?? y` where `x` is present. This is a semantic ruling rather than a safety one — the language is total, so nothing on the right can fail. `formula-absent-value` at `aadcc10` was reworded from "An operator **given** an absent value answers absent" to "**reaches**", which reconciles the short circuit with absence propagation instead of adding a fourth exception. `??` remains an exception regardless, since it reaches an absent left and answers its right.

**The conformance corpus, landed 2026-08-27.** `pages-system/formula/cases/cases.ts` at `3a27d27`, re-spelled at `fa256a9`, ruled at `16bfe5f`, and given its own test at `dac0c98`. 284 cases: 149 answer a value, 34 answer absent, 101 are refused, and none expects a run-time failure. Written from the spec pages alone by an author who read neither evaluator now running nor the new one being built. That author and the evaluator's builder, blind to each other and reading the same page, produced two different case forms — which is what a specification naming a part without spelling it costs, and only mutual blindness exposed it.

**A case cites the spec, and the citation is tested.** `cases.unit.test.ts` opens each cited page and fails where the cited line no longer carries the quoted claim, naming the case and the citation rather than a count. Proved by mutation: one inserted line failed 119 of 290 tests. A citation is a typed `Citation` rather than a string, so a claim resting on what a list leaves out names the section and the words that must not appear there, instead of pointing at a heading. That makes an absence testable — three tripwires assert the operator, function and value lists name exactly what the corpus covers, so a thirteenth operator is a hole in the corpus rather than a passing suite.

**The formula package answers to the repo's folder and export checks.** `folder-matches-a-shape` admits three shapes and judges each subfolder separately, `export-declared-here` refuses a barrel, `import-reach` refuses an import resolving outside the repo, and `file-length` cuts at 15,000 bytes. A test sits beside the file it tests, named for it, suffixed `.unit.test.ts`. A whole-suite `bun test` is refused; one file is named by path. The audit is `ops checks audit <slug>`.

**Three answers the written principles force, found 2026-08-27 and awaiting their spec lines.** Each was derived twice, independently, from the same cited line.

- `-` and `/` are left-associative, by `language-syntax`'s "Take the reading a stranger would give it."
- A function that reaches an absent value answers absent, by `language-failure`'s "Let one absent value stop the whole answer," which is stated of absent values rather than of operators.
- A text literal answers absent where any reference in it is absent, by the same aid under "Refuse Not Convert". This makes the defect that started the redesign unreachable rather than caught: no name is built at all, so no well-formed wrong name can appear. It is caught at run time rather than at check time, which is the weaker of the two moments under "Caught Early".

**Six choices the written principles do not settle, found 2026-08-27.** Each needs Alan.

- Whether a number literal may carry a leading `-`. There is no unary minus operator and the operators list is closed, so otherwise `-1` is written `0 - 1`.
- Whether `<`, `<=`, `>` and `>=` reach text or only numbers. They do not reach instants. `+` names its type and `<` does not, which may be deliberate silence.
- Whether `hasWord` folds case, and what besides a space bounds a word. The language being replaced was case-insensitive, and only the whole-word gap was ever recorded as a lack.
- Whether `hoursBetween(later, earlier)` is negative or a magnitude. Since an instant is barred from the operators, this function is the only route to "is a after b", and a magnitude closes it.
- Whether a formula may answer an instant or a list, and whether a computed property declares a type its formula must meet. The second is the difference between refusing a bad `name` formula when the page type is checked and discovering it when a page is written.
- Whether a number or a boolean may be filled into a text literal. This is a wall rather than a detour: a text literal is the only way to join text and there is no `text` function, so text-only means no formula can ever put a number in a name.

**The slug backfill, 2026-08-27.** 6,304 pages took a slug from their filename stem across thirteen commits, with zero index misses and zero new collisions. Every resolver already computes `stated slug ?? file stem` — `page/relation/relation.ts:81-90`, `page/index/identity/identity.ts:120-130`, `shared/pages-access/src/file-rows.ts:165-174` — so writing the stem into `slug:` produces a byte-identical key and resolves nothing differently. 3,860 more were held back because their computed name would change; all 3,860 fail `page-named-as-stated` today, and 2,529 of them are named by their `id` rather than by any title. Also held: 60 inside pre-existing collision groups, 29 already failing `page-named-as-stated`, 7 case-carrying, 4 id-named.

**Loose ends, found 2026-08-27.** Taken as they block an intent or come up alongside one.

- `ops write` gated `cases.ts` three times and never caught that it failed `biome check`, this repo setting `semicolons: "asNeeded"`. A formatting fault therefore lands and surfaces later, far from its cause.
- `page-named-as-stated` and `page-name-unique` both carry `check-on-patch: false`, so a 500-file write reported `0 akasha check(s)`. Neither guards a write.
- `tools/tests/formula-conformance` holds the corpus for the language being replaced, sixteen files. Under Ablation it goes once the new corpus and evaluator are proven, and nobody has been told to remove it.
- The live seat composer rewrites `agent/seat/*.seat.md` and drops `slug`. A backfill cannot hold there until the composer emits it.
- 569 folders across the repo already fail `folder-matches-a-shape` and 17 files fail `import-reach`, so neither reads as a clean signal for a new package.
- Twenty-five pages carry a stem cut at the old ceiling of 71, so their rule now fills to more than their filename holds.
- `ops food log` names its own pages: its own stemmer at `tools/commands/food/log.ts:123`, its own `-2` suffix at `:146`, and a write through the query client rather than the naming path.
- `vocabulary` and `rows-homes` are cached under a mark taken over the page shape alone, while both read the registry, which reads the index. Only `registry` carries an index stamp.
- 2,633 pages exist byte-identically in both `akasha` and `books`, which is why `page-name-unique` meets collisions it cannot explain.
- 305 collision groups already exist in the computed-name space. The unique-name intent costs 24,518 renames across eight page types; four are clear — `persona-day`, `persona-craft-day`, `idle-persona-card` and `story-turn`, 2,301 pages between them, at most one call site each.
- `finding` cannot take a flat name while `tools/audits/findings-sorted.ts` refuses a name of one segment, which would refuse all 3,456 findings. Three refusal pages spell the old shape.
- `story-chapter-royal-road` is written by `services/royal-road-sync.ts` as a raw path rather than through the pages API, so a formula reaches none of it until that writer is rebuilt.
- `book-chapter` is not a rename: 5,622 markdown links across 362 files address chapters by name, and no property tells the colliders apart. Its sections want modelling as pages first.
- `keepNamedIn` removes an emptied identity file but never its directory.
- A page landed through `ops write` reached disk and not the index. `formula-absent-value` committed at `0163fe9` carrying no identity entry, found only because a later write named it as required reading. The backfill's 6,304 landings all indexed correctly, each batch refreshed from disk immediately before writing.
- Four routes answer what page type a file is, and can disagree without saying so. Reported by Aine, 2026-08-27.
- `page-property-computed`'s Design line says the formula language has one test for text, a case-insensitive substring, and no way to match a whole word. That holds of the language now running and fails of the one replacing it, which carries `hasWord`. The line goes when the cutover lands.
- One device UUID names a `device-secret` under two different user folders, so both fold to the same slug and collide within their page type.
- `ops write` takes its body from a file, so writing that file is itself a write with no `ops write` to make it. Every agent working this initiative bootstrapped through a scratch file off the one write path.

**The graph answer cache under `.git/answers` is out of scope**, being the graph system's rather than the pages system's.

**The uniqueness intent came off `page-name`'s Design section on 2026-08-27**, where it was written as an invariant that holds. It does not: 391 names collide across 2,851 pages, each collision inside one repository.
