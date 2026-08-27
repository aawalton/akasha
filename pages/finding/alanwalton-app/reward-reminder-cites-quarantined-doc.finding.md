---
id: 513d3e48-9e07-5f2f-9414-95f4c42a3d1d
page-type-slug: finding
title: "Reward reminder cites quarantined doc"
domain-slug: domain/alanwalton-app
---

# Claim

The persona reward watcher's reminder to Alan names a document that no longer exists in the code repo: `notificationContent` returns the literal `read packages/alanwalton/personas/docs/persona-reward-loop.md and run today's reward`, and `packages/alanwalton/personas/docs/` is gone, the document standing only in instructions-repo quarantine.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/agent-harness/findings/instruction-text-and-citations.md`, whose last entry states the path "was verified to exist" when it was written on 2026-07-30.

`packages/alanwalton/persona-reward-watcher/src/decide.ts:170` returns the string above from `notificationContent`, the only producer of recipient text in that worker. `ls packages/alanwalton/personas/` returns `cli` and `core` and nothing else; `find ~/code ~/instructions -name "persona-reward-loop*"` outside `node_modules` and `.git` returns nothing. The document stands at `~/instructions/dirty/code/packages-alanwalton-personas-docs-persona-reward-loop.md`, which is the quarantine tree queued for removal, so the citation resolves to nothing now and to nothing later.

Why nothing reports it: the string is runtime output rather than a docblock, so a sweep over code comments does not reach it, and no gate reads emitted string literals as paths. The reward track is also gated off — `REWARD_TRIGGER_ENABLED` is `false` at `persona-reward-watcher.worker.ts:124`, as is `WALLPAPER_TRIGGER_ENABLED` at :139 — so the string reaches no mailbox today and will not until the flag is flipped back, which is the act that would surface it.

The sibling class is already recorded at `pages/finding/infra/check-docblocks-cite-quarantine.finding.md`, which covers three `packages/infra/` docblocks citing quarantined documents. This adds a site in a different package and a different carrier: the reader who follows the dangling name is Alan reading a notification, not an agent reading source.

Not established: whether the reward loop's content survived the move into quarantine anywhere else, or whether the flag is intended to be flipped back at all.
