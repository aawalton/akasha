---
id: b82308fc-800e-51d1-b78d-78c4cb80b67c
slug: notion-pile-unreachable
page-type-slug: finding
title: "One of Alan's note piles stands in Notion and nothing here can read it"
domain-slug: domain/work-system
---

# Claim

One of Alan's note piles stands in a Notion document, and nothing on this workstation can read it. No Notion MCP server is configured, no plugin is installed, and the only Notion credentials in this repository are at rest with no reader. So the work that pile names enters the work system only when Alan carries it across himself, item by item, in a session — and until he does, nothing here can tell how much of it there is or whether any of it is already recorded.

# Evidence

Read on 2026-08-22.

`settings/mcp-servers.json` declares two servers and no others: `messages` and `playwright`. No Notion server stands there, and the Notion plugin listed in the Claude marketplace is not installed.

A recursive search for "notion" across akasha returns no reader. What it does return is static text in `audhdalan/web/app/routes/autcon-2026/slides.ts` and `audhdalan/web/app/components/resource-list.tsx`; test fixtures in `tools/tests/mcp-disable-reconcile.test.ts`, `tools/tests/supervisor-mcp.test.ts`, `tools/tests/oauth-file.test.ts` and `tools/tests/supervisor-idle-decide.test.ts`; a comment in `tools/hooks/block-destructive-git.sh`; email rules under `pages/email-rule-agent/alan/` and `pages/email-rule-code/alan/` that match mail sent *from* Notion; and a `notion-id` property recording where each `pages/identity-statement/*.md` was imported from. None of these opens a document.

Two credentials sit at rest. `infra/k8s/src/collections/secrets.sops.yaml:14` holds `NOTION_COLLECTIONS_TOKEN` encrypted, and a recursive search across akasha returns that line and no other occurrence of the name. The second is already recorded in the finding `orphaned-notion-credential-at-rest` under `agent-fleet`.

Not measured: how many items the Notion document holds, or what any of them says — it cannot be opened from here. Whether the encrypted token would still authenticate was not tested and it was not decrypted. Running processes, environment variables outside version control, and the collections service as deployed were not inspected; the claim rests on this repository as it stands in the working tree.
