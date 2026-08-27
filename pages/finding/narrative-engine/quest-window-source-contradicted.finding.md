---
id: 5ad76a3f-f9e7-523e-a989-3b91f30a7b98
page-type-slug: finding
title: "Quest window source contradicted"
domain-slug: domain/narrative-engine
---

# Claim

The docblock above `ClientQuestSchema` tells a reader the quest-added and completion windows are derived from two fields the schema it describes does not have, and routes them to a file that derives no such thing. `QuestSchema` has six keys, neither `addedTurn` nor `completedTurn`; `quest-projection.ts` exports only the panel filter, and its own docblock says the windows are a separate concern. Two live comments in one package disagree about where a rendered surface comes from.

# Evidence

At `~/code` on `main`, `packages/alanwalton/web/app/awen/lib/client-session.ts` lines 62-64 read "The reader derives the panel (every non-complete quest) and the quest-" / "added/completion windows (`addedTurn` / `completedTurn`) from this list; see" / "`quest-projection.ts`." The phrase wraps two lines, so a single-line search returns nothing; it is reachable only multiline. Line 65 is `export const ClientQuestSchema = z.object(QuestSchema.shape).strict()`, so "this list" is `QuestSchema.shape`.

`QuestSchema` at `packages/alanwalton/awen/core/src/quest-schema.ts` is `z.object({ id, title, objective, conditions?, reward?, status }).strict()` — six keys, no `addedTurn`, no `completedTurn`. Under `.strict()` a quest carrying either field fails the boundary loud, so neither can reach the served list at all.

`packages/alanwalton/web/app/awen/lib/quest-projection.ts`, the file the comment routes to, is sixteen lines and exports one function, `deriveQuestPanel`, which is `quests.filter((q) => q.status !== "complete")`. It derives no window. Its own docblock says the opposite of the comment routing to it: a completed quest's "closure is announced by an in-flow quest-complete WINDOW — a typed system-window block frozen into the turn, a separate concern from this live ledger". The docblock on `quest-schema.ts` agrees with it, calling the notifications "not derived from this live ledger". So the contradicting account is the one sitting on the type a reader of the client envelope opens.

The cost is a reader looking for a per-quest turn stamp that does not exist. `dirty/code/packages-alanwalton-awen-claude.md` stated the quest shape as carrying `addedTurn?` and `completedTurn?` and described a `components/quest-windows.tsx` rendering one card per event — evidence this account has been written down as authoritative once already. `rg -uuu -l "quest-windows"` over `~/code` exits 1; the tracked component is `components/quest-card.tsx`.

Found ingesting `dirty/code/packages-alanwalton-awen-claude.md`.
