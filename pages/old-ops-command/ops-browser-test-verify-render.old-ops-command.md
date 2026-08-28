---
id: f5e8d7e2-614a-551b-aafd-56191ea2b1ac
page-type-slug: old-ops-command
title: "Ops browser-test verify-render"
slug: ops-browser-test-verify-render
domain-parent-slug: domain/ops-browser-test
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/browser-test/verify-render.ts
path: browser-test verify-render
---

# Definition

- **Ops browser-test verify-render** — whether a page on a deployed URL rendered, under an identity that can see its rows.

# Help

Verify an owner-owned page actually renders on a DEPLOYED URL, as Alan's live identity (read-only). The seeded Playwright MCP session is the throwaway user and is RLS-blind to owner-owned data, so an MCP render check of owner-owned pages is illusory. This command signs in read-only as the real owner, navigates <url><path>, and FAILS LOUD (exit 2) on an owner-owned empty / 404 / sign-in wall / 5xx — so an illusory pass can never be reported prod-verified. For owner-owned page types, --expect-text is required (the known data string that proves the owner's rows rendered). Apps that serve owner-owned data via server-side service-role reads and have no /sign-in form take --no-sign-in: the command runs an anonymous read-only session (no credentials) and the same fail-loud guard.

Default stdout is one anchored line and nothing else, whatever the outcome, so `head -1`, `tail -1` and `2>/dev/null | tail` all return the same claim:
  VERDICT: PASS|FAIL|UNKNOWN — the-deployed-render: <reason> — <url> (http <n>, page-type <slug>) [over <n> of 1 renders]
`UNKNOWN` is this channel's spelling of the third outcome; `--json` keeps `INDETERMINATE`. The exit codes below are this command's own rather than the envelope's 0/1/2, so a caller reading nothing but the exit code still parts a PASS from a FAIL from a run that could not observe.
