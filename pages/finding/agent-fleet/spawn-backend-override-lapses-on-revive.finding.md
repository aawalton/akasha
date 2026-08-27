---
id: 48ef1e47-3f02-5308-9844-e3114bac47e5
page-type-slug: finding
title: "Spawn backend override lapses on revive"
domain-slug: domain/agent-fleet
---

# Claim

`ops seat start`'s three per-agent backend-override flags — `--model`, `--anthropic-base-url` and `--anthropic-auth-token` — apply only at spawn, and neither `ops seat revive` nor `ops seat restart` re-applies them. `spawn --help` documents all three at length without saying so, so a seat revived after being pointed at an alternate backend silently comes back on the shared OAuth-proxied Claude backend, and nothing reports the change.

# Evidence

`rg -n "anthropicBaseUrl|anthropic-base-url|model" packages/agents/cli/src/agent/revive.ts packages/agents/cli/src/agent/restart.ts` returns ZERO matches — neither verb threads the override to the supervisor it launches. Run bare, unpiped to any truncating filter.

`ops seat start --help` gives each flag a multi-line description: `--model` "wins over the resolved worker model for this agent only. Threaded verbatim to `claude --model`"; `--anthropic-base-url` naming the macbook ollama at `http://100.64.0.2:11434/`; `--anthropic-auth-token` with the `ollama` placeholder. None of the three mentions the spawn-only lifetime, and the help's worked example (`ops seat start --name aria-awen-gm --anthropic-base-url … --model hf.co/TheDrummer/Cydonia-24B-v4.3-GGUF:Q5_K_M --anthropic-auth-token ollama`) is exactly the seat the gap bites: a named resident, which is the kind that gets revived.

The failure is silent in both directions. The override lapses without an error, and the seat that comes back is byte-identical in every surface a reader checks except which endpoint it talks to.

Found while ingesting `dirty/code/packages-agents-cli-claude.md`, whose `spawn` paragraph states the lifetime plainly: "The override applies only at the two supervisor boot points (base-url + model); `revive`/`restart` do NOT re-apply it, so re-point by re-spawning rather than reviving." I probed to falsify that and found it true and uncarried. Filed rather than kept, because repairing the help removes the claim.
