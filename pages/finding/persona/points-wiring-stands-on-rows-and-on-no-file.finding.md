---
id: 176d968e-4c63-5179-a322-af47efe805fa
page-type-slug: finding
title: "Persona points wiring stands on rows and on no file"
domain-slug: page-type/persona
---

# Claim

Every persona's file carries `total-points` — the RESULT — but nothing carries the rule that produces it. Six `pointsSource*` keys sit on the soft-deleted `persona` rows and on no file. `source-slug` and `scale-slug` read back on 41 of 41 personas but are uniform `readout` defaults rather than per-persona values, so a key-presence check reads as covered. When the rows are hard-deleted the totals survive and no file states how to recompute them.

# Evidence

Measured 2026-08-20 against `DATABASE_ADHOC_URL` and the live query service. The `persona` row was soft-deleted at 14:30:10 with 40 pages live at retirement; the files answer n=41.

`abby.md` frontmatter states `total-points: 4693255` and no points-source key. Reading `abby` through the service returns `source-slug: readout-source-personas` and `scale-slug: readout-scale-green-day-units` — the same two values every persona returns, inherited from `readout`.

The row for `abby` carries `pointsSourceKind: windowed`, `pointsSourceAggregate: bytes`, `pointsPathPrefix: packages/books/all-about-alan/`. None of the three is on any file.

The full per-persona wiring on the rows, 40 personas:

- windowed: `abby` bytes packages/books/all-about-alan/; `ali` bytes packages/books/book-of-everything/; `lali` bytes packages/books/my-math/; `talia` bytes packages/books/my-faith/; `eppie` song-listen sum newMusicMinutes; `grace` session-tracking weighted safetyLevel; `shaestrel` appearance-experiment count
- external: `aranya` cluster-downtime; `aria` story-chapter-words; `ceri` anime-episode-completions; `erin` chess-practice-points; `iris` tower-words; `nova` words-read; `zadi` gbww-chapter-completions; `astra` `athena` `atlas` `aura` `awen` `dalla` `echo` `elin` `ember` `nimue` `olwen` `rhia` `ryn` `thea` `vera` owned-project-completions; `ruby` `selah` `zeli` no source
- direct: `aelwyn` `ione` `natalie`; manual: `aine` `sophia`; seed: `mari`; stoplights: `amy`; unavailable: `elaine`

Separately confirmed NOT lost, against an earlier report: `cover` (40/40 on files), `total-points` (39 on files), `level` and `percent-progress` — the last two are `type: formula` in their property documents, computed from `total-points` and `green-day-points`. `value` is on files as `value-slug` 40/40.
