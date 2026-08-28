---
id: 01a046f2-3c11-7000-9d2e-4b7a1f8c6e05
page-type-slug: initiative
slug: astra-answer-or-refuse
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- Answer Or Refuse is written on the domain that reaches every place it holds, rather than on one that reaches three.
- No reader in the pages system answers an absence where what happened was a failure to look.
- The channel an agent uses to put a question to Alan works.

# Notes

Opened 2026-08-28 to hold the rule and its evidence, which outgrew `astra-pages-system-core`. The rule is on `pages/domain/pages-system.domain.md`: refuse where you cannot answer, rather than answering as though there were nothing. A true empty and a failure read alike, and only one of them is a fault.

**The corpus arrived at this rule sixty-six times before any page wrote it down.** Grepping the phrase two checks use — "reads exactly like" — and excluding story and persona prose leaves 66 across eight top-level areas: 49 in `pages/`, 5 in `tools/`, 5 in `page/`, 2 in `graph/`, 2 in `editor-extension/`, one each in `infra/`, `deploy-system/` and `cache/`. In code comments, tests, findings, domain pages and a CLAUDE.md. The canonical sentence is on a refusal page rather than in any audit — `pages/refusal/command-surface-unread.refusal.md:14`: a check that quietly stops looking reads exactly like one that kept passing. `page/index/build.ts:412` says "answer nothing, which reads exactly like a repository with no page in it". `graph/edge/graph-edge.page-type.md:30` carries it on a page type, not in code at all.

That is the answer to Dilution, which is the only real objection to siting it wide. A line on a widely-read domain costs every reader at every boot, and the test is whether it earns that. Sixty-six independent rediscoveries in eight areas is the earning: each is a writer who hit this, worked it out alone, and wrote their own sentence because there was no rule to cite.

**`code-quality` is the candidate, and its own rules are the argument.** It carries `Real Path` — "two spellings of a path open the same file, so nothing fails until a comparison quietly answers no" — which is this rule in different words, and `Bounded Wait`, which is the same family from the other end. Cross-domain, not Global. `domain/coding-definitions` was considered and rejected: its Definition is "what the words used about code mean", a glossary. One wrinkle to carry rather than hide — `code-quality`'s Definition says "how a body of code is organized and structured, and what has been left in it", and none of its three rules is about organization, so that Definition is already stretched by what it holds.

**One reader answered 361 refusals with this defect in a single check.** `page/property/registry.ts` had been fixed to read page types off the index rather than globbing `pages/page-type/**`, and the fix went to one reader and not the two beside it: `page/property/frontmatter.ts:140` and `page/property/declarations.ts:136`. The index carries 393 page types and 2,288 property definitions; those two saw 382 and 2,231. The eleven page types and 57 property definitions filed under `graph/` and `readouts/` were invisible. So `pages-hold-properties` reported 429 faults of which 361 were the check unable to reach a declaration and reporting that the property did not exist — 314 pages refused for declaring `label` on `readout`, which `readouts/readout/readout-label.page-property-definition.md` has always declared. The pages were obeying `pages/page-type/page-type.page-type.md:28`, that a page type and its property definitions live where their domain lives. 429 to 3 at `014a2c82d`.

**The sharpest instances are not functions.** `FileTree.roots?: Roots` is a type permitting the absence and giving it a meaning: omitting the field compiled, typechecked, passed every gate, and read as a tree spanning nothing while 314 pages were refused for declaring properties nowhere. `globsIn(undefined, globs)` at `page/page-types.ts:213` answers an absent `roots` by returning the globs unchanged, keeping the directory each was written with, where roots flatten them to `**/<name>`. No runtime guard reaches that one.

**The instruments meant to catch this have it.** `rootsFor` in the typecheck check returns an empty list where a project claims none of a patch's files — no roots, no program, no diagnostics, `none refused` — and 774 test files land unjudged. Separately the root `tsconfig.json`'s `references` list covers 52 projects across four top directories and omits nine that carry a tsconfig, so `bunx tsc -b` answers exit 0 with zero output while `ops checks audit typecheck` finds 176. These are opposite halves rather than one defect twice: `rootsFor` drops the claimed-but-excluded, the reference list drops whole trees. Fixing either leaves the other.

**In the pages system itself.** `pages-system/store/files.ts:105` called `Bun.YAML.parse`, which under node throws into the module's own catch and is reported as unreadable frontmatter; `pageTypesIn` skips such pages, so the store told a node caller the repository declares no page types at all. Found in thirty seconds by the first caller to try the clean core, one layer beneath where the rule had been landed four hours earlier. Fixed at `8a2052c1f`.

**The channel to Alan is the live one.** `feedFor` at `tools/lib/push-notification/feed.ts:42` answered null on a failed query, and the caller read null as absence, so `ops ask-alan` reported "no notification feed names the person `alan`, so this push reaches nobody" while `pages/notification-feed/alan.notification-feed.md` sat correct on disk. The query had failed because `askComposed` reaches a page-query service that `620c77034` held down at 16:32 on 2026-08-27 and later commits removed. The three sibling asks in that file, at :84, :110 and :121, have always thrown the reason. At least five and a half hours in which no agent could put a question to Alan asynchronously. Message fixed at `b3cd74bb9`; the outage is separate. Not yet established: whether it was already failing before the hold-down, and which routes to Alan were unaffected — an interactive seat's words reach his terminal directly, so this may be "agents could not ask" rather than "nobody could reach him".

**One question is owed to Alan and never reached him**, refused by that outage rather than declined: whether this rule moves to `code-quality`. Re-ask once the channel is back.

**The rest.** `writePage` returns null when it cannot place a page. `rowAppender`'s `catch {}` made an append that never reached disk indistinguishable from one that did. `mock.module` accepts a specifier resolving to nothing and loads the real module instead of the stub. A fixture checkout without `.git` reads as a workstation holding no seats. A presence check on `git ls-files` exit status passes on a missing file, because it exits 0 when it matches nothing. `ops write --input-file -` reads nothing, performs the `--remove` half of the same act, and reports success. `tools/audits/property-types-bind.ts:50` reads a population of 2,231 where the index holds 2,288. `tools/audits/pages-hold-shape.ts:58` is a bare read where its sibling wraps the identical call and reports that the page left the tree mid-run.

**A second rule is inside this set and must not be folded in.** `seatWarrantsFor` against `subagentWarrantsFor`; `seatWarrantsFor` against `seatWarrantsWithDefaults`; `replacedAt` resolving the writer's own page while `tools/lib/seat-record.ts:19` resolves the seat's. That fault is not an absence read as an emptiness — it is one question with two spellings that drift apart, each correct about its own premise. Folding it in would make the wider rule look like it covers ground it does not.

**It reaches method as well as code.** `ops read` refuses to record when printed to a pipe, so a piped read followed by a count reads exactly like a clobber: 2, 2, 2. Unpiped it goes 2 to 8. Three seats were caught by that in one night, and a fourth surface is a truncated per-item list read as a whole one. In each case what saved the reader was expecting a number to move and finding it had not.
