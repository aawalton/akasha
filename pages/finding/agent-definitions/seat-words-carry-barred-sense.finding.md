---
id: 6e7902aa-4d01-5107-ab84-33a12e15e09c
slug: seat-words-carry-barred-sense
page-type-slug: finding
title: "Four words settled about a seat still carry the sense the corpus barred"
domain-slug: domain/agent-definitions
---

# Claim

Four words carrying a sense this system has already settled about a seat still stand in the harness's own code. `revive` is named by no domain at all, live or barred, and stands there as a whole subsystem. `wake`, `paused` and `dormant` each have a barred meaning naming the one sense they may not carry, and each still carries it.

# Evidence

Counted on 2026-08-22 across `tools/` and `services/` in akasha, by matching each word with its surrounding token and grouping the results by that token.

`revive` — 179 occurrences of the bare word, 48 of `revived`, and named compounds beside them: `reviveCalls` 26, `ReviveVerifySignal` 14, `reviveTimeoutMs` 13, `decideRevivePlacement` 12, `decideReviveLaunch` 11, `reviveAtMs` 10. No page under `pages/barred-meaning/` bars it, and no page in the corpus carries a Definition bullet for it. Four pages name it in passing, none defining it. This is the one of the four that fails Plain Or Declared rather than carrying a barred sense.

`wake` — barred as "a message that earned the start of a stopped seat; now any message starts one". Both senses stand, and a barred meaning bars one sense only. The barred sense stands in `tools/lib/decide-wake-match.ts`, `wake-comms-input.ts`, `wake-armed-specs.ts`, `persona-wake-slugs.ts`, `recipient-resolver-registry.ts`, `recipient-resolver-tick-deps.ts`, `turn-end-refusals.ts` and `turn-end-log-command.ts`. The other sense is Alan's sleep schedule, legal here, accounting for six further tokens under the tracking and food directories.

`paused` — barred as "a seat present but not working; now written as present with an idle turn". 15 occurrences of the bare word and 2 of `notPaused`.

`dormant` — barred as "a seat with no process in it that a message would bring back; now written as absent". Two occurrences, one of them `DORMANT`.

`spawned` — no page under `pages/barred-meaning/` stands for `spawn` or `spawned`, so that withdrawal is written nowhere I found.

Not established: whether every individual occurrence carries the barred sense. I grouped by token and by directory and read a sample of lines rather than all of them, so the per-word counts are of the word and not yet of the sense, except where the directories separate them as they do for `wake`. Not searched: the memory repo or the books repo. Not established: whether `revive` is defined outside `pages/`.
