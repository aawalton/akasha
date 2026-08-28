---
id: 1bf7a7ce-b656-5e2f-93a2-2181868c8e09
slug: user-scoped-probes-unwrapped
page-type-slug: finding
title: "User scoped probes unwrapped"
domain-slug: domain/collections
---

# Claim

Eleven user-scoped Spotify probes are wrapped in no restriction helper at all, so
their permanent dev-mode 403s throw and count as failures.

`attemptOrRecordRestriction` exists for exactly this and is used only by the two
catalog families. The six user-scoped families reference it, `tolerateStatuses` and
`isRestricted` zero times between them, and `harness.ts:150` exits non-zero on any
failure — so the harness cannot report success while the app stays dev-mode.

# Evidence

Read in `~/code` at `origin/main`, every site opened rather than inferred.

`rg -c "attemptOrRecordRestriction|tolerateStatuses|isRestricted"` over each of
`src/endpoints/{users,follow,library,personalization,player,playlists}.ts` returns no
match for any of the six. The same search over `artists.ts` and `albums.ts` returns
the four call sites that do use it (`artists.ts:127`, `:142`, `:152`,
`albums.ts:114`), so the helper is live and the asymmetry is real.

The restricted probes still exist and run: `follow.ts:257`, `:261` the two
`/contains` checks, `:268` and `:272` the two self-cleaning PUT/DELETE round-trips;
`library.ts:224`, one `save/contains/remove round-trip` per saved type; `users.ts:95`
`GET /users/{user_id}`; plus the playlists lifecycle.

`harness.ts:150` — `process.exit(failed.length > 0 ? 1 : 0)`; `harness.ts:139` runs
each probe through `runProbe`, and nothing between throw and exit reclassifies a 403.

HOW THIS DIFFERS FROM THE STANDING FINDING, which I opened rather than reading its
name. `collections/deprecated-wrapper-blind-to-429.md` says `browse.ts:125` tolerates
only `new Set([403, 404])` so a 429 rethrows: one status escaping a tolerance set on
two probes. This is a larger cause of the same symptom — eleven probes across four
families with NO wrapper of any kind, failing on the status their sibling families
explicitly record. Neither subsumes the other.

WHAT I DID NOT VERIFY: that those eleven answer 403 today. That is a 2026-06-20
measurement recorded at lines 23-36 of
`dirty/code/packages-collections-music-spotify-docs-api-coverage-rate-limit-history.md`
at revision `ba5878d65b300570458049b9132e83366765ebb0`, and confirming it needs an
authenticated run I did not make. The code half is verified; that document's claim is
the antecedent, and that document is being deleted.

Duplicate search: `rg -l -i -F "attemptOrRecordRestriction"` over `~/memory/findings/`
exits 1; `find` on `*harness*`, `*probe*`, `*spotify*`, `*restrict*` returned six
files, none this subject.
