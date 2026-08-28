---
id: c55d0ad2-9015-55d5-9a96-1fbe00bd43a2
slug: a-moved-tool-left-its-dependencies-behind
page-type-slug: finding
title: "Every tool that moved into akasha kept its dependencies in the repository it left, so the merge of the two manifests is a blocker rather than the last step"
domain-slug: domain/package-manifest
---

# Claim

`tools/` landed in akasha; the manifest declaring what it imports did not. Akasha's root manifest holds 4 dependencies against instructions' 79, and 76 of instructions' are absent. Sixteen are ordinary third-party packages, so any moved file importing one fails to resolve at run time with no check refusing it. The manifest merge cannot be the last step, because live capabilities are down until it lands.

# Evidence

Read 2026-08-27, after `pages/` and `tools/` had landed in akasha and instructions was down to 167 tracked files.

The sixteen third-party names absent from akasha's manifest: `@googleapis/calendar`, `@googleapis/drive`, `@googleapis/gmail`, `@modelcontextprotocol/sdk`, `@supabase/supabase-js`, `cdk8s`, `extract-zip`, `fflate`, `jsdom`, `pg`, `playwright-core`, `rrule`, `yaml`, `@types/jsdom`, `@types/pg`, `fast-check`. The other sixty are `@scope/name` workspace packages akasha's `workspaces` array already names, so they resolve once the root declares them.

Three failures already traced to this and previously read as unrelated. The `messages` MCP server does not connect: `settings/mcp-servers.json` resolves to `akasha/tools/lib/messages-mcp.ts`, the file is there and `MCP_API_KEY` is set, and running it reports `Cannot find module '@modelcontextprotocol/sdk/server/mcp.js'`. Two systemd units fail for missing `jsdom` and `playwright-core`. All three are the same fault wearing three faces.

The one version disagreement between the manifests is `typescript`, akasha at `5.9.3` against instructions at `^5.9.3`, which the exact pin settles.

The merge is not the whole of the step. Akasha's `workspaces` array names its packages explicitly where instructions' is five nested globs over `packages/`, and the nesting globs go rather than merge. And `akasha/node_modules` carries seven untracked scope symlinks that a reinstall replaces; they are what lets `ops` boot today, so an install that fails part way leaves the tool that would repair it unable to start.
