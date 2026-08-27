---
id: 2b98efa4-bb2d-5f48-b2a6-c07239e0fbc2
page-type-slug: finding
title: "Conformance silently unmeasured"
domain-slug: domain/global
---

# Claim

A write that touches `tools/document/**/*.ts` lands without its conformance measured. The `document-conforms` gate reports `not-applicable — the schema this call proposes exited 1 when loaded` rather than a pass or a fail, so the write goes through and nothing in its output says a check was skipped rather than satisfied.

# Evidence

Touching `tools/document/registry.ts` sends the gate down its materialize-and-run path, which builds a temporary tree and loads the proposed schema from it.

`tools/lib/materialize.ts:9` copies TypeScript alone into that tree:

    new Bun.Glob("**/*.ts").scanSync({ cwd: subject.roots.instructions, onlyFiles: true })

`tools/lib/category-rule-set.ts:13` reads a Markdown file at module load:

    const merchants = parseVocabulary(readFileSync(`${repoRoot}${MERCHANTS}`, "utf8"))

where `MERCHANTS` is `monarch/merchants.md` (line 11). That file is not TypeScript, so it is absent from the materialized tree and the load dies with ENOENT. The gate reads the non-zero exit as an unloadable schema and stands down.

Both lines read on the working tree. The seat that met this reported reproducing it on an unmodified checkout, and reported that `page-holds-shape` and `page-holds-properties` did measure and pass on the same call, so the landing it was making was covered by other gates.
