---
id: 9ce23254-d95d-5ce0-8f47-68ac410355ab
slug: ops-awen
page-type-slug: review-instructions-report
title: "Ops awen"
---

# Lines

1. **Design — "A command that writes a page proves the write against what already stands there and refuses rather than lands a partial one."**
   - Keep, untrimmed. Probed five writing commands with `--dry-run` against state that is not there: `commit-entity`, `commit-turn`, `publish-turn` and `update-game` against `--game no-such-game-zz`, and `update-doctrine-pack` with a patch whose `policies.0` is a string. Every one refused with the cause named and nothing written. Neither clause is stated elsewhere: `page-types/ops-command.md` binds a command's `kind` and its own document, never what a write must prove.
   - Fork for the principal, on the machinery rather than the line. `publish-turn` refused correctly but exited 70, the unclassified-defect code, where `commit-entity`, `commit-turn`, `update-game` and `update-doctrine-pack` all exited 2. The line is true of it; its exit code is a defect for `ops-awen-publish-turn`'s own reading.

2. **Design — "The extraction passes hold their working state in a cache directory outside both repositories, and each has a `plan`, a `status` and a `quarantine` command, so a pass … resumes."**
   - Repair, landed as `3e158fa`. Three faults in one sentence. "both repositories" names no antecedent, and it understates: all four passes default to `~/.cache/awen-ingest/<story-id>`, outside every repository, which I read back off `ingest-plan`, `chronology-plan`, `class-skill-plan` and `authors-note-plan --help`. The trailing "so a pass … resumes where it stopped" is a reason for the entry, which `domains/domain-design.md` forbids.
   - The trio survives the trim because it is real and unguessable: all twelve of `{ingest,chronology,class-skill,authors-note}-{plan,status,quarantine}.ts` stand in `tools/commands/awen/`, and nothing else in the corpus says a pass owes those three commands.

3. **Design — "Every command is given the game or the story it acts on, and there is no current one."**
   - Repair, landed as `c3a3326`. The first clause is false. Ran `--help` over all 77 awen commands: 11 are given neither a game nor a story — `seed-page-types`, `seed-doctrine-pack`, `seed-display-defaults`, `seed-reveal-spec`, the three `update-{doctrine-pack,display-defaults,reveal-spec}`, `validate-package`, `validate-report`, `migrate-live-games` and `stamp-sessions`. The last two are worse than exempt: each acts on a game named inside its own source.
   - The second clause survives, restated with an antecedent the cut removed: "There is no current game or story." That is the Absence a reader would undo by adding a `use` command, and `grep -rln "currentGame\|current-game\|currentStory"` over `tools/` finds only `update-game.ts`, whose hit is a game's own `currentSession` property. What the cut clause said is in every command's help anyway.

4. **`# Design` and the section beneath it**
   - Keep whole. Three entries survive, one of each kind `domains/domain-design.md` allows: the Absence (no current game or story), the Departure (the pass cache and its trio), and the Departure (prove-then-write). `bun tools/run-gates.ts --file-path domains/ops-awen.md` passes `page-holds-shape` at 16 parts against the shape `domain` states, which requires this heading, and the whole file now measures 689 bytes against the 15000 ceiling.

5. **Definition bullet — "Ops awen — the commands that write by hand the rows a story world is read from, a game's or a fetched serial's."**
   - Keep. One bullet, one concern, no clause on purpose or placement, as `domains/domain-definition.md` asks. "a fetched serial's" is grounded: the four extraction passes act on a fetched serial, and every one of them takes `--story` rather than `--game`.
   - Fork for the principal, on two words. "the commands that write" reaches 46 of the 77: `grep -h "^kind:" domains/commands/ops-awen-*.md` gives 46 intervention against 16 report and 15 ruling, and `gm-load`, `design`, `lore`, `snapshot-state`, `game-continuity` and `roll-log` say "Read" or "Emit" in their own first line. "by hand" has two readings that ask for different things: not by deployed code, or not by the game master's loop — and the GM calls `design` and `lore` mid-turn.

6. **`# Definition` and the section beneath it**
   - Keep. `bun tools/run-gates.ts --file-path domains/ops-awen.md` passes `page-holds-shape` at 16 parts against the shape `domain` states, which requires this heading, and `domains/domain-definition.md` gives the section exactly one bullet, which is what stands here.

7. **Frontmatter**
   - Keep. Every key is load-bearing and measured. `instructions-path: tools/commands/awen/*.ts` reaches all 77 files in that directory and nothing else — the directory holds 77 entries and all 77 are `.ts` — and `ops instructions governs --file-path tools/commands/awen/roll.ts` names this domain over one of them. `page-holds-properties` passes at 7 keys against the 33 `domain` and what it extends declare, and `relations-resolve` at 5 of 5.
   - Weighed cutting `ops-cli` from `domain-parents-slugs`, since `domains/ops-namespace.md` already stands under it, and left it: all 60 sibling namespace domains name the pair the same way, and `domain-owner-slug: ops-cli` names it too. Making this one the exception would cost more than the duplication does.
