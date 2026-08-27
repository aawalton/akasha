---
id: f597c4d5-1804-5d4f-94a0-abb51ffda8e5
page-type-slug: finding
title: "Piped truncation no tell"
domain-slug: domain/ops-cli
---

# Claim

`bun ops project list` and similar list-shaped `ops` output emit pure TSV rows with no header, trailer, or count, so a truncated read (`head`/`tail`) carries zero information about its own completeness — three separate instances across two agents and three tools misjudged a row count, a set of refutations, or a log's usefulness because of this, one uncaught until the owner corrected it.

# Evidence

Project #16351 (domain: ops-cli, someday_maybe). No initiative named.

`bun ops project list --status <s>` emits pure TSV rows — no header, no trailer, no count — so a truncated read carries zero information about its own completeness.

Three instances, two agents, three tools, 90 minutes, 2026-07-25:
1. dalla, `tail -3` on `project list` while reading the dispatch capacity gate, nearly took three displayed rows for a count of the gate — caught before acting by noticing the shape.
2. dalla, `head -60` on `project show --properties=notes` (#16189) deciding whether a remedy was stale — concluded "nobody knows this remedy is refuted" and messaged the owner when two refutations were already on the row (one headed "it REVERSES the sizing remedy"), both below line 60 — not caught by dalla, caught by the owner.
3. athena, `tail -22` on `pipeline logs --step check-ast-unused` — returned 22 lines of `[ts-import-graph] skipping workspace …` boilerplate; the violation was above the window ("A tail landing entirely inside boilerplate reads as 'this step logged nothing useful.'") — caught on re-read.

Rule of Three satisfied.

Candidate fix, NOT decided: emit row count in header AND trailer on list-shaped output (survives head or tail truncation), e.g. "47 rows / <rows> / 47 rows". Bounded-output machinery at `packages/shared/cli-core/src/response.ts` appears to bound verb-side `--limit` overflow, not annotate shell-side truncation (inference wanting checking). Does NOT fix prose/narrative truncation (instance 2).

Discipline is not the fix: all three were committed by agents who that evening had briefed others or been briefed themselves. Per #16344's disposal note, anything that must be remembered joins the set it describes.

Working rule until something lands: truncation is for browsing, never for deciding.

Verification (not automated, recorded as a candidate): assert count line present at both ends of list-shaped response, value equals row count, unit test.
