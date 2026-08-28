---
id: 7daa1a31-7f0c-58c7-8dbb-4524da6316d5
page-type-slug: finding
title: "A hand-listed tsconfig rots behind every gate"
domain-slug: domain/checks-system
---

# Claim

Three packages name their cross-package sources one by one in `tsconfig.json` instead of matching them with a glob. A file added, moved or deleted anywhere else silently puts the list out of date, and nothing on the write path reads it: the gate's typecheck does not, only `bunx tsc -b` does. So the break lands green and is found later by hand. Two sat on main tonight. The rot runs both ways — an entry naming a file that no longer exists is dropped in silence, and six such entries stand.

# Evidence

Measured against `main` on 2026-08-28.

`bunx tsc -b` at the repo root reported two TS6307, both charged to `shared/pages-access/tsconfig.json`:

    repo/land/land.ts(17,28): error TS6307: File
    '.../repo/land/body-aside.ts' is not listed within the file list of
    project '.../shared/pages-access/tsconfig.json'.

    shared/pages-access/src/file-rows.ts(3,46): error TS6307: File
    '.../page/name/naming/naming.ts' is not listed within the file
    list of project '.../shared/pages-access/tsconfig.json'.

`e38ab6d37` added `repo/land/body-aside.ts` and had `repo/land/land.ts:17` import it; the list held `repo/land/land.ts` and `repo/land/landing.ts`, not the new file. `478990ae1` repointed `shared/pages-access/src/file-rows.ts:3` at `page/name/naming/naming.ts`; the list held `page/name/name.ts`. Both landed green. Neither commit touched `shared/pages-access/tsconfig.json`, and `e38ab6d37` touched nothing in that package at all — the file it broke sits two trees away.

Repaired at `922e99a4d` by listing both paths. 2 errors to 0, inside `shared/pages-access` and from the repo root alike.

Not one list, three. Explicit cross-package entries, counted from the configs: `shared/pages-access` 101, `shared/status-bar-access` 108, `infra/scripts` 8, `alanwalton/personas-core` 5. Every one of those entries is a `../..` path out of the package. `shared/status-bar-access` is green now and carries the larger list.

The reverse rot is already here and `tsc` reports nothing for it. Named in the lists, absent from disk: `graph/edge-producer/beside/beside.graph-edge-producer.code.attachment.ts`, `graph/edge-producer/file-name/file-name.graph-edge-producer.code.attachment.ts` and `graph/edge/file-kind.ts`, in both `pages-access` and `status-bar-access`; `tools/lib/code-import.ts` in `infra/scripts`.

Not measured: whether any error hides behind those dropped entries.
