---
id: 9957483b-2955-5bb8-a551-e3358d9da614
page-type-slug: finding
title: "Spec cache key carries no fizzbee version"
domain-slug: repo/code-repo
---

# Claim

The spec bundle's per-spec cache key was designed around a symlink the CI provisioner does not create. `/ci-storage/tools/fizz` is written as a regular launcher script at a constant path, so no FizzBee version reaches the hash and a version bump invalidates no marker. Two comments say the opposite, and the provisioner contradicts itself about which it writes.

# Evidence

Read against `~/code` at `383bf60d35`.

`check-spec-bundle.ts` keys each spec's skip marker on `inputsHash = sha256(specFileBytes ‖ readlink("/ci-storage/tools/fizz"))`; a marker `<cacheDir>/<inputsHash>.ok` short-circuits that spec. `spec-bundle-cache.ts:6`-`11` states the ground: the readlink target "Encodes the pinned FizzBee version so a future bump invalidates every marker naturally."

The CI provisioner writes no symlink there. `packages/infra/ci/workflows/src/prep-provision-steps.ts:249` pipes a `printf` launcher through `write_atomic /ci-storage/tools/fizz +x` — a regular executable script whose body interpolates `$FIZZBEE_DIR`. The version lives in the directory name that script execs into, and in nothing about the script's own path.

`resolveFizzReadlinkTarget` in `check-spec-bundle.ts` probes with `lstat` and returns `fizzBinary` unchanged when the entry is not a symlink. On CI that returns the constant `/ci-storage/tools/fizz` on every run, whatever version is pinned. So the marker for a spec depends on the spec's bytes alone: bump `FIZZBEE_VERSION`, re-provision, and every `.ok` marker still matches. Specs short-circuit against a model checker that has been replaced.

The provisioner contradicts itself. Its comment at lines 206-211 says the tree is extracted "to a versioned directory and symlink `/ci-storage/tools/fizz` to the wrapper inside it". The code forty lines below writes a launcher script instead, for the reason its comment at 243-247 gives — the wrapper needs a bundled python3 on PATH. The symlink was traded away and the cache key was never re-grounded.

The lstat probe was deliberate and makes the gap quieter. Its comment argues that falling back to the binary path "keeps the hash changing when the binary moves"; the path is a constant, and what the probe removed was the caught failure that would have surfaced this from the CI side.

Found ingesting `dirty/questions/code-repo-check-stated-grounds.md`.
