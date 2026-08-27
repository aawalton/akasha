---
id: 2e040edb-a4e2-559e-b342-550fb00e8eea
slug: scripts-typechecked-by-nothing
page-type-slug: finding
title: "Scripts typechecked by nothing"
domain-slug: domain/global
---

# Claim

One file under a `scripts/` directory is typechecked by nothing: `temper/addons/scripts/build/verify-addon-bundle.ts` is reached by no tsconfig, so it compiles for nobody and a type error in it reaches production unseen. The blanket hole this was filed for has been closed around it; the file is what is left.

# Evidence

Found 2026-08-11 by the seat holding #18769, while changing `packages/agents/cli/scripts/create-identity-definitions.script.ts` — the script that writes the seat projection's property-definition rows.

That file carried a real defect: `Page` used and never imported. It predated the change, and every gate in the repository passed over it, because no tsconfig `include` named `scripts/` at any level. The defect is fixed at `eb0cf8ed9`; the file itself no longer stands.

Re-measured 2026-08-27 in akasha, which replaced both repositories, on `main`. Of the `.ts` files under a `scripts/` directory outside `node_modules` and `dist`, all but one are reached: `infra/scripts` and `temper/scripts` are project references from the root `tsconfig.json` at lines 121 and 103; `infra/k8s/src/supabase-realtime/scripts/bootstrap-tenant.ts` falls under that package's `src/**/*.ts`; and `alanwalton/atlas-web`, `temper/shared-addon-libraries-lib-sets-scripts`, `temper/shared-addon-libraries-lib-zone` and `temper/shared-addon-libraries-lib-map-data` each name `scripts/**/*.ts` in their own `include`.

The exception is `temper/addons/scripts/build/verify-addon-bundle.ts`. `temper/addons/tsconfig.json` carries `"files": []` and no `include` at all — it is a references-only project — and no other tsconfig names `temper/addons`. Control: 273 `tsconfig*.json` files stand outside `node_modules`, so the search ran.

A script is not a lesser file for being called a script. This one writes the rows a seat's name is validated against, and a type error in it fails at run time on a path nobody runs often.
