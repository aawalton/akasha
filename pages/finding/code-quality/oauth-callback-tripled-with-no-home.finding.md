---
id: 35cfcc78-e3c9-599f-91ef-cbcbcd3ae697
slug: oauth-callback-tripled-with-no-home
page-type-slug: finding
title: "Oauth callback tripled with no home"
domain-slug: domain/code-quality
---

# Claim

Three Google OAuth packages under `packages/alanwalton/` carry byte-identical copies of the same pure callback parser, and the only record that the extraction was owed is a head document being deleted. `oauth-callback.ts` stands in `calendar/google`, `email/google` and `drive/google` at one md5, with its unit test copied three times beside it. Nothing refuses this: no check in the tree detects duplicated files, so the third copy landed green and a fourth would too.

# Evidence

Read in `~/code` on `main`.

`git ls-files '*oauth-callback*'` returns six tracked paths — `oauth-callback.ts` and `oauth-callback.unit.test.ts` under each of `packages/alanwalton/calendar/google/src/`, `packages/alanwalton/email/google/src/` and `packages/alanwalton/drive/google/src/`.

The three implementations are identical, not merely similar. `md5sum` over all three returns one digest, `5f314ce00e0e7c863ade47d23aa20275`.

No shared home exists. `git ls-files '*google-oauth*'` returns nothing.

No instrument reports it. I listed `packages/infra/checks/src/checks/` and filtered the names for `dup`, `clone`, `copy`, `rule-of-three`, `three`, `repeat` and `extract`; nothing matched. A duplicated file breaks no import, changes no type and fails no test, so every gate is green on it.

The record that this is owed was written in the quarantined head document `dirty/code/packages-alanwalton-drive-google-claude.md`: "`src/oauth-callback.ts` is now the **third** verbatim copy of this pure helper (calendar, email, drive). That crosses the Rule-of-Three threshold: a shared `@alanwalton/google-oauth` (or `@shared/…`) extraction is now warranted. Left in place here to keep this project scoped to Drive read access; flagged as a follow-up extraction candidate." That document is emptied and removed by the instruction sweep, which is why the observation is filed here.

The doctrine the note invokes has no live text either — `pages/finding/domain/doctrine-names-govern-without-text.finding.md` measures Rule of Three at 60 citing files and 0 live statements. That finding is about the missing text; this one is about the deferral it was invoked for going unrecorded.
