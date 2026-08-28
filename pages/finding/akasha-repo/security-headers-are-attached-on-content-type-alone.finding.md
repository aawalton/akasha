---
id: 6aa5365c-56c7-5dcd-8841-a5489ca1137a
page-type-slug: finding
slug: security-headers-are-attached-on-content-type-alone
title: "Security headers are attached on content type alone"
domain-slug: repo/akasha-repo
---

# Claim

Every web app merges its security headers on content type alone, with no status test, so an HTML error response gets the full production CSP.

# Evidence

Re-verified 2026-08-28 at `5ad07e0705`. Each app's `server.ts` guards the merge only by `if (contentType.startsWith("text/html"))` — `alanwalton/web/server.ts:68`, `archive-of-worlds/web/server.ts:53`, `audhdalan/web/server.ts:53`, `smilingjenny/web/server.ts:53`, `temper/web/server.ts:54`. `shared/web-security-headers/src/build.ts:31` builds `script-src` as `'self'`, `'nonce-<n>'`, `'strict-dynamic'`.
