---
id: 8417c33d-2a50-5824-b377-eb00b01e600d
slug: an-unknown-flag-does-not-stop-every-verb
page-type-slug: finding
title: "An unknown flag does not stop every verb"
domain-slug: domain/ops-cli
---

# Claim

An unrecognised flag does not stop every `ops` verb. `ops migration gen-schema --zz-not-a-flag` ran the verb and wrote a schema snapshot into the code repository at exit 0, and two other verbs ran their work to completion the same way. A typo reads as success.

# Evidence

Measured over the whole set: every one of the 762 verbs was invoked with `--zz-not-a-flag`, a name no verb declares. 707 refused at exit 1, which is the behaviour the declared parser gives. The other 55 did not, and 13 of those are declared verbs rather than passthrough forwarders:

    exit 0   enforcement list          ran a full scan, 218 mechanisms across 4 sources
    exit 0   migration gen-schema      WROTE a snapshot to packages/shared/supabase/database/schema
    exit 2   enforcement new-rule, project check, tests run, tests slow-suite-gate,
             tests slow-suite-reachability, tests slow-suite-sweep
    exit 3   check-addon-removed-refs, check-addon-sandbox-load, check-addon-sandbox-safety
    exit 64  tests triage-fanout       "[triage-fanout] unexpected argument"
    exit 70  ci-workflows bootstrap

`migration gen-schema` is the one that acts. Its output line was `wrote snapshot to /var/home/walton/code/packages/shared/supabase/database/schema`. The write happened to be byte-identical to what already stood there, so `git status` in the code repository stayed clean — which is luck rather than safety. Somebody typing a flag that verb does not declare, `--dry-run` among them, gets a real write and an exit 0 that reads as agreement.

`tests triage-fanout` exits 64, which is `EX_USAGE` from sysexits and outside the vocabulary `@shared/cli-core/exit` declares — 1 input, 2 data, 3 operational, 70 unclassified. It is the only verb in the 762 using it.

The exit 0 pair is the severe half. Exit 2, 3, 64 and 70 all stop. Exit 0 after ignoring what was asked for is indistinguishable from having done what was asked.

How this was found: building a before-capture for the surface-removal project, on the stated assumption that a bad flag is refused before any body runs for verbs parsing with the declared parser. That assumption is what this finding disproves, and it cost one real write before it was caught.
