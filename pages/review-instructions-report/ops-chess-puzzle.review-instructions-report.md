---
id: c5877a94-f869-5295-a716-e59719510a7a
page-type-slug: review-instructions-report
title: "Ops chess-puzzle"
---

# Lines

1. **Design — "No command here counts a solved puzzle."**
   - Cut. True, and bound elsewhere. `ops chess-puzzle --help` names the whole namespace — `query`, `solve`, `sync` — and none of the three counts: `query` prints one TSV line per matching puzzle, `sync --limit 5 --json` answers `{"read":5,"skipped":0,"matched":5,"upserted":5}`, rows read and written rather than puzzles solved, and `solve zzzNOPE --json` answers `{"outcome":"not-found"}` at exit 2.
   - `domains/chess-puzzle.md` binds where counting lives: "A puzzle marked solved is what Erin's chess points worker counts, one point each." This line states that same arrangement from the other side, so two documents bind one claim and neither is the original.
   - The reader holds both. A seat in this domain walks to `chess.md` as a parent, and `chess.md` draws `chess-puzzle` in under `glossary-slugs:`, which `compose-boot` embeds whole. Counting from outside the namespace is `ops page list --type chess-puzzle --count` over a `solved` filter, which answers 0 today.

2. **Design — "Both writing commands are keyed on the Lichess puzzle id, so re-running either changes nothing a first run did not."**
   - Cut. True, and I ran both halves I safely could. `sync --limit 5 --json` twice running answered `upserted 5` each time while `ops page list --type chess-puzzle --count` stood at 5000 before and after, so the second run wrote nothing the first had not. `solve zzzNOPE --json` answered `{"outcome":"not-found"}` at exit 2, the puzzle id being the key it looks a row up by.
   - `domains/chess-puzzle.md` binds the keying — "A puzzle is keyed on its Lichess id, so the same puzzle read twice is one puzzle" — and the idempotency is that invariant seen from the command end, a run appending a second row for one id being a breach of it. What a caller wants stands in each command's own `--help`: `sync` says "idempotent re-runs", `solve` says "re-solving an already-solved puzzle is a no-op".
   - What I could not run: `solve` on a puzzle already solved. No stored puzzle carries `solved` true, the count being 0, and making one writes a point into Alan's practice record that the `erin-chess-points` worker reconciles off the row. Separately, "keyed on the Lichess puzzle id, so" is a reason for the entry, which `domains/domain-design.md` does not let a Design entry carry.

3. **Design — "No command here composes a puzzle; each one it stores came from Lichess."**
   - Cut. True: `sync` with no `--file` streams `https://database.lichess.org/lichess_db_puzzle.csv.zst` and answered `read 5, skipped 0, matched 5, upserted 5`, and `query --motif fork --min-rating 1200 --max-rating 1400` hands back Lichess ids with the position and the line — `02AeY`, `02qUN`, `00xsd`. `query` only reads, `solve` only flips a marker, and `ops chess-puzzle --help` names no fourth command that could compose one.
   - `domains/chess-puzzle.md` says it already, in almost the same words: "Every puzzle comes from Lichess's open database; nothing here composes one." Two documents binding one claim leave a reader meeting both with no original, and this is the copy: where a puzzle comes from is the puzzle's own domain, and these commands only store what it defines.

4. **`# Design` and the section beneath it**
   - Cut, and it went in `1aa6e7b` with its last entry, as the mend that cut made necessary. `page-body-shapes/domain.md` gives `design` a `{design}` slot rather than a bare heading, so the section cannot stand empty, and the three entries beneath it had each gone to `domains/chess-puzzle.md`, which the same reader already holds.
   - `ops instructions run-gates domains/ops-chess-puzzle.md` passes `page-holds-shape` at 16 parts against the shape `domain` states with the section gone, and `page-types/domain.md` says outright that a slug and a definition is a whole domain rather than a stub.

5. **Definition bullet — "Ops chess-puzzle — the commands that fill the puzzle set from Lichess, pick one by motif and rating and mark it solved."**
   - Repair. "pick one" is false. `ops chess-puzzle query --motif fork --min-rating 1200 --max-rating 1400` hands back 20 rows, which is its default cap and not a choice among them, and `--limit 3` hands back 3. `domains/commands/ops-chess-puzzle-query.md` reads it the same way — "the stored puzzles carrying a motif and inside a rating band, easiest first".
   - The other two clauses hold as run. `sync` with no `--file` fills the set from the Lichess database, and `solve` takes one puzzle id as its only positional and marks that row, so "mark one solved" is where the count belongs. Repaired to "fill the puzzle set from Lichess, pick by motif and rating, and mark one solved".
   - One bullet naming one concern, with no clause on purpose or placement, as `domains/domain-definition.md` asks. `pick from it by motif and rating` was the first draft: it measured 106 characters against the 100 the `body` slot allows and `page-holds-shape` refused it, so `from it` went and the puzzle set named a clause earlier carries the reference.

6. **`# Definition` and the section beneath it**
   - Keep. `page-body-shapes/domain.md` gives `definition` a repeat of 1, so the heading is the one part of this body that is not optional, and `domains/domain-definition.md` gives the section exactly one bullet, which is what stands beneath it now that nothing else does.

7. **Frontmatter**
   - Keep, with `reviewed-date` stamped at the end. `instructions-path: tools/commands/chess-puzzle/*.ts` reaches the directory exactly: it holds three entries, `query.ts`, `solve.ts` and `sync.ts`, all three `.ts`, and `ops instructions governs` over each of the three names this domain along with that command's own document. That is the set of files this domain is about, which is what `page-types/domain.md` asks of a glob.
   - `ops instructions run-gates domains/ops-chess-puzzle.md` passes `page-holds-properties` at 7 keys against the 33 `domain` and what it extends declare, `relations-resolve` at 5 of 5, `domain-slug-stem`, `domain-slug-unique` over 2465 domains, and `repo-agrees`.
   - Weighed cutting `ops-cli` from `domain-parents-slugs`, since `ops-namespace` already stands under it, and left it. Both sibling namespaces under `chess`, `ops-chess` and `ops-chess-game`, name the same three parents in the same order, and `domain-owner-slug: ops-cli` names it too; making this one the exception costs more than the repetition does.
