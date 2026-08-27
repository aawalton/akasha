---
id: 06334157-4ce3-5f1f-8590-ccf0baae6785
page-type-slug: finding
title: "Dev server app flag names two of five"
domain-slug: repo/akasha-repo
---

# Claim

Every `--app` flag in the `dev-server` CLI describes its own registry as "one of: alanwalton, temper". The registry holds more apps than that pair names, and the module exports `APP_NAMES` for exactly this. The stale pair is hard-coded at every dev-server verb, and the refusal path a caller hits already derives the true set — so the wrong set is only ever met by a reader, never by a caller, which is what keeps it green.

# Evidence

`tools/lib/dev-server-ops.ts:40` freezes `APP_REGISTRY` with keys `alanwalton`, `audhdalan`, `temper`, `archive-of-worlds` and `atlas`. Line 78 exports `APP_NAMES` as `Object.keys(APP_REGISTRY)`, and `lookupApp` at `:80` prints it whole: `unknown app: ${name} (known: ${APP_NAMES.join(", ")})`.

Against that, `description: "App identifier (one of: alanwalton, temper)"` is written out at every verb under `tools/commands/dev-server/`: `bootstrap.ts:24`, `logs.ts:24`, `restart.ts:22`, `start.ts:39`, `status.ts:31` and `stop.ts:29`.

Nothing compares the two. The copy is a key set frozen at a pair, one directory away from the export that would derive it.

What makes this cost more than a stale sentence: a caller who guesses wrong is corrected by `lookupApp`, which derives. Only a reader consulting `--help` gets the frozen pair, and `--help` is the surface this estate tells an agent to derive a verb's shape from rather than copy. So the one path that is wrong is the one an agent is instructed to trust, and every path that would expose it is already right.

`pages/finding/akasha-repo/dev-server-help-names-wrong-framework.finding.md` is the same help text and a different error — it calls what the verb spawns a Next.js dev server where every `devCommand` is `bunx react-router dev`. A reader repairing that sentence has no reason to touch the app list beside it, and vice versa.

Whether the descriptions are corrected in place or derived from `APP_NAMES` is unjudged here.
