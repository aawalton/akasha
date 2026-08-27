---
id: d624396e-86ce-5efb-8fee-03dfa3f323dd
page-type-slug: finding
title: "Project list tsv drops columns"
domain-slug: domain/ops-cli
---

# Claim

The `project list` TSV renderer has a fixed three-column shape (seq, status, title): a `--properties` value outside that trio is fetched correctly but silently discarded by the renderer, so a column of blanks for a property like claimedAgent or owner is indistinguishable from the property being genuinely unset, while the same query's JSON output carries an `omitted[]` array naming exactly what it dropped.

# Evidence

Project #16410 (status someday_maybe, domain ops-cli), observed by dalla 2026-07-26 while checking which of her own rows were claimed.

`project list`'s TSV renderer has a fixed three-column shape (seq, status, title); `--properties` does not choose columns, only which of those three get filled. A requested property outside the trio is fetched correctly then silently discarded by the renderer. Confirmed: `list --seqs 16388 --properties status` -> only the middle column filled; `list --seqs 16388 --properties seq,status,title` -> all three; `list --seqs 16388` (baseline) -> identical to the second. And: `show 16388 --properties claimedAgent` -> correct value; `list --seqs 16388 --properties claimedAgent` (TSV) -> three empty fields; same with `--json` -> correct.

Self-experienced harm: `project list --owner dalla --properties seq,claimedAgent` returned a column of blanks. Correct reading: TSV cannot carry claimedAgent. Natural reading: none of dalla's rows are claimed -- these diverge into opposite dispatch decisions, risking a second worker dispatched onto an already-claimed row.

Doctrine cited: `.claude/docs/unix-philosophy.md` "Announce Every Bound" line 49 ("a truncated result greps as ABSENCE"), line 57 ("fail loud when the bound cannot be determined"), line 59 ("widening a default is not a fix").

Adjacent to #16388 (500-row cap: rows silently dropped) -- this is columns silently dropped, same surface and doctrine, plausibly the same entity-surface core, but a different fix; filed separately since #16388's worker was already at implementation.

Sharpened 2026-07-26T04:27:28Z by aine, who independently verified against psql ground truth (not taken from dalla's report): owner = "athena"; TSV `--properties seq,owner` -> "16409\t\t" blank; JSON `--properties seq,owner` -> correct, and JSON's `omitted[]` array honestly names every field it dropped -- giving the fix its model: JSON already distinguishes "absent from this projection" from "not set on the row."
