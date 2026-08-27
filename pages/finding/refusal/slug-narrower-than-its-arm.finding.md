---
id: e7c886bf-a729-5d21-8d91-d0d76f2cb42e
page-type-slug: finding
title: "Slug narrower than its arm"
domain-slug: page-type/refusal
---

# Claim

The slug `bash-env-outside-repo` is narrower than the check arm it names: `repoRelative` returning null covers four states — an absolute path outside the root, a `$HOME`-family path elsewhere, the root itself, and a bare relative path — and the body now covers all four.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/bash-env-outside-repo.md` dispatched from `review-documents`. The reading widened the body and left the slug, a rename costing an edit to the check that cites it at `tools/checks/bash-env-inside.ts:96`.

The reading repaired the body's clause from "which resolves outside this repository" to "which does not resolve inside this repository", having run the check over a fixture repo declaring `BASH_ENV` as the bare `tools/bash-env.sh` with that file present: it refuses, and told the reader the path resolved outside this repository — about a file they would find sitting in `tools/`. A bare path has no resolution until a shell supplies a directory, so the negation of "inside" is the claim the check actually makes and stays true of the other three states.

The reading judged it not a contradiction but the same verdict at two grains, which is why it reported rather than renamed.

Not measured: whether any other refusal slug is narrower than its arm, or whether a reader has ever met this refusal in one of the three states the slug does not name.
