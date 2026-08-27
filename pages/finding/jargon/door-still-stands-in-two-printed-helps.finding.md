---
id: fd2e13de-57e7-591f-917d-3e45dd0c6289
slug: door-still-stands-in-two-printed-helps
page-type-slug: finding
title: "Door still stands in two printed helps"
domain-slug: barred-meaning/jargon
---

# Claim

`door` is retired for anything that refuses, and twelve lines outside `packages/agents/routing-core` still spell it. Two of them are printed help text a reader meets at the terminal: `ops project move-to --help` explains "the commit-less door" and `ops project ask --help` says a document is "refused at the memory door". The retirement's own line asks for the plain phrase, so the word stands in a live surface after the entry it retires it was written.

# Evidence

Measured 2026-08-06 while verifying #18082, which swept the gated-entry sense out of the SMS entry points and left this one standing. `domains/retired/door.md` reads "a gated command, now written as command; anything that refuses, written plainly".

`packages/alanwalton/projects/cli`, by `rg -nP '(?<![\w-])(door|doors)(?![\w-])'` — ten lines in the retired sense:

- `src/project/move-to.ts:85` — "The commit-less door is a positive declaration", inside the printed help string.
- `src/project/ask.ts:38` — "refused at the memory door before this verb ever reads it", likewise printed.
- `src/lib/enforce-handoff-gate.ts:77` — "the child gate's declaration door".
- `src/pure/decide-handoff-gate.ts:24` — "the one ungated door"; `:178` — "The commit-less door is a DECLARATION".
- `src/pure/decide-handoff-gate.unit.test.ts:204, 218, 250, 285` — four more of the same.
- `src/lib/move-to-deploy-wait.ts:352` — "leaves the loop by the SAME door".

An eleventh, `src/pure/decide-check-verdict-identity.unit.test.ts:5`, is "next door" meaning adjacent, which is ordinary English and does not move.

`packages/agents/shared/decide-dead-recipient-routing.ts` carries two more: `:32` "a retired seat is reachable again through any of three doors" and `:121` "Every liveness door below". #18082 classified these as metaphor; read against the retired entry they are the sense itself — a named way in that gates.

The delivering seat reported five lines here. I re-ran the search rather than taking the count, and it is ten.

WHAT I DID NOT MEASURE. I did not sweep the rest of the code repo for this sense; #18082 recorded 582 whole-word lines over 165 files repo-wide, and I classified only the two packages above. I did not measure the instructions repo, which #17982 and #18031 already swept for the gated-command sense.
