---
id: 5611c297-fbf3-5ac7-a953-2b9d161db731
slug: bare-code-paths-resolve-nowhere
page-type-slug: finding
title: "Bare code paths resolve nowhere"
domain-slug: domain/global
---

# Claim

Five instruction documents spell a code path bare — `packages/alanwalton/personas/registers/<colour>.md` on `domains/tasks/persona-reward/send-daily-reward.md:25`, and the same shape on `pages/task/create-persona-voice.task.md:20`, `port-supervisor-file.md` and `pages/domain/spotify.domain.md:17`. None resolves from the instructions repo, which holds no `packages/`, and `ops instructions read` refuses the code repo outright. Rooting one breaks step with the other four.

# Evidence

Filed by the seat dispatching the 2026-08-14 `review-instructions` reading of `domains/tasks/persona-reward/send-daily-reward.md`, from that reading's hand-back. That reading had it down as a repair and backed off, on the ground that bare `packages/...` is the settled spelling for a code path in prose and a horizontal change is what settling it costs.

It reports running `ops instructions read` against an absolute code-repo path and being refused, the verb naming the four repos it does reach — `instructions`, `memory`, `books`, `stories`.

Not measured: I did not open any of the five sites or count them across the corpus, so four siblings is that reading's figure and a floor rather than a count. Nothing here says whether the bare spelling costs a reader anything, given that no verb in this repo would resolve a rooted one either.
