---
id: 4669c0a8-ad42-593c-a7a5-092b470fa6f9
page-type-slug: finding
title: "Zod env identity"
domain-slug: domain/global
---

# Claim

Several migration bodies read an environment variable through `z.string().optional().parse(process.env.X)`, a call that returns the value the property already holds.

# Evidence

`process.env` properties are typed `string | undefined`, and `z.string().optional()` accepts exactly that union and returns its input unchanged. The call is therefore an identity over every value the property can carry, and can throw only where the property is neither a string nor absent.

`migration/run.ts` read `DATABASE_URL` this way before its body moved into the instructions repository on 2026-08-13; `lib/apply-migration.ts` and `lib/baseline-rebuild.ts` in the code repository each carry the same construction against `DATABASE_URL` and `PGOPTIONS`.

The moved body reads the property directly and drops the dependency. The five refusal paths exercised against it — status gate, contract phase, absent migration, missing `--seq`, unknown flag — print byte-identically to the delegating form. The branch this construction guarded was not among them: the environment reaching the verb always carried `DATABASE_URL`, so the absent case was not reached on either form.
