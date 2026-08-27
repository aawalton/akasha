---
id: 4669c0a8-ad42-593c-a7a5-092b470fa6f9
slug: zod-env-identity
page-type-slug: finding
title: "Zod env identity"
domain-slug: domain/global
---

# Claim

Several migration bodies read an environment variable through `z.string().optional().parse(process.env.X)`, a call that returns the value the property already holds.

# Evidence

`process.env` properties are typed `string | undefined`, and `z.string().optional()` accepts exactly that union and returns its input unchanged. The call is therefore an identity over every value the property can carry, and can throw only where the property is neither a string nor absent.

`migration/run.ts` read `DATABASE_URL` this way before its body moved on 2026-08-13, and that verb is gone; the same construction stands today at 42 sites in akasha, among them `alanwalton/calendar-google/src/env.ts:45`, `tools/lib/benchmark/run.ts:68`, `shared/pages-access/src/answer-write.ts:31`, `shared/supabase-server/src/service-role.ts:60` and `:62`, and eleven under `tools/lib/local-executor/`.

The moved body reads the property directly and drops the dependency. The five refusal paths exercised against it — status gate, contract phase, absent migration, missing `--seq`, unknown flag — print byte-identically to the delegating form. The branch this construction guarded was not among them: the environment reaching the verb always carried `DATABASE_URL`, so the absent case was not reached on either form.
