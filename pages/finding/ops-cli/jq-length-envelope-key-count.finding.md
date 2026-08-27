---
id: 5899d3fc-0681-58fa-a972-73a798fd930b
slug: jq-length-envelope-key-count
page-type-slug: finding
title: "Jq length envelope key count"
domain-slug: domain/ops-cli
---

# Claim

`jq length` on the root of an `ops <command> --json` envelope returns the envelope's key count, not its row count — measured live at 07:12Z returning 4 for both an 8-row tier and a 1-row tier while true occupancy stood at 9 against a capacity gate capped at 10, breaking two fleet-capacity readings within minutes of #16388 landing — and since the habit fires in the runtime command string, not committed code, #13633's CI-scan argument does not rule out a PreToolUse hook seeing it.

# Evidence

From project #16434 (domain `ops-cli`). Never carried an objective — this is its capture.

#16426 shipped the prospective fix (`returned` as a named key so nothing must be derived); this row addresses what that fix cannot reach — the pre-formed reflex of piping to `jq length` before an envelope is ever looked at.

Why the named key does not close it (credit to athena, correcting an earlier close): the habit is not defeated by every envelope's `length` being well-defined on the data — it fires in the command string, at execution time, an interceptable point, not inside the JSON. Two further corrections: (1) a reflex predating this repo arrives fresh at full strength from general training on every boot — turnover reintroduces it, does not dilute it; (2) `returned` is discoverable only by reading the envelope, and the habit is precisely the practice of not reading the envelope, so documentation cannot reach a formed habit.

Not re-litigating #13633: it declined a CI banned-pattern guard because agent-authored runtime query strings are never committed, so a TS/markdown CI scan cannot see them — true of a CI scan. A PreToolUse hook runs at the moment the string exists and sees what a committed-artifact scan cannot; #13633 ruled out the blind check, not sight itself.

Established pattern, verified: 12 PreToolUse blockers exist in `packages/infra/scripts/block-*.sh`; 11 inspect the runtime command string (destructive-git, addon-direct-install, cluster-mutations, direct-main-writes, memory-writes, root-filesystem-scan, symlink-into-main, pages-mirror-edit, oversized-memory-core, user-settings-write, playwright-stray-filename, claude-plugin-config).

Design questions left open: precision must match `length` at the envelope root only (not `.pages | length`), scoped to command strings containing an `ops` invocation with `--json`; block vs. warn is undecided (lean block, naming `.returned`); cover `page list` too once #16432 lands, since `.count` there is total-matching (a 4000x error), not row count.
