---
id: edd41d5f-28e4-523a-a109-8bbd90e90f94
slug: watcher-token-signal-blind
page-type-slug: finding
title: "Watcher token signal blind"
domain-slug: domain/instrument
---

# Claim

`watcherTokenLastUsedAt` cannot distinguish an instant failed watcher exit from a complete successful characters sync — it reads null after both, because characters and inventory sync bypass the token path and write direct to Postgres — yet it stands in the product as though it means something, and is a candidate for retirement once #15958's `lastRunOutcome` ships.

# Evidence

Filed as project #15960 (domain instrument). Gated on Ryn's confirmation — she owns the field, was not live at capture time; do not dispatch until she confirms. Deliberately not bundled into #15958: pure subtraction sharing no code with that addition, four files across two packages, outside that project's fence.

The defect: `watcherTokenLastUsedAt` reads null after an instant failed watcher exit and null after a complete successful characters sync, because characters and inventory sync bypass the token path entirely and write direct to Postgres. It cannot distinguish its target from its target's absence, yet stands in the product as though it means something. Renaming it would yield an accurately-named blind instrument and invite more reliance, not less.

Why retire rather than fix: #15958 adds `lastRunOutcome` on the same temper-watcher row, whose `ranAt` is the honest version of this signal — genuinely written on every run rather than null in both directions. Leaving both fields would give future readers two that look like they answer the same question.

Scope, from worker-15958's survey: zero readers repo-wide, so retirement is pure subtraction. Four writers to remove: `web/app/lib/watcher-auth.ts:44` (only live writer), plus null-initializers at `scripts/src/watcher-exe/watcher-token.ts:53`, `scripts/src/resolve-user.ts:88`, `scripts/src/import-pricing.script.ts:203`. Soft-delete the property definition `019e6eb2-ec02-7ce1-ba4c-f7d31278fc47` — never hard-delete, which would collapse "retired" into "undeclared" and redden the next deploy via the property-definition coverage gate.

Sequencing: land after #15958, so the honest replacement exists before the blind one is removed. Confirm with Ryn first.
