---
id: 37be6967-30ca-5fd3-8bae-e9b4f7149ce2
page-type-slug: finding
title: "Packages without typecheck script the contract requires"
domain-slug: repo/code-repo
---

# Claim

Two live task documents open their checks stage with "Run each touched package's own `typecheck` script … per package rather than repo-wide". Thirty-two live packages declare no such script, among them `packages/shared/cli`, `packages/infra/checks` and five of the seven `packages/shared/design/*`. Neither document names what a seat does where the rung does not exist.

# Evidence

`domains/tasks/projects/build-child-deploy.md:29` and `domains/tasks/projects/build-singleton-deploy.md:29` carry the same bullet word for word: "**Run** each touched package's own `typecheck` script … per package rather than repo-wide, because a repo-wide run reports every other package's errors alongside yours."

Counted at `~/code` on `main`, `13135651993c19af09ce41b6295264191071d3c1`: 487 tracked `package.json` files, 353 declaring a `typecheck` script and 134 not. Most of the 134 are `__fixtures__` trees under `packages/infra/checks` and `packages/infra/scripts`, which no seat touches. Thirty-two are live packages, among them `packages/shared/cli` (the `ops` registry), `packages/alanwalton/projects/core`, `packages/agents/shared`, `packages/infra/checks`, `packages/infra/tests`, `packages/infra/scripts`, `packages/infra/lib`, `packages/infra/k8s`, `packages/shared/dotfiles`, and five of the seven `packages/shared/design/*` — `badges`, `forms`, `layout`, `patterns`, `primitives`, where `system` and `tokens` declare one.

A seat whose change lands in one of these has no rung to run and no fallback named. It either records the rung not-run, or falls back to the root script — `bunx @typescript/native-preview -b`, which resolves from the root and so covers the whole tree, exactly what the bullet's own reason clause says not to do. The second is the likelier failure, because it succeeds: the seat gets a green typecheck and reports the stage done.

Nothing detects this: the bullet is prose in a task document, so no gate compares it against the tree.

Which side moves is for whoever owns those task documents — the packages gain the script, or the bullet names what a seat does where none exists. Narrowing it to the shipped shape would launder the gap into doctrine.

Found ingesting a quarantined question document, which cited this instruction at `tasks/child-project-delivery.md`; `2a1fa1dac` renamed it and the prescription now stands in the two documents above.
