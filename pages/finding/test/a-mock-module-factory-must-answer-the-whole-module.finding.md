---
id: 2b88da54-9eed-53d0-8afa-4cb95eb64c5d
slug: a-mock-module-factory-must-answer-the-whole-module
page-type-slug: finding
title: "A partial mock module factory breaks an unrelated importer at load rather than at assertion"
domain-slug: domain/test
---

# Claim

A `mock.module` factory that answers only the exports it replaces breaks an unrelated importer
of the same module, at load rather than at assertion. The fact was carried in a prose comment
until the comment sweep and now stands nowhere. Measured 2026-08-20 by running both shapes.

# Evidence

The comment, removed from `tools/tests/` and quoted whole:

> Replace named exports on a module while leaving every other export of it exactly as it stands.
> A factory answering only what is replaced makes an unrelated importer's load fail — measured
> on both sides, `createAgentRow` off the code repository's barrel and `agentString` off this
> one.

Run today under Bun 1.3.14, on a two-export module where a second module imports only the export
that was *not* replaced:

    mock.module(real, () => ({ alpha: "stubbed" }))
      -> SyntaxError: Export named 'beta' not found in module '.../real.ts'
    mock.module(real, () => ({ ...await import(real), alpha: "stubbed" }))
      -> passes

So the registry replaces the module rather than patching it, and every export the factory omits
stops existing for every importer in the process. The failure is a `SyntaxError` at import, not
a failed assertion, so it surfaces on a test that never named the module.

This is a **constraint** in the sense `domain-design` gives the word: a limit from the module
registry outside this domain, and knowing it stops a reader writing the shorter factory. It is
also why 157 `mock.module` calls in the code repository are written as a spread over a real
import.

A second comment removed beside it says the mock is registered under the specifier the subject
imports, while the real module the factory spreads is reached by whatever resolves from the
mocking file. I did not run that half.

`pages/domain/test.domain.md` has no Design section at all today, so either entry would be the first in one.
