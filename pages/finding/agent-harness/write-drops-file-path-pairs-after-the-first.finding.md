---
id: 26979c57-05e9-564d-9c5d-2c44ac9799c9
slug: write-drops-file-path-pairs-after-the-first
page-type-slug: finding
title: "Write drops every file-path pair after the first"
domain-slug: domain/agent-harness
---

# Claim

`tools/write.ts` accepts repeated `--file-path`/`--content-file` pairs without complaint, gates and writes only the first pair, and reports the result as a clean success. The dropped files are never mentioned, so a caller who passed several and read the exit code has no way to learn the rest did not land.

# Evidence

Measured on this workstation on 2026-08-22, while migrating packages into the instructions repo under project 19447.

Two bodies were staged, then one call passed both:

```
bun tools/write.ts --repo instructions --composed \
  --file-path pages/probe-one.md --content-file /var/tmp/19447-t1.txt \
  --file-path pages/probe-two.md --content-file /var/tmp/19447-t2.txt \
  --dry-run
```

The gate report names `pages/probe-one.md` alone, then states `the change set, over all 1 file(s)` and `pages/probe-one.md  new → 2 bytes (+2)`. `pages/probe-two.md` appears nowhere in the output — not as written, not as refused, not as ignored.

The failure is silent in both directions. Nothing warns that an argument was discarded, and the summary line reads as a correct report of a one-file change rather than as a truncated report of a two-file one. A caller who passed eighteen pairs gets the same shape of output, with seventeen files missing.

This was first surfaced by a delegate migrating `@shared/utils-process`, which passed four pairs, had only `tsconfig.json` land, and noticed only because it counted the files at the destination afterwards. It then fell back to one invocation per file, producing five commits for a five-file package where one was intended.

The array form via `--input-file` does not have this fault: it gates every entry against the repo the whole call would produce and admits or refuses the set whole. The help text says so, and recommends the array for files that reference each other. It does not say that the convenience form is single-file only, and the flag being repeatable at the parser level is what makes the mistake available.
