---
id: 59f28276-2fc6-5046-bd15-688dcdebf43a
slug: toolchain-parses-two-shapes-the-forms-list-does-not-name
page-type-slug: finding
title: "Toolchain parses two shapes the forms list does not name"
domain-slug: domain/code-comment
---

# Claim

Two comment shapes the code repo's toolchain parses are absent from `domains/lists/code-comment-forms.md`, and the sweep of `packages/temper` leaves 11 of them standing because deleting them breaks the build outright: `/** @noSelfInFile */`, which TypeScriptToLua reads to decide implicit `self`, and `/// <reference path="…" />`, which is the only thing carrying the ESO globals and the TSTL language extensions into the addon and lualib builds.

# Evidence

Found by #19105 sweeping `packages/temper`, and left standing and named rather than worked around, since adding a form is Alan's under `Form Approval`.

## What each one costs when it goes

- `/** @noSelfInFile */`, 7 files under `packages/temper/shared/build-deploy/tstl/lualib/src/`. Deleting the seven takes that suite from 537 pass to 55 pass and 482 fail, and the lualib does not transpile at all — the failure lands on the builder rather than on any assertion.
- `/// <reference path="…" />`, 4 in 3 files. Without them `LuaTable`, `pcall`, `tostring` and `debug` are undeclared and the addon build fails. One of the three files was nothing but two directives, so the strip left it zero bytes.

Both config-shaped substitutes were tried and rejected on evidence. `"noImplicitSelf": true` on the lualib tsconfig left the suite at 482 failures. Naming the path in `include` does work, but the addon side would need it spelled into 69 tsconfigs at 69 different relative depths, each reaching into another package's internals.

## Why no instrument caught it

The strip's proof of sameness is blind to both shapes: Bun's transpiler drops them, so a gutted file transpiles byte-identically and the proof passes. That is the third instance of one class in a single tree — a `__fixtures__` file's comments are specimens a check is proved against, and an `// ast-unused: keep` pragma is read by `check-ast-unused` out of the source it guards.

The property they share is not a naming convention: it is that a program other than the TypeScript compiler reads the comment. Every instrument this tree has — the transpile-equality proof, the suite, the typecheck, `biome check` — is blind to exactly that class, because none is the program doing the reading.

## Delete this when

Both shapes are on the code comment forms list with recognisers, or a ruling says the eleven should go and names what replaces them.
