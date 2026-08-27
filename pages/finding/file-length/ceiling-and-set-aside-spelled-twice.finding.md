---
id: bf5355fc-9c62-5ead-9ca0-0d261c42eaa5
page-type-slug: finding
title: "The file-length ceiling and its set-aside rules are each spelled twice and neither copy is the original"
domain-slug: domain/file-length
---

# Claim

The 15,000 ceiling and the rules setting a file aside from it are each spelled twice, once per repository, and neither copy is the original. `domains/file-length.md` says `tools/code-comment/tree.ts` decides which files are machine-written, but the predicate the gate actually calls decides that for itself, and the two spell the same regexes independently.

# Evidence

Measured 2026-08-19, reviewing the `files-under-the-ceiling` initiative to closure.

The ceiling stands as two constants. `packages/infra/checks/src/lib/file-length-core.ts` declares `FILE_LENGTH_CEILING = 15000` and measures `content.length`, characters. `tools/gates/token-ceiling.ts` declares `BYTE_CEILING = 15_000` and measures `new TextEncoder().encode(text).length`, bytes. They agree on the number and disagree on the unit, so a file carrying non-ASCII is held to two different ceilings depending on which repo it sits in. `tools/hooks/block-oversized-files.ts` returns early on the instructions repo precisely because `token-ceiling` covers it, so the split is deliberate at the gate and unstated at the constant.

The set-aside rules stand as two copies. `file-length-core.ts` declares `MACHINE_WRITTEN`, `UNDER_TEST`, `DECLARED_GENERATED`, `HEADER_LINES = 5` and `declaresGenerated`. `tools/code-comment/tree.ts` declares `MACHINE_WRITTEN` and `UNDER_TEST` with byte-identical patterns, `DECLARED` with the identical pattern under another name, the same `HEADER_LINES = 5`, and a `declaresGenerated` with the same body. `setAside` and `standsOutsideCeiling` then apply them in the same order.

The initiative's step 1 asked for the opposite: "What is machine-written is asked of `tools/code-comment/tree.ts` rather than spelled again here."

The repair cannot run the way the Design line implies. `tree.ts` sits in the instructions repo and `file-length-core.ts` in the code repo, and the dependency already runs instructions to code, through `codeModule`. So `tree.ts` would have to ask the core, which crosses a sync boundary: `setAside` is synchronous, `codeModule` is not, and six files under `tools/` call `setAside`, `declaresGenerated` or `SET_ASIDE`.

Not measured: whether the byte and character divergence misclassifies any file standing today.
