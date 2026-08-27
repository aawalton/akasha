---
id: 8417c33d-2a50-5824-b377-eb00b01e600d
slug: an-unknown-flag-does-not-stop-every-verb
page-type-slug: finding
title: "An unknown flag does not stop every verb"
domain-slug: domain/ops-cli
---

# Claim

An unrecognised flag does not stop every `ops` verb. `ops migration gen-schema --zz-not-a-flag` ran the verb and wrote a schema snapshot at exit 0, and two other verbs ran their work to completion the same way. A typo reads as success. Where to look for it in akasha today: the three `check-addon-*` verbs, which run their whole check with the unknown flag never rejected.

# Evidence

Measured over the whole set: every one of the 762 verbs was invoked with `--zz-not-a-flag`, a name no verb declares. 707 refused at exit 1, which is the behaviour the declared parser gives. The other 55 did not, and 13 of those are declared verbs rather than passthrough forwarders:

    exit 0   enforcement list          ran a full scan, 218 mechanisms across 4 sources
    exit 0   migration gen-schema      WROTE a snapshot to packages/shared/supabase/database/schema
    exit 2   enforcement new-rule, project check, tests run, tests slow-suite-gate,
             tests slow-suite-reachability, tests slow-suite-sweep
    exit 3   check-addon-removed-refs, check-addon-sandbox-load, check-addon-sandbox-safety
    exit 64  tests triage-fanout       "[triage-fanout] unexpected argument"
    exit 70  ci-workflows bootstrap

`migration gen-schema` is the one that acts. Its output line was `wrote snapshot to /var/home/walton/code/packages/shared/supabase/database/schema` — a path in a repository that no longer stands, as the verb no longer does. The write happened to be byte-identical to what already stood there, so `git status` in the code repository stayed clean — which is luck rather than safety. Somebody typing a flag that verb does not declare, `--dry-run` among them, gets a real write and an exit 0 that reads as agreement.

`tests triage-fanout` exits 64, which is `EX_USAGE` from sysexits and outside the vocabulary `tools/lib/exit.ts` declares — 1 input, 2 data, 3 operational, 70 unclassified. It is the only verb in the 762 using it. It still does: `tools/commands/tests/triage-fanout.ts:26-27` prints `unexpected argument` and calls `process.exit(64)`.

The exit 0 pair is the severe half. Exit 2, 3, 64 and 70 all stop. Exit 0 after ignoring what was asked for is indistinguishable from having done what was asked.

How this was found: building a before-capture for the surface-removal project, on the stated assumption that a bad flag is refused before any body runs for verbs parsing with the declared parser. That assumption is what this finding disproves, and it cost one real write before it was caught.

Where the named surfaces stand in akasha: `migration gen-schema`, `enforcement list`, `enforcement new-rule`, `project check`, `tests slow-suite-gate`, `tests slow-suite-reachability`, `tests slow-suite-sweep` and `ci-workflows bootstrap` no longer exist. What survives is `tests triage-fanout` at exit 64, and the three verbs at `tools/commands/check-addon-removed-refs.ts:27`, `tools/commands/check-addon-sandbox-load.ts:27` and `tools/commands/check-addon-sandbox-safety.ts:27`, each calling `parseArgs(args, { file: { kind: "string" } }, { passthrough: true })`. Invoked with `--zz-not-a-flag` all three run the whole check and never mention the flag.
