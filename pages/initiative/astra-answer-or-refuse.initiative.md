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

# Notes

Opened 2026-08-28 to hold the rule and its evidence, which outgrew `astra-pages-system-core`. The rule is on `pages/domain/pages-system.domain.md`: refuse where you cannot answer, rather than answering as though there were nothing. A true empty and a failure read alike, and only one of them is a fault.

**The corpus arrived at this rule sixty-six times before any page wrote it down.** Grepping the phrase two checks use — "reads exactly like" — and excluding story and persona prose leaves 66 across eight top-level areas: 49 in `pages/`, 5 in `tools/`, 5 in `page/`, 2 in `graph/`, 2 in `editor-extension/`, one each in `infra/`, `deploy-system/` and `cache/`. In code comments, tests, findings, domain pages and a CLAUDE.md. The canonical sentence is on a refusal page rather than in any audit — `pages/refusal/command-surface-unread.refusal.md:14`: a check that quietly stops looking reads exactly like one that kept passing. `page/index/build.ts:412` says "answer nothing, which reads exactly like a repository with no page in it". `graph/edge/graph-edge.page-type.md:30` carries it on a page type, not in code at all.

That is the answer to Dilution, which is the only real objection to siting it wide. A line on a widely-read domain costs every reader at every boot, and the test is whether it earns that. Sixty-six independent rediscoveries in eight areas is the earning: each is a writer who hit this, worked it out alone, and wrote their own sentence because there was no rule to cite.

**`code-quality` is the candidate, and its own rules are the argument.** It carries `Real Path` — "two spellings of a path open the same file, so nothing fails until a comparison quietly answers no" — which is this rule in different words, and `Bounded Wait`, which is the same family from the other end. Cross-domain, not Global. `domain/coding-definitions` was considered and rejected: its Definition is "what the words used about code mean", a glossary. One wrinkle to carry rather than hide — `code-quality`'s Definition says "how a body of code is organized and structured, and what has been left in it", and none of its three rules is about organization, so that Definition is already stretched by what it holds.

**The largest instance so far: 361 refusals in one check.** A fix to read page types off the index rather than globbing reached one reader and not the two beside it, so `pages-hold-properties` reported 429 faults of which 361 were the check unable to reach a declaration and saying the property did not exist — 314 of them for declaring `label` on `readout`, which has always been declared. 429 to 3 at `014a2c82d`.

**The sharpest instances are not functions but types.** `FileTree.roots?: Roots` permits the absence and gives it a meaning: omitting the field compiles, typechecks, passes every gate, and reads as a tree spanning nothing.

**The instruments meant to catch this have it**, in two opposite halves, each surviving a fix to the other: `rootsFor` drops files a project excludes, the root reference list drops whole trees.

**The channel to Alan was the live one**: `feedFor` answered null on a failed query, the caller read null as absence, and `ops ask-alan` reported that no feed names Alan while his feed page sat correct on disk. At least five and a half hours in which no agent could reach him asynchronously. Not established: whether it was failing before the service came down.

**Two questions are open with Alan**: the siting of this rule (`01a047db`), and whether the typecheck gate code or its Design line is wrong (`01a047da`). Proven on 2026-08-28 as far as the feed; whether a feed row reaches his device is not observable from here.

**The rest**, and most of it is now closed — the empty `catch` in `rowAppender`, the `--input-file -` half-act, and both audit populations were repaired on 27-28 August. Still live: `writePage` returns null when it cannot place a page; a fixture checkout without `.git` reads as a workstation holding no seats; a presence check on `git ls-files` exit status passes on a missing file, because it exits 0 when it matches nothing.

**A second rule is inside this set and must not be folded in.** `seatWarrantsFor` against `subagentWarrantsFor`; `seatWarrantsFor` against `seatWarrantsWithDefaults`; `replacedAt` resolving the writer's own page while `tools/lib/seat-record.ts:19` resolves the seat's. That fault is not an absence read as an emptiness — it is one question with two spellings that drift apart, each correct about its own premise. Folding it in would make the wider rule look like it covers ground it does not.

**It reaches method as well as code.** A piped `ops read` records nothing, so a read followed by a count reads exactly like a clobber: 2, 2, 2, where unpiped it goes 2 to 8. What saved the reader each time was expecting a number to move and finding it had not.
