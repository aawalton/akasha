---
id: 32638819-3219-50de-8ed6-3b8bbf7fea74
slug: orphaned-notion-credential-at-rest
page-type-slug: finding
title: "Orphaned Notion credential at rest"
domain-slug: domain/agent-fleet
---

# Claim

The `aawalton` `claude-account` page row still carries a third-party OAuth credential pair — a Notion MCP access token and refresh token — under `attributes.mcpOAuth`, and nothing in the code repository reads it. The only document saying the blob is dead sits under quarantine and is queued for removal, so the sweep takes the record and leaves the credential.

# Evidence

`ops page show 019db533-f3b2-781d-8df5-fa78ae4131c5 --properties mcpOAuth` returns a JSON object keyed `notion|eac663db915250e7` holding `accessToken`, `refreshToken`, `clientId`, `serverUrl` `https://mcp.notion.com/mcp` and `expiresAt` 1783439505385 — about 2026-07-07, so the access token has lapsed while the refresh token carries no stated expiry.

`rg -uuu -n "mcpOAuth" .` in `~/code` returns two sites and neither is a reader of this attribute: a comment at `packages/agents/oauth/src/oauth-file.ts:95` and its unit test, both about the `.credentials.json` top-level key of the same name, which is a different object.

The record of the blob's death stands only in `dirty/code/packages-agents-oauth-docs-claude-account-schema.md`, which says the merge subsystem that wrote and read it was removed and calls the residue "unmanaged legacy data". That document is under quarantine and being emptied, which is how this was met.
