---
page-type-slug: finding
title: "A check page can state a rule that nothing enforces"
domain-slug: domain/checks-system
---

# Claim

A check page can state its rule correctly, go on being refined, and enforce nothing, with nothing on the page saying so. A page whose phase keys all read false is word for word as authoritative as one that gates every write, and the two are told apart only by code the reader is not looking at. Six of the fifteen check pages refuse no change today, and one of the six has never refused anything in its life.

# Evidence

Measured 2026-08-28 over the fifteen pages under `checks-system/check/` and the code that reads them.

`checks-system/checks.ts:93-95` computes whether a check refuses a change as `ON_PATCH || ON_WORKTREE`, and `patches/patch.ts:113` runs `checksOnPatch()`, which is the only path by which a check refuses a write. Six pages state both keys false, so six refuse nothing:

    folder-matches-a-shape
    links-resolve
    page-holds-to-its-type
    page-name-unique
    read-what-is-required
    require-import-extension

`folder-matches-a-shape` is the instance that cannot be explained by a stand-down. It is the only one of the fifteen also stating `check-on-audit: false`, so it stands in none of the three default sets and is reachable only by naming it to `ops checks audit`. `git log -S "check-on-patch: true"` over its page returns no commit: it has never once refused anything. Its page has four commits, and three of them — `056c13434`, `a6019b1a8`, `e1ef8a0ab`, all authored by Ryn — refine the rule, narrowing it from enumerating the shapes to naming one, and settling that a type declaration file is not a code file. The page got more nearly right three times while enforcing nothing.

The two states are not distinguishable on the page. `checks.ts:84` answers `said !== false && said !== "false"`, so an absent key reads as true and an absent key and an explicit `false` are opposite in effect. `read-before-write` states none of the three keys and therefore runs in all three; I met it myself tonight, refusing an `ops finding create` by name for a page type I had not re-read.

A sweep handed to me reported that all fifteen carry `check-on-worktree: false`. That is not what the pages say. Fourteen state it and `read-before-write` omits it, so exactly one check runs on a worktree — and it runs there because its page is silent, not because anyone chose it. `ops-cli/worktree/check/check.command.code.attachment.ts:56` is what consumes that list.

Not measured, and deliberately not: which of the six ought to gate. A check that has never refused anything will refuse work already in flight the moment it is switched on, so that is a decision rather than a repair, and the pages record no reason for any of the six standing where it does.
