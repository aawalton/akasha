---
id: fc9e7bf3-41be-537a-935b-43464f19e3c7
slug: irreversible-gate-fails-open-both-ways
page-type-slug: finding
title: "Irreversible gate fails open both ways"
domain-slug: domain/ops-cli
---

# Claim

The irreversible-verb gate builds its inventory by text-scanning code-repo registry files, and that fails silently in both directions. `ops seat send` declares itself irreversible in both repositories and is not gated today. And a glob matching nothing reads as a clean "nothing is declared", against the check's own written promise.

# Evidence

`tools/hooks/require-ops-help.ts` refuses an irreversible verb until the caller has read its help. Its list comes from `ops irreversible list`, which reaches `handlersByVerb` in `packages/infra/checks/src/lib/ops-handler-map.ts`: it globs `packages/**/registry.ts`, resolves each entry to a handler file, and regex-matches the marker in that file's TEXT.

Run today it gates three verbs, every source a code-repo file:

    agent reap        packages/agents/cli/src/agent/reap.ts
    ask-alan          packages/agents/cli/src/ask-alan/ask-alan.ts
    launcher realign  packages/alanwalton/projects/cli/src/launcher/realign.ts

`agent send` is not among them. It declares `irreversible: "irreversible"` in BOTH repositories — `send.help.ts:13` and `tools/lib/agent-send-help.ts:4`. The verb maps to `send.ts`, which only does `export { help } from "./send.help"`; `grep -c irreversible` on it returns 0. A help assembled in a sidecar reads as undeclared.

The check's header names this error mode and accepts it — "such a verb goes ungated, which is the direction this errs in by choice". That the concrete instance is `agent send` is what nobody seems to have known.

The second direction is not yet true and will be. Removing the 95 namespace registries leaves the glob matching nothing, `handlersByVerb` returning an empty map, and the verb exiting 0 with `{"verbs":{}}`. No error, no non-zero exit. The unreadable-source arm covers a file that was globed and could not be read, never a glob that matched nothing. The header promises the opposite: "AN INCOMPLETE INVENTORY IS NEVER A CLEAN 'nothing is declared'." The result caches to `~/ops-irreversible.json` with a TTL, so an empty list outlives the commit that emptied it.

Both directions have one root: the inventory is scanned as text on the side the declarations no longer live on. Rebuilt here it can read the declared help OBJECT out of `tools/commands/**`, following a sidecar as the dispatcher does, rather than matching a marker it can miss.
