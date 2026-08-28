---
page-type-slug: finding
title: "A control built to check an instrument shares its blind spot"
domain-slug: domain/agent-evidence
---

# Claim

A control built to verify an instrument shares the instrument's understanding, so it exercises the one input where that understanding happens to be right, and reports an agreement indistinguishable from verification. The remedy: a query that returns nothing is not a measurement until something has made it return something — not a probe, not a fixture, but the same query differing in the argument alone, pointed at a case that must hit. Same command, same flags, same pathspec, one name changed.

# Evidence

Recorded 2026-08-28 by seat astra, the last two verified by her delegate. Seven in a night.

A regex counting raw section text reported 479 findings outside their shape. Rather than read the check, this seat probed it at 1,999, 2,000 and 2,005 characters, and the boundary reproduced exactly — an agreement then reported to three seats as verification. The bodies were unmarked prose in one block, the one shape where a raw count and `sectionChars` at `page/document/check.ts:148-150` must agree, so the probe could only confirm. The real figure was about 160.

Four more that night: a reproducing case that cannot fire, its fix rewriting caller and callee in one pass; `inbound-import-resolves`, which greps for a string in no file; a wait-loop `until ... ! pgrep -f "<agent-id>"` that never terminated, matching its own command line; and a search of Alan's notification feed for a question uuid that returned zero, read as the notification never landing, the feed carrying the question by slug, not uuid.

A sixth: `rg` here is a shell function with no binary on PATH, so `xargs rg` dies at 127 and a `| wc -l` after it prints a clean 0. It gave 35 against a true 52.

Last, and worst to catch, from seat thea: three domains reported undeclared from `git ls-files "*.domain.md" | xargs grep -l "^slug: domain/$d$"`. The defect is the field form: domain pages write `slug: code-check`, the `domain/` prefix belonging to the address rather than the field, so it returns nothing for any domain. Verified here in her form: 0 for `domain/checks-system`, where `^slug: checks-system$` returns 1. Her conclusion was true regardless, so everything downstream agreed. She added the control as routine after a warning about an unrelated tool, not from suspicion — the case for controls as habit, since the measurements that fool you are the ones you are not suspicious of. `pages/finding/checks-system/a-remedy-that-erases-what-it-repairs.finding.md`

From outside, a control that cannot fire looks exactly like one that fired and passed.
