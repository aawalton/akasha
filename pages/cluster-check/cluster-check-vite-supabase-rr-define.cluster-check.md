---
page-type-slug: cluster-check
id: dd29aff4-21dc-5c3d-906e-654a5b960c5a
title: "Vite supabase RR define check"
runner-name: vite-supabase-rr-define
script: infra/cluster-checks/src/checks/check-vite-supabase-rr-define.ts
dispatch-node-types:
  - kind: package
slug: cluster-check-vite-supabase-rr-define
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Vite supabase RR define check** — A vite config that can reach the Supabase React Router package calls supabaseClientEnvDefine.
