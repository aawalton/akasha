---
id: 6cd542d9-496b-51e7-962f-e262fb2d4d5a
page-type-slug: finding
title: "Event replay zod boundary parse crossed narrowly"
domain-slug: domain/ops-cli
---

# Claim

`ops event replay` was the one body in this set whose move turned on whether a Zod boundary parse could cross, and it crossed by declaring the six builder methods the schema actually calls rather than the package's type surface. It is worth recording as the precedent, because the first reading of the invariant was that the verb had to be handed back unmoved.

# Evidence

Found 2026-08-13 by the seat moving the `misc-b` bodies.

The body's `EVENTS_ROW_SCHEMA` is a `z.object({...}).transform(...)` over ten `public.events` columns, renaming snake_case to camelCase. Two routes looked closed. Copying Zod's builder types into this repository is the stale mirror step 3 of the task forbids, and rewriting the parse by hand changes what a malformed events row does — a change made while moving, which cannot be told from the move.

The route that was open is the one `tools/lib/awen-tally.ts` and `tools/commands/pipeline/timeline.ts` already take: resolve `zod` as a package specifier through `codeModule`, and declare only the methods called — here `string`, `number`, `bigint`, `date`, `unknown`, `union`, `object` and the `nullable`/`transform`/`parse` the chain uses. The declaration is nine lines and cannot go stale in a way that matters, because a method that stopped existing fails at the call.

Every branch of the verb was then proved by running it, which the verb's own design makes safe: it always issues `ROLLBACK` and never `COMMIT`. Nine `public.events` seqs were chosen to reach the non-page skip, the null-`tableName` skip, the no-candidate-rules skip, both arms of `explainNotMatched`, and the matched arm that calls `runActions` and collects the trace. Each was run unmoved and moved and diffed byte-for-byte in both output shapes.

The other thing the move needed: the file came to 16281 bytes against the 15000 ceiling, so the declared capability shapes and the three resolvers went to `tools/lib/event-replay-code.ts` and the verb kept the help block and the replay logic. Splitting rather than compressing is what `gates/token-ceiling.ts` asks for, and nothing draws the reader of the verb back into the lib.
